const DataTypeValidate = require('../../../Commons/helper/DataTypeValidate')

class AddComment {
  constructor (payload) {
    this._verifyPayload(payload)

    const { thread, owner, content } = payload

    this.thread = thread
    this.owner = owner
    this.content = content
  }

  _verifyPayload ({ thread, owner, content }) {
    const prefix = 'ADD_COMMENT.'
    if (!thread || !owner || !content) {
      throw new Error(prefix + 'NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (!DataTypeValidate(thread) || !DataTypeValidate(owner) || !DataTypeValidate(content)) {
      throw new Error(prefix + 'NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}

module.exports = AddComment
