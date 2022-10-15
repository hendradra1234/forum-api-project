const GetDetailComment = require('../../../Domains/comments/entities/GetDetailComment')
const GetDetailReplies = require('../../../Domains/replies/entities/GetDetailReplies')

class DetailTheadUseCase {
  constructor ({ commentRepository, threadRepository, repliesRepository }) {
    this._commentRepository = commentRepository
    this._threadRepository = threadRepository
    this._repliesRepository = repliesRepository
  }

  async execute (useCasePayload) {
    const { thread } = useCasePayload
    await this._threadRepository.checkAvailabilityThread(thread)
    const detailThread = await this._threadRepository.getDetailThread(thread)
    const getCommentsThread = await this._commentRepository.getCommentThread(thread)

    const commentThread = await Promise.all(await getCommentsThread.map(async (comment) => {
      const { id } = comment
      const replies = await this._repliesRepository.getRepliesComment(id)
      const repliesDat = new GetDetailReplies({ replies }).replies
      return {
        ...comment,
        replies: repliesDat
      }
    }))
    detailThread.comments = new GetDetailComment({ comments: commentThread }).comments
    return {
      thread: detailThread
    }
  }
}

module.exports = DetailTheadUseCase
