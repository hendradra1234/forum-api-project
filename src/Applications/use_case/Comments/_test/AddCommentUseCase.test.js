/* eslint-disable no-undef */
const CommentRepository = require('../../../../Domains/comments/CommentRepository')
const AddCommentUseCase = require('../AddCommentUseCase')
const AddComment = require('../../../../Domains/comments/entities/AddComment')
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository')
const AddedComment = require('../../../../Domains/comments/entities/AddedComment')

describe('AddCommentUseCase', () => {
  it('should orchestrating the add comment action correctly', async () => {
    const useCasePayload = {
      thread: 'thread-xxx',
      content: 'comment here, are you there honey',
      owner: 'user-xxx'
    }

    const expectedAddedComment = new AddedComment({
      id: 'comment-xxxwcwefhub',
      content: 'content here',
      owner: 'user-xxq'
    })

    const mockCommentRepository = new CommentRepository()
    const mockThreadRepository = new ThreadRepository()

    mockThreadRepository.checkAvailabilityThread = jest.fn(() => Promise.resolve())
    mockCommentRepository.addComment = jest.fn(() => Promise.resolve())
      .mockImplementation(() => Promise.resolve(expectedAddedComment))

    const getCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository
    })

    const addedComment = await getCommentUseCase.execute(useCasePayload)

    expect(mockThreadRepository.checkAvailabilityThread).toBeCalledWith(useCasePayload.thread)
    expect(addedComment).toStrictEqual(expectedAddedComment)
    expect(mockCommentRepository.addComment).toBeCalledWith(new AddComment({
      ...useCasePayload
    }))
  })
})
