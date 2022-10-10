const AddReplies = require('../../../Domains/replies/entities/AddReplies')

class AddRepliesUseCase {
  constructor ({ commentRepository, threadRepository, repliesRepository }) {
    this._commentRepository = commentRepository
    this._repliesRepository = repliesRepository
    this._threadRepository = threadRepository
  }

  async execute (useCasePayload) {
    const { thread, comment } = useCasePayload
    await this._threadRepository.checkAvailabilityThread(thread)
    await this._commentRepository.checkAvailabilityComment(comment)
    const newReplies = new AddReplies(useCasePayload)
    return await this._repliesRepository.addReplies(newReplies)
  }
}

module.exports = AddRepliesUseCase
