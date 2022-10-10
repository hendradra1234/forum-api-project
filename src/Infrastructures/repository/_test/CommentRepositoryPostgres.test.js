/* eslint-disable no-undef */
const CommentsTableTestHelper = require('../../../../tests/CommentTableTestHelper')
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres')
const pool = require('../../database/postgres/pool')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const AddComment = require('../../../Domains/comments/entities/AddComment')
const AddedComment = require('../../../Domains/comments/entities/AddedComment')
const NotFoundError = require('../../../Commons/exceptions/NotFoundError')
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError')

describe('CommentRepositoryPostgres', () => {
  it('should be instance of CommentRepository domain', () => {
    const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {}) // Dummy dependency

    expect(commentRepositoryPostgres).toBeInstanceOf(CommentRepositoryPostgres)
  })

  describe('behavior test', () => {
    afterEach(async () => {
      await UsersTableTestHelper.cleanTable()
      await ThreadsTableTestHelper.cleanTable()
      await CommentsTableTestHelper.cleanTable()
    })

    afterAll(async () => {
      await pool.end()
    })

    describe('addComment function', () => {
      it('should persist new comment and return added comment correctly', async () => {
        const userPayload = { id: 'user-123xxx', username: 'hendra' }
        await UsersTableTestHelper.addUser(userPayload)
        const threadPayload = { id: 'thread-xxx_1w3', body: 'thread system', owner: userPayload.id }
        await ThreadsTableTestHelper.addThread(threadPayload)

        const newComment = new AddComment({
          content: 'sebuah komentar',
          thread: threadPayload.id,
          owner: userPayload.id
        })

        const fakeIdGenerator = () => '123456789abcdef'
        const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator)

        const addedComment = await commentRepositoryPostgres.addComment(newComment)

        const comment = await CommentsTableTestHelper.findCommentsById('comment-123456789abcdef')
        expect(addedComment).toStrictEqual(new AddedComment({
          id: 'comment-123456789abcdef',
          content: 'sebuah komentar',
          owner: userPayload.id
        }))
        expect(comment).toHaveLength(1)
      })
    })

    describe('checkAvailabilityComment function', () => {
      it('should throw NotFoundError if comment not available', async () => {
        // Arrange
        const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {})
        const comment = 'comment-123456789abcdef'

        // Action & Assert
        await expect(commentRepositoryPostgres.checkAvailabilityComment(comment))
          .rejects.toThrow(NotFoundError)
      })

      it('should not throw NotFoundError if comment available', async () => {
        // Arrange
        const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {})
        const userPayload = { id: 'user-12345679911', username: 'hendrakho' }
        await UsersTableTestHelper.addUser(userPayload)
        const threadPayload = { id: 'thread-12345678', body: 'sebuah thread', owner: userPayload.id }
        await ThreadsTableTestHelper.addThread(threadPayload)
        const commentPayload = {
          id: 'comment-123456789abcdef', content: 'sebuah komentar', thread: threadPayload.id, owner: userPayload.id
        }
        await CommentsTableTestHelper.addComment(commentPayload)

        // Action & Assert
        await expect(commentRepositoryPostgres.checkAvailabilityComment(commentPayload.id))
          .resolves.not.toThrow(NotFoundError)
      })
    })

    describe('verifyCommentOwner function', () => {
      it('should throw AuthorizationError if comment not belong to owner', async () => {
        // Arrange
        const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {})
        await UsersTableTestHelper.addUser({ id: 'user-123456999', username: 'zaenurr02' })
        await UsersTableTestHelper.addUser({ id: 'user-123459999', username: 'zaenurr03' })
        await ThreadsTableTestHelper.addThread({ id: 'thread-1234567', body: 'sebuah thread', owner: 'user-123456999' })
        await CommentsTableTestHelper.addComment({
          id: 'comment-1234567', content: 'sebuah komentar', thread: 'thread-1234567', owner: 'user-123456999'
        })
        const comment = 'comment-1234567'
        const owner = 'user-123459999'

        // Action & Assert
        await expect(commentRepositoryPostgres.verifyCommentOwner(comment, owner))
          .rejects.toThrow(AuthorizationError)
      })

      it('should not throw AuthorizationError if comment is belongs to owner', async () => {
        // Arrange
        const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {})
        await UsersTableTestHelper.addUser({ id: 'user-123499999', username: 'zaenurr04' })
        await ThreadsTableTestHelper.addThread({ id: 'thread-12345678', body: 'sebuah thread', owner: 'user-123499999' })
        await CommentsTableTestHelper.addComment({
          id: 'comment-123456789', content: 'sebuah komentar', thread: 'thread-12345678', owner: 'user-123499999'
        })

        // Action & Assert
        await expect(commentRepositoryPostgres.verifyCommentOwner('comment-123456789', 'user-123499999'))
          .resolves.not.toThrow(AuthorizationError)
      })
    })

    describe('deleteComment', () => {
      it('should delete comment from database', async () => {
        // Arrange
        const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {})
        await UsersTableTestHelper.addUser({ id: 'user-123999999', username: 'zaenurr11' })
        await ThreadsTableTestHelper.addThread({ id: 'thread-123456789', body: 'sebuah thread', owner: 'user-123999999' })
        const commentPayload = {
          id: 'comment-1234567810', content: 'sebuah komentar', thread: 'thread-123456789', owner: 'user-123999999'
        }
        await CommentsTableTestHelper.addComment(commentPayload)

        // Action
        await commentRepositoryPostgres.deleteComment(commentPayload.id)

        // Assert
        const comment = await commentRepositoryPostgres.checkIsDeletedCommentsById(commentPayload.id)
        expect(comment).toEqual(true)
      })
    })

    describe('getCommentsThread', () => {
      it('should get comments of thread', async () => {
        const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {})
        const userPayload = { id: 'user-12345678910', username: 'hendrakho' }
        const threadPayload = {
          id: 'thread-12345678X1',
          title: 'sebuah judul thread',
          body: 'sebuah thread',
          owner: userPayload.id
        }
        const commentPayload = {
          id: 'comment-1234567811',
          content: 'sebuah komentar',
          thread: threadPayload.id,
          owner: userPayload.id
        }

        await UsersTableTestHelper.addUser(userPayload)
        await ThreadsTableTestHelper.addThread(threadPayload)
        await CommentsTableTestHelper.addComment(commentPayload)

        const comments = await commentRepositoryPostgres.getCommentThread(threadPayload.id)

        expect(Array.isArray(comments)).toBe(true)
        expect(comments[0].id).toEqual(commentPayload.id)
        expect(comments[0].username).toEqual(userPayload.username)
        expect(comments[0].content).toEqual('sebuah komentar')
        expect(comments[0].date).toBeDefined()
      })
    })
  })
})
