const DataTypeValidate = require('../../../Commons/helper/DataTypeValidate')

class AddedReplies {
  constructor (payload) {
    this._verifyPayload(payload)

    const { id, content, owner } = payload

    this.id = id
    this.content = content
    this.owner = owner
  }

  _verifyPayload ({ id, content, owner }) {
    const prefix = 'ADDED_REPLIES.'
    if (!id || !content || !owner) {
      throw new Error(prefix + 'NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (!DataTypeValidate(id) || !DataTypeValidate(content) || !DataTypeValidate(owner)) {
      throw new Error(prefix + 'NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}

module.exports = AddedReplies
