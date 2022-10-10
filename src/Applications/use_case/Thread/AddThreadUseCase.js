const AddThread = require('../../../Domains/threads/entities/AddThread')

class AddThreadUseCase {
  constructor ({ threadRepository }) {
    this._threadRepository = threadRepository
  }

  async execute (useCasePayload) {
    const newData = new AddThread(useCasePayload)
    return await this._threadRepository.addThread(newData)
  }
}

module.exports = AddThreadUseCase
