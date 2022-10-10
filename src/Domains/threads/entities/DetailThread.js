const DataTypeValidate = require('../../../Commons/helper/DataTypeValidate')

class DetailThread {
  constructor (payload) {
    this._verifyPayload(payload)

    const { thread } = payload

    this.thread = thread
  }

  _verifyPayload ({ thread }) {
    const prefix = 'DETAIL_THREAD.'
    if (!thread) {
      throw new Error(prefix + 'NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (!DataTypeValidate(thread)) {
      throw new Error(prefix + 'NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}

module.exports = DetailThread
