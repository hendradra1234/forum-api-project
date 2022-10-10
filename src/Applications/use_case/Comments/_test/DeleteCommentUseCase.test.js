/* eslint-disable no-undef */
const CommentsRepository = require('../../../../Domains/comments/CommentRepository')
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository')
const DeleteCommentUseCase = require('../DeleteCommentUseCase')
const prefix = 'DELETE_COMMENT_USE_CASE.'
describe('DeleteCommentUseCase', () => {
  it('should throw error when payload not contain thread id and comment id', async () => {
    const useCasePayload = {}

    const deleteCommentUseCase = new DeleteCommentUseCase({})

    await expect(deleteCommentUseCase.execute(useCasePayload)).rejects
      .toThrowError(prefix + 'NOT_CONTAIN_VALID_PAYLOAD')
  })

  it('should throw error when payload not string', async () => {
    const useCasePayload = {
      thread: 190,
      comment: 'SVGFEColorMatrixElement',
      owner: 182
    }

    const deleteCommentUseCase = new DeleteCommentUseCase({})

    await expect(deleteCommentUseCase.execute(useCasePayload)).rejects
      .toThrowError(prefix + 'PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should orchestrating the delete comment action correctly', async () => {
    const useCasePayload = {
      thread: 'thread-190',
      comment: 'SVGFEColorMatrixElement',
      owner: 'user-182'
    }

    const mockCommentRepository = new CommentsRepository()
    const mockThreadRepository = new ThreadRepository()

    mockThreadRepository.checkAvailabilityThread = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockCommentRepository.checkAvailabilityComment = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockCommentRepository.verifyCommentOwner = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockCommentRepository.deleteComment = jest.fn()
      .mockImplementation(() => Promise.resolve())

    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository
    })

    await deleteCommentUseCase.execute(useCasePayload)

    expect(mockThreadRepository.checkAvailabilityThread)
      .toHaveBeenCalledWith(useCasePayload.thread)
    expect(mockCommentRepository.checkAvailabilityComment)
      .toHaveBeenCalledWith(useCasePayload.comment)
    expect(mockCommentRepository.verifyCommentOwner)
      .toHaveBeenCalledWith(useCasePayload.comment, useCasePayload.owner)
    expect(mockCommentRepository.deleteComment)
      .toHaveBeenCalledWith(useCasePayload.comment)
  })
})
