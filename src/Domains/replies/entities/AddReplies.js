const DataTypeValidate = require('../../../Commons/helper/DataTypeValidate')

class AddReplies {
  constructor (payload) {
    this._verifyPayload(payload)

    const { thread, owner, content, comment } = payload

    this.thread = thread
    this.comment = comment
    this.owner = owner
    this.content = content
  }

  _verifyPayload ({ comment, thread, owner, content }) {
    const prefix = 'ADD_REPLIES.'
    if (!comment || !thread || !owner || !content) {
      throw new Error(prefix + 'NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (!DataTypeValidate(comment) || !DataTypeValidate(thread) || !DataTypeValidate(owner) || !DataTypeValidate(content)) {
      throw new Error(prefix + 'NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}

module.exports = AddReplies
