const DataTypeValidate = require('../../../Commons/helper/DataTypeValidate')

class AddThread {
  constructor (payload) {
    this._verifyPayload(payload)

    const { title, owner, body } = payload

    this.title = title
    this.owner = owner
    this.body = body
  }

  _verifyPayload ({ title, owner, body }) {
    const prefix = 'ADD_THREAD.'
    if (!title || !owner || !body) {
      throw new Error(prefix + 'NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (!DataTypeValidate(title) || !DataTypeValidate(owner) || !DataTypeValidate(body)) {
      throw new Error(prefix + 'NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
    if (title.length > 50) {
      throw new Error(prefix + 'TITLE_LIMIT_CHAR')
    }
  }
}

module.exports = AddThread
