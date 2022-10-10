const DataTypeValidate = require('../../../Commons/helper/DataTypeValidate')

class DeleteRepliesUseCase {
  constructor ({ commentRepository, threadRepository, repliesRepository }) {
    this._commentRepository = commentRepository
    this._threadRepository = threadRepository
    this._repliesRepository = repliesRepository
  }

  async execute (useCasePayload) {
    this._validatePayload(useCasePayload)
    const { thread, comment, owner, reply } = useCasePayload
    await this._threadRepository.checkAvailabilityThread(thread)
    await this._commentRepository.checkAvailabilityComment(comment)
    await this._repliesRepository.checkAvailabilityReplies(reply)
    await this._repliesRepository.verifyRepliesOwner(reply, owner)
    return await this._repliesRepository.deleteReplies(reply)
  }

  _prefix = 'DELETE_REPLIES_USE_CASE.'
  _validatePayload ({ thread, comment, owner, reply }) {
    if (!thread || !comment || !owner || !reply) {
      throw new Error(this._prefix + 'NOT_CONTAIN_VALID_PAYLOAD')
    }
    if (!DataTypeValidate(thread) || !DataTypeValidate(comment) || !DataTypeValidate(owner) || !DataTypeValidate(reply)) {
      throw new Error(this._prefix + 'PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}

module.exports = DeleteRepliesUseCase
