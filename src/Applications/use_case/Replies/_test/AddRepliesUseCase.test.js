/* eslint-disable no-undef */
const CommentRepository = require('../../../../Domains/comments/CommentRepository')
const AddRepliesUseCase = require('../AddRepliesUseCase')
const AddReplies = require('../../../../Domains/replies/entities/AddReplies')
const AddedReplies = require('../../../../Domains/replies/entities/AddedReplies')
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository')

describe('AddRepliesUseCase', () => {
  it('should orchestrating the add comment Reply action correctly', async () => {
    const useCasePayload = {
      thread: 'thread-xxx',
      comment: 'comment-xxx',
      content: 'comment here, are you there honey',
      owner: 'user-xxx'
    }

    const replies = {
      id: 'replies-xxasd',
      content: 'content',
      owner: 'user-xxx'
    }
    const expectedAddedReplies = new AddedReplies(replies)

    const mockCommentRepository = new CommentRepository()
    const mockThreadRepository = new ThreadRepository()
    const mockRepliesRepository = new ThreadRepository()

    mockThreadRepository.checkAvailabilityThread = jest.fn(() => Promise.resolve())
    mockCommentRepository.checkAvailabilityComment = jest.fn(() => Promise.resolve())
    mockRepliesRepository.addReplies = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAddedReplies))

    const getRepliesUseCase = new AddRepliesUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
      repliesRepository: mockRepliesRepository
    })

    const addedReplies = await getRepliesUseCase.execute(useCasePayload)

    expect(mockThreadRepository.checkAvailabilityThread).toBeCalledWith(useCasePayload.thread)
    expect(mockCommentRepository.checkAvailabilityComment).toBeCalledWith(useCasePayload.comment)
    expect(addedReplies).toStrictEqual(expectedAddedReplies)
    expect(mockRepliesRepository.addReplies).toBeCalledWith(new AddReplies({ ...useCasePayload }))
  })
})
