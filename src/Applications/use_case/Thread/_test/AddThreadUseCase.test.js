/* eslint-disable no-undef */
const AddThread = require('../../../../Domains/threads/entities/AddThread')
const AddedThread = require('../../../../Domains/threads/entities/AddedThread')
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository')
const AddTheadUseCase = require('../AddThreadUseCase')

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action properly', async () => {
    const useCasePayload = {
      title: 'thread test',
      body: 'content here',
      owner: 'user-xxx'
    }

    const expectedAddedThead = new AddedThread({
      id: 'thead-xxads',
      ...useCasePayload
    })

    const mockThreadRepository = new ThreadRepository()

    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAddedThead))
    const getTheadUseCase = new AddTheadUseCase({
      threadRepository: mockThreadRepository
    })

    const addedThread = await getTheadUseCase.execute(useCasePayload)

    expect(addedThread).toStrictEqual(expectedAddedThead)
    expect(mockThreadRepository.addThread).toBeCalledWith(new AddThread(useCasePayload))
  })
})
