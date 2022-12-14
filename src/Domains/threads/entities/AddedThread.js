const DataTypeValidate = require('../../../Commons/helper/DataTypeValidate')

class AddedThread {
  constructor (payload) {
    this._verifyPayload(payload)

    const { id, title, owner } = payload

    this.id = id
    this.title = title
    this.owner = owner
  }

  _verifyPayload ({ id, title, owner }) {
    const prefix = 'ADDED_THREAD.'
    if (!id || !title || !owner) {
      throw new Error(prefix + 'NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (!DataTypeValidate(id) || !DataTypeValidate(title) || !DataTypeValidate(owner)) {
      throw new Error(prefix + 'NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}

module.exports = AddedThread
