/* eslint-disable no-undef */
const DetailThread = require('./../DetailThread')
const prefix = 'DETAIL_THREAD.'
describe('a Detail Thread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
    }

    // Action and Assert
    expect(() => new DetailThread(payload)).toThrowError(prefix + 'NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      thread: 123
    }

    // Action and Assert
    expect(() => new DetailThread(payload)).toThrowError(prefix + 'NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create registerUser object correctly', () => {
    // Arrange
    const payload = {
      thread: 'test_thrqad'
    }

    // Action
    const { thread } = new DetailThread(payload)

    // Assert
    expect(thread).toEqual(payload.thread)
  })
})
