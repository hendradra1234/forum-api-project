const DataTypeValidate = require('../../../Commons/helper/DataTypeValidate')

class DeleteCommentUseCase {
  constructor ({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository
    this._threadRepository = threadRepository
  }

  async execute (useCasePayload) {
    this._validatePayload(useCasePayload)
    const { thread, comment, owner } = useCasePayload
    await this._threadRepository.checkAvailabilityThread(thread)
    await this._commentRepository.checkAvailabilityComment(comment)
    await this._commentRepository.verifyCommentOwner(comment, owner)
    await this._commentRepository.deleteComment(comment)
  }

  _prefix = 'DELETE_COMMENT_USE_CASE.'
  _validatePayload ({ thread, comment, owner }) {
    if (!thread || !comment || !owner) {
      throw new Error(this._prefix + 'NOT_CONTAIN_VALID_PAYLOAD')
    }
    if (!DataTypeValidate(thread) || !DataTypeValidate(comment) || !DataTypeValidate(owner)) {
      throw new Error(this._prefix + 'PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}

module.exports = DeleteCommentUseCase
