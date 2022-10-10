/* eslint-disable no-undef */
const CommentRepository = require('../../../../Domains/comments/CommentRepository')
const RepliesRepository = require('../../../../Domains/replies/RepliesRepository')
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository')
const DetailThreadUseCase = require('../DetailTheadUseCase')

describe('DetailTheadUseCase', () => {
  it('should orchestrating the return detail thead correctly', async () => {
    const useCasePayload = {
      thread: 'thread-190'
    }

    const thread = {
      id: 'thread-190',
      title: 'thread title',
      body: 'thread body',
      date: '2022-10-08 14.00',
      username: 'hendra'
    }

    const expectedThread = {
      id: 'thread-190',
      title: 'thread title',
      body: 'thread body',
      date: '2022-10-08 14.00',
      username: 'hendra'
    }

    const comment = [
      {
        id: 'comment-xx1',
        username: 'hendra',
        date: '2022-09-01 20.00',
        content: 'comment here',
        is_delete: false
      },
      {
        id: 'comment-8xx',
        username: 'clari',
        date: '2022-09-08 14.00',
        content: 'im here hello',
        is_delete: true
      },
      {
        id: 'comment-xx2',
        username: 'hendra',
        date: '2022-09-01 21.00',
        content: 'comment here no reply',
        is_delete: false
      }
    ]

    const reply = [
      {
        id: 'reply-xxx',
        comment: comment[0].id,
        username: 'hendra',
        date: '2022-09-01 20.00',
        content: 'comment here',
        is_delete: false
      },
      {
        id: 'reply-8xx',
        comment: comment[0].id,
        username: 'clari',
        date: '2022-09-08 14.00',
        content: 'im here hello',
        is_delete: true
      },
      {
        id: 'reply-8xxqdqqw',
        comment: comment[1].id,
        username: 'clari',
        date: '2022-09-08 14.00',
        content: 'im here hello',
        is_delete: true
      },
      {
        id: 'reply-xxdqwdx',
        comment: comment[1].id,
        username: 'hendra',
        date: '2022-09-01 20.00',
        content: 'comment here',
        is_delete: false
      }
    ]

    const expectedReply = [
      {
        id: reply[0].id,
        username: reply[0].username,
        date: reply[0].date,
        content: 'comment here'
      },
      {
        id: reply[1].id,
        username: reply[1].username,
        date: reply[1].date,
        content: '**balasan telah dihapus**'
      }
    ]

    const expectedReplyUser2 = [
      {
        id: reply[2].id,
        username: reply[2].username,
        date: reply[2].date,
        content: '**balasan telah dihapus**'
      },
      {
        id: reply[3].id,
        username: reply[3].username,
        date: reply[3].date,
        content: 'comment here'
      }
    ]

    const expectedComment = [
      {
        id: 'comment-xx1',
        username: 'hendra',
        date: '2022-09-01 20.00',
        content: 'comment here',
        replies: expectedReply
      },
      {
        id: 'comment-8xx',
        username: 'clari',
        date: '2022-09-08 14.00',
        content: '**komentar telah dihapus**',
        replies: expectedReplyUser2
      },
      {
        id: 'comment-xx2',
        username: 'hendra',
        date: '2022-09-01 21.00',
        content: 'comment here no reply',
        replies: []
      }
    ]
    const mockThreadRepository = new ThreadRepository()
    const mockCommentRepository = new CommentRepository()
    const mockRepliesRepository = new RepliesRepository()

    mockThreadRepository.checkAvailabilityThread = jest.fn(() => Promise.resolve())
    mockThreadRepository.getDetailThread = jest.fn()
      .mockImplementation(() => Promise.resolve(thread))
    mockCommentRepository.getCommentThread = jest.fn()
      .mockImplementation(() => Promise.resolve(comment))
    mockRepliesRepository.getRepliesComment = jest.fn()
      .mockImplementation((comment) => Promise.resolve(reply.filter((data) => data.comment === comment)))

    const detailThreadUseCase = new DetailThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      repliesRepository: mockRepliesRepository
    })

    const detailThread = await detailThreadUseCase.execute(useCasePayload)

    expect(mockThreadRepository.getDetailThread)
      .toHaveBeenCalledWith(useCasePayload.thread)
    expect(mockCommentRepository.getCommentThread)
      .toHaveBeenCalledWith(useCasePayload.thread)
    expect(detailThread).toStrictEqual({
      thread: {
        ...expectedThread,
        comments: expectedComment
      }
    })
  })
})
