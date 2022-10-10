class GetDetailComment {
  constructor (payload) {
    this._verifyPayload(payload)

    this.comments = this._remapPayload(payload)
  }

  _verifyPayload ({ comments }) {
    const prefix = 'DETAIL_COMMENT.'
    if (!comments) {
      throw new Error(prefix + 'NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (!Array.isArray(comments)) {
      throw new Error(prefix + 'NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }

  _remapPayload ({ comments }) {
    return comments.map((comment) => {
      return {
        id: comment.id,
        username: comment.username,
        date: comment.date,
        replies: comment.replies,
        content: !comment.is_delete ? comment.content : '**komentar telah dihapus**'
      }
    })
  }
}

module.exports = GetDetailComment
