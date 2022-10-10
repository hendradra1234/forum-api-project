/* eslint-disable no-undef */
const CommentsRepository = require('../../../../Domains/comments/CommentRepository')
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository')
const RepliesRepository = require('../../../../Domains/replies/RepliesRepository')
const DeleteRepliesUseCase = require('../DeleteRepliesUseCase')
const prefix = 'DELETE_REPLIES_USE_CASE.'
describe('DeleteRepliesUseCase', () => {
  it('should throw error when payload not contain threadId, commentId OR replyId', async () => {
    const useCasePayload = {}

    const deleteReplyUseCase = new DeleteRepliesUseCase({})

    await expect(deleteReplyUseCase.execute(useCasePayload)).rejects
      .toThrowError(prefix + 'NOT_CONTAIN_VALID_PAYLOAD')
  })

  it('should throw error when payload not string', async () => {
    const useCasePayload = {
      thread: 190,
      comment: 'SVGFEColorMatrixElement',
      reply: 'reply-xxxx',
      owner: 182
    }

    const deleteCommentUseCase = new DeleteRepliesUseCase({})

    await expect(deleteCommentUseCase.execute(useCasePayload)).rejects
      .toThrowError(prefix + 'PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should orchestrating the delete reply action correctly', async () => {
    const useCasePayload = {
      thread: 'thread-190',
      comment: 'SVGFEColorMatrixElement',
      reply: 'reply-xxxx',
      owner: 'user-182'
    }

    const mockCommentRepository = new CommentsRepository()
    const mockThreadRepository = new ThreadRepository()
    const mockRepliesRepository = new RepliesRepository()

    mockThreadRepository.checkAvailabilityThread = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockCommentRepository.checkAvailabilityComment = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockRepliesRepository.checkAvailabilityReplies = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockRepliesRepository.verifyRepliesOwner = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockRepliesRepository.deleteReplies = jest.fn()
      .mockImplementation(() => Promise.resolve())

    const deleteReplyUseCase = new DeleteRepliesUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      repliesRepository: mockRepliesRepository
    })

    await deleteReplyUseCase.execute(useCasePayload)

    expect(mockThreadRepository.checkAvailabilityThread)
      .toHaveBeenCalledWith(useCasePayload.thread)
    expect(mockCommentRepository.checkAvailabilityComment)
      .toHaveBeenCalledWith(useCasePayload.comment)
    expect(mockRepliesRepository.checkAvailabilityReplies)
      .toHaveBeenCalledWith(useCasePayload.reply)
    expect(mockRepliesRepository.verifyRepliesOwner)
      .toHaveBeenCalledWith(useCasePayload.reply, useCasePayload.owner)
    expect(mockRepliesRepository.deleteReplies)
      .toHaveBeenCalledWith(useCasePayload.reply)
  })
})
