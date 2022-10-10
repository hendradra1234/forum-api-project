class RepliesRepository {
  _prefix = 'REPLIES_REPOSITORY.'
  async addReplies (payload) {
    throw new Error(this._prefix + 'METHOD_NOT_IMPLEMENTED')
  }

  async checkAvailabilityReplies (payload) {
    throw new Error(this._prefix + 'METHOD_NOT_IMPLEMENTED')
  }

  async checkRepliesOwner (payload) {
    throw new Error(this._prefix + 'METHOD_NOT_IMPLEMENTED')
  }

  async deleteReplies (payload) {
    throw new Error(this._prefix + 'METHOD_NOT_IMPLEMENTED')
  }

  async getRepliesComment (comment) {
    throw new Error(this._prefix + 'METHOD_NOT_IMPLEMENTED')
  }
}

module.exports = RepliesRepository
