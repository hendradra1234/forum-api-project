const GetDetailComment = require('../../../Domains/comments/entities/GetDetailComment')
const GetDetailReplies = require('../../../Domains/replies/entities/GetDetailReplies')

class DetailTheadUseCase {
  constructor ({ commentRepository, threadRepository, repliesRepository }) {
    this._commentRepository = commentRepository
    this._threadRepository = threadRepository
    this._repliesRepository = repliesRepository
  }

  async execute (useCasePayload) {
    const commentThread = []
    const { thread } = useCasePayload
    await this._threadRepository.checkAvailabilityThread(thread)
    const detailThread = await this._threadRepository.getDetailThread(thread)
    const getCommentsThread = await this._commentRepository.getCommentThread(thread)
    for (const comment of getCommentsThread) {
      const { id } = comment
      const repliesData = await this._repliesRepository.getRepliesComment(id)
      const repliesDat = new GetDetailReplies({ replies: repliesData }).replies
      commentThread.push({
        ...comment,
        replies: repliesDat
      })
    }
    detailThread.comments = new GetDetailComment({ comments: commentThread }).comments
    return {
      thread: detailThread
    }
  }
}

module.exports = DetailTheadUseCase
