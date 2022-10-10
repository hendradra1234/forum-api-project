/* eslint-disable no-undef */
const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper')
const RepliesRepositoryPostgres = require('../RepliesRepositoryPostgres')
const pool = require('../../database/postgres/pool')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const AddReplies = require('../../../Domains/replies/entities/AddReplies')
const AddedReplies = require('../../../Domains/replies/entities/AddedReplies')
const NotFoundError = require('../../../Commons/exceptions/NotFoundError')
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError')
const CommentsTableTestHelper = require('../../../../tests/CommentTableTestHelper')
const universalId = 'reply-123456789abcdef'

describe('RepliesRepositoryPostgres', () => {
  it('should be instance of CommentRepository domain', () => {
    const repliesRepositoryPostgres = new RepliesRepositoryPostgres(pool, {}) // Dummy dependency

    expect(repliesRepositoryPostgres).toBeInstanceOf(RepliesRepositoryPostgres)
  })

  describe('behavior test', () => {
    afterEach(async () => {
      await UsersTableTestHelper.cleanTable()
      await ThreadsTableTestHelper.cleanTable()
      await RepliesTableTestHelper.cleanTable()
      await CommentsTableTestHelper.cleanTable()
    })

    afterAll(async () => {
      await pool.end()
    })

    describe('addReplies function', () => {
      it('should persist new replies and return added replies correctly', async () => {
        const userPayload = { id: 'user-123xxx', username: 'hendra' }
        await UsersTableTestHelper.addUser(userPayload)
        const threadPayload = { id: 'thread-xxx_1w3', title: 'title', body: 'thread system', owner: userPayload.id }
        await ThreadsTableTestHelper.addThread(threadPayload)
        const commentPayload = {
          id: 'comment-xxx',
          content: 'sebuah komentar',
          thread: threadPayload.id,
          owner: userPayload.id
        }
        await CommentsTableTestHelper.addComment(commentPayload)

        const fakeIdGenerator = () => '123456789abcdef'

        const repliesRepositoryPostgres = new RepliesRepositoryPostgres(pool, fakeIdGenerator)

        const newReply = new AddReplies({
          content: 'sebuah komentar',
          thread: threadPayload.id,
          comment: commentPayload.id,
          owner: userPayload.id
        })
        const addedReplies = await repliesRepositoryPostgres.addReplies(newReply)

        const comment = await RepliesTableTestHelper.findRepliesById(addedReplies.id)
        expect(addedReplies).toStrictEqual(new AddedReplies({
          id: universalId,
          content: 'sebuah komentar',
          owner: userPayload.id
        }))
        expect(comment).toHaveLength(1)
      })
    })

    describe('checkAvailabilityComment function', () => {
      it('should throw NotFoundError if comment not available', async () => {
        // Arrange
        const repliesRepositoryPostgres = new RepliesRepositoryPostgres(pool, {})

        // Action & Assert
        await expect(repliesRepositoryPostgres.checkAvailabilityReplies('ewedwedwe'))
          .rejects.toThrow(NotFoundError)
      })

      it('should not throw NotFoundError if Replies available', async () => {
        // Arrange
        const repliesRepositoryPostgres = new RepliesRepositoryPostgres(pool, {})
        const userA = { id: 'user-123456999', username: 'zaenurr02' }
        await UsersTableTestHelper.addUser(userA)
        const userB = { id: 'user-123459999', username: 'zaenurr03' }
        await UsersTableTestHelper.addUser(userB)
        const thread = { id: 'thread-1234567', title: 'title', body: 'sebuah thread', owner: userA.id }
        await ThreadsTableTestHelper.addThread(thread)
        const comment = {
          id: 'comment-1234567', content: 'sebuah komentar', thread: thread.id, owner: userA.id
        }
        await CommentsTableTestHelper.addComment(comment)
        const replies = {
          id: 'reply-1234567', content: 'sebuah komentar', thread: thread.id, owner: userA.id, comment: comment.id
        }
        await RepliesTableTestHelper.addReplies(replies)

        // Action & Assert
        await expect(repliesRepositoryPostgres.checkAvailabilityReplies(replies.id))
          .resolves.not.toThrow(NotFoundError)
      })
    })

    describe('verifyRepliesOwner function', () => {
      it('should throw AuthorizationError if replies not belong to owner', async () => {
        // Arrange
        const repliesRepositoryPostgres = new RepliesRepositoryPostgres(pool, {})
        const userA = { id: 'user-123456999', username: 'zaenurr02' }
        await UsersTableTestHelper.addUser(userA)
        const userB = { id: 'user-123459999', username: 'zaenurr03' }
        await UsersTableTestHelper.addUser(userB)
        const thread = { id: 'thread-1234567', title: 'title', body: 'sebuah thread', owner: userA.id }
        await ThreadsTableTestHelper.addThread(thread)
        const comment = {
          id: 'comment-1234567', content: 'sebuah komentar', thread: thread.id, owner: userA.id
        }
        await CommentsTableTestHelper.addComment(comment)
        const replies = {
          id: 'reply-1234567', content: 'sebuah komentar', thread: thread.id, owner: userA.id, comment: comment.id
        }
        await RepliesTableTestHelper.addReplies(replies)

        // Action & Assert
        await expect(repliesRepositoryPostgres.verifyRepliesOwner(replies.id, userB.id))
          .rejects.toThrow(AuthorizationError)
      })

      it('should not throw AuthorizationError if comment is belongs to owner', async () => {
        // Arrange
        const repliesRepositoryPostgres = new RepliesRepositoryPostgres(pool, {})
        const userA = { id: 'user-123456999', username: 'zaenurr02' }
        await UsersTableTestHelper.addUser(userA)
        const userB = { id: 'user-123459999', username: 'zaenurr03' }
        await UsersTableTestHelper.addUser(userB)
        const thread = { id: 'thread-1234567', title: 'title', body: 'sebuah thread', owner: userA.id }
        await ThreadsTableTestHelper.addThread(thread)
        const comment = {
          id: 'comment-1234567', content: 'sebuah komentar', thread: thread.id, owner: userA.id
        }
        await CommentsTableTestHelper.addComment(comment)
        const replies = {
          id: 'reply-1234567', content: 'sebuah komentar', thread: thread.id, owner: userA.id, comment: comment.id
        }
        await RepliesTableTestHelper.addReplies(replies)

        // Action & Assert
        await expect(repliesRepositoryPostgres.verifyRepliesOwner(replies.id, userA.id))
          .resolves.not.toThrow(AuthorizationError)
      })
    })

    describe('deleteReplies', () => {
      it('check not delete Replies from database', async () => {
        // Arrange
        const repliesRepositoryPostgres = new RepliesRepositoryPostgres(pool, {})
        const userPayload = { id: 'user-123999999', username: 'zaenurr11' }
        await UsersTableTestHelper.addUser(userPayload)
        const threadPayload = { id: 'thread-123456789', title: 'title', body: 'sebuah thread', owner: userPayload.id }
        await ThreadsTableTestHelper.addThread(threadPayload)
        const commentPayload = {
          id: 'comment-1234567810', content: 'sebuah komentar', thread: threadPayload.id, owner: userPayload.id
        }
        await CommentsTableTestHelper.addComment(commentPayload)
        const replyPayload = {
          id: 'reply-1234567810', content: 'sebuah komentar', thread: threadPayload.id, owner: userPayload.id, comment: commentPayload.id
        }
        // Action
        await RepliesTableTestHelper.addReplies(replyPayload)

        // Assert
        const reply = await repliesRepositoryPostgres.checkIsDeletedRepliesById(replyPayload.id)
        expect(reply).toEqual(false)
      })
      it('should delete Replies from database', async () => {
        // Arrange
        const repliesRepositoryPostgres = new RepliesRepositoryPostgres(pool, {})
        const userPayload = { id: 'user-123999999', username: 'zaenurr11' }
        await UsersTableTestHelper.addUser(userPayload)
        const threadPayload = { id: 'thread-123456789', title: 'title', body: 'sebuah thread', owner: userPayload.id }
        await ThreadsTableTestHelper.addThread(threadPayload)
        const commentPayload = {
          id: 'comment-1234567810', content: 'sebuah komentar', thread: threadPayload.id, owner: userPayload.id
        }
        await CommentsTableTestHelper.addComment(commentPayload)
        const replyPayload = {
          id: 'reply-1234567810', content: 'sebuah komentar', thread: threadPayload.id, owner: userPayload.id, comment: commentPayload.id
        }
        await RepliesTableTestHelper.addReplies(replyPayload)

        // Action
        await repliesRepositoryPostgres.deleteReplies(replyPayload.id)

        // Assert
        const reply = await repliesRepositoryPostgres.checkIsDeletedRepliesById(replyPayload.id)
        expect(reply).toEqual(true)
      })
    })

    describe('getCommentsReplyThread', () => {
      it('should get comments of thread', async () => {
        const repliesRepositoryPostgres = new RepliesRepositoryPostgres(pool, {})
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
        const replyPayload = {
          id: 'reply-1234567811',
          content: 'sebuah komentar',
          comment: commentPayload.id,
          thread: threadPayload.id,
          owner: userPayload.id
        }

        await UsersTableTestHelper.addUser(userPayload)
        await ThreadsTableTestHelper.addThread(threadPayload)
        await CommentsTableTestHelper.addComment(commentPayload)
        await RepliesTableTestHelper.addReplies(replyPayload)

        const replies = await repliesRepositoryPostgres.getRepliesComment(commentPayload.id)

        expect(Array.isArray(replies)).toBe(true)
        expect(replies[0].id).toEqual(replyPayload.id)
        expect(replies[0].username).toEqual(userPayload.username)
        expect(replies[0].content).toEqual(replyPayload.content)
        expect(replies[0].date).toBeDefined()
      })
    })
  })
})
