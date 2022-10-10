/* eslint-disable no-undef */
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const NotFoundError = require('../../../Commons/exceptions/NotFoundError')
const AddedThread = require('../../../Domains/threads/entities/AddedThread')
const AddThread = require('../../../Domains/threads/entities/AddThread')
const ThreadRepository = require('../../../Domains/threads/ThreadRepository')
const pool = require('../../database/postgres/pool')
const ThreadRepositoryPostgres = require('../ThreadsRepositoryPostgres')

describe('ThreadsRepositoryPostgres', () => {
  it('should be instance of ThreadRepository domain', () => {
    const threadRepositoryPostgres = new ThreadRepositoryPostgres({}, {})
    expect(threadRepositoryPostgres).toBeInstanceOf(ThreadRepository)
  })

  describe('behavior test', () => {
    afterEach(async () => {
      await ThreadsTableTestHelper.cleanTable()
      await UsersTableTestHelper.cleanTable()
    })

    afterAll(async () => {
      await pool.end()
    })
    describe('addThead function', () => {
      it('should persist new thread and return added thread correctly', async () => {
        const userPayload = { id: 'user-12345678', username: 'hendra' }
        await UsersTableTestHelper.addUser(userPayload)

        const newThread = new AddThread({
          title: 'thread',
          body: 'ini merupakan body',
          owner: userPayload.id
        })
        const threadId = 'thread-123456789abcdef'

        const fakeIdGenerator = () => '123456789abcdef'
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)
        const addeThread = await threadRepositoryPostgres.addThread(newThread)
        const thread = await ThreadsTableTestHelper.findThreadById(threadId)

        expect(addeThread).toStrictEqual(new AddedThread({
          id: threadId,
          title: newThread.title,
          owner: newThread.owner
        }))
        expect(thread).toHaveLength(1)
      })
    })

    describe('checkAvailabilityThread function', () => {
      it('should throw NotFoundError if thread not available', async () => {
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {})
        const threadId = 'fwefwe'

        await expect(threadRepositoryPostgres.checkAvailabilityThread(threadId))
          .rejects.toThrow(NotFoundError)
      })
      it('should not throw NotFoundError if thread available', async () => {
        const threadId = 'thread-xxxx'
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {})
        const userPayload = {
          id: 'user-xxx', username: 'clari'
        }
        const threadPayload = {
          id: threadId,
          body: 'thread body',
          owner: userPayload.id
        }

        await UsersTableTestHelper.addUser(userPayload)
        await ThreadsTableTestHelper.addThread(threadPayload)

        await expect(threadRepositoryPostgres.checkAvailabilityThread(threadId))
          .resolves.not.toThrow(NotFoundError)
      })
    })

    describe('getDetailThread function', () => {
      it('should get detail thread', async () => {
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {})
        const userPayload = {
          id: 'user-xxx', username: 'clari'
        }
        const threadPayload = {
          id: 'thread-xxxx',
          title: 'thread title',
          body: 'thread body',
          owner: userPayload.id
        }

        await UsersTableTestHelper.addUser(userPayload)
        await ThreadsTableTestHelper.addThread(threadPayload)

        const detailThread = await threadRepositoryPostgres.getDetailThread(threadPayload.id)
        expect(detailThread.id).toEqual(threadPayload.id)
        expect(detailThread.title).toEqual(threadPayload.title)
        expect(detailThread.body).toEqual(threadPayload.body)
        expect(detailThread.username).toEqual(userPayload.username)
      })
    })
  })
})
