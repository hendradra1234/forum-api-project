/* eslint-disable no-undef */
const DomainErrorTranslator = require('../DomainErrorTranslator')
const InvariantError = require('../InvariantError')

describe('DomainErrorTranslator', () => {
  it('should translate error correctly', () => {
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'))
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION')))
      .toStrictEqual(new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'))
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.USERNAME_LIMIT_CHAR')))
      .toStrictEqual(new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'))
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER')))
      .toStrictEqual(new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'))

    expect(DomainErrorTranslator.translate(new Error('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('harus mengirimkan username dan password'))
    expect(DomainErrorTranslator.translate(new Error('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION')))
      .toStrictEqual(new InvariantError('username dan password harus string'))
    expect(DomainErrorTranslator.translate(new Error('REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN')))
      .toStrictEqual(new InvariantError('harus mengirimkan token refresh'))
    expect(DomainErrorTranslator.translate(new Error('REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION')))
      .toStrictEqual(new InvariantError('refresh token harus string'))
    expect(DomainErrorTranslator.translate(new Error('DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN')))
      .toStrictEqual(new InvariantError('harus mengirimkan token refresh'))
    expect(DomainErrorTranslator.translate(new Error('DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION')))
      .toStrictEqual(new InvariantError('refresh token harus string'))
    expect(DomainErrorTranslator.translate(new Error('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('add thread payload not contain needed property'))
    expect(DomainErrorTranslator.translate(new Error('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')))
      .toStrictEqual(new InvariantError('add thread payload not meed data type specification'))
    expect(DomainErrorTranslator.translate(new Error('ADD_THREAD.TITLE_LIMIT_CHAR')))
      .toStrictEqual(new InvariantError('add thread title more than 250 character limit'))
    expect(DomainErrorTranslator.translate(new Error('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('added thread payload not contain needed property'))
    expect(DomainErrorTranslator.translate(new Error('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')))
      .toStrictEqual(new InvariantError('added thread payload not meet data type specification'))
    expect(DomainErrorTranslator.translate(new Error('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('add comment payload not contain needed property'))
    expect(DomainErrorTranslator.translate(new Error('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')))
      .toStrictEqual(new InvariantError('add comment payload not meet data type specification'))
    expect(DomainErrorTranslator.translate(new Error('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('added comment payload not contain needed property'))
    expect(DomainErrorTranslator.translate(new Error('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')))
      .toStrictEqual(new InvariantError('added comment payload not meet data type specification'))

    expect(DomainErrorTranslator.translate(new Error('ADD_REPLIES.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('add replies payload not contain needed property'))
    expect(DomainErrorTranslator.translate(new Error('ADD_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION')))
      .toStrictEqual(new InvariantError('add replies payload not meet data type specification'))
    expect(DomainErrorTranslator.translate(new Error('ADDED_REPLIES.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('added replies payload not contain needed property'))
    expect(DomainErrorTranslator.translate(new Error('ADDED_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION')))
      .toStrictEqual(new InvariantError('added replies payload not meet data type specification'))
  })

  it('should return original error when error message is not needed to translate', () => {
    // Arrange
    const error = new Error('some_error_message')

    // Action
    const translatedError = DomainErrorTranslator.translate(error)

    // Assert
    expect(translatedError).toStrictEqual(error)
  })
})
