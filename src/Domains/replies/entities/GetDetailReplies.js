class GetDetailReplies {
  constructor (payload) {
    this._verifyPayload(payload)

    this.replies = this._remapPayload(payload)
  }

  _verifyPayload ({ replies }) {
    const prefix = 'DETAIL_REPLIES.'
    if (!replies) {
      throw new Error(prefix + 'NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (!Array.isArray(replies)) {
      throw new Error(prefix + 'NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }

  _remapPayload ({ replies }) {
    return replies.map((replies) => {
      return {
        id: replies.id,
        username: replies.username,
        date: replies.date,
        content: !replies.is_delete ? replies.content : '**balasan telah dihapus**'
      }
    })
  }
}

module.exports = GetDetailReplies
