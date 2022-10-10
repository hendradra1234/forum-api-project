class CommentRepository {
  _prefix = 'COMMENT_REPOSITORY.'
  async addComment (payload) {
    throw new Error(this._prefix + 'METHOD_NOT_IMPLEMENTED')
  }

  async checkAvailabilityComment (comment) {
    throw new Error(this._prefix + 'METHOD_NOT_IMPLEMENTED')
  }

  async getDetailComment (comment) {
    throw new Error(this._prefix + 'METHOD_NOT_IMPLEMENTED')
  }

  async getCommentThread (thread) {
    throw new Error(this._prefix + 'METHOD_NOT_IMPLEMENTED')
  }

  async deleteComment (comment) {
    throw new Error(this._prefix + 'METHOD_NOT_IMPLEMENTED')
  }
}

module.exports = CommentRepository
