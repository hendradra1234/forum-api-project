/* eslint-disable valid-typeof */
// default string dataType
const DataTypeValidate = (data, type = 'string') => {
  return typeof data === type
}

module.exports = DataTypeValidate
