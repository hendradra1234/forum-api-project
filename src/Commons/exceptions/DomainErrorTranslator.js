const InvariantError = require('./InvariantError')

const DomainErrorTranslator = {
  translate (error) {
    return DomainErrorTranslator._directories[error.message] || error
  }
}

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('harus mengirimkan username dan password'),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('username dan password harus string'),
  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('add thread payload not contain needed property'),
  'ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('add thread payload not meed data type specification'),
  'ADD_THREAD.TITLE_LIMIT_CHAR': new InvariantError('add thread title more than 250 character limit'),
  'ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('added thread payload not contain needed property'),
  'ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('added thread payload not meet data type specification'),
  'ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('add comment payload not contain needed property'),
  'ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('add comment payload not meet data type specification'),
  'ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('added comment payload not contain needed property'),
  'ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('added comment payload not meet data type specification'),
  'ADD_REPLIES.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('add replies payload not contain needed property'),
  'ADD_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('add replies payload not meet data type specification'),
  'ADDED_REPLIES.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('added replies payload not contain needed property'),
  'ADDED_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('added replies payload not meet data type specification')
}

module.exports = DomainErrorTranslator
