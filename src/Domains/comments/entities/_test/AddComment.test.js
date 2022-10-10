/* eslint-disable no-undef */
const AddComment = require('../AddComment')
const prefix = 'ADD_COMMENT.'
describe('a Add Comment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      thread: 'thread-xxx',
      owner: 'usr-xxx'
    }

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError(prefix + 'NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      thread: '123',
      owner: true,
      content: 'abc1212e12e12e'
    }

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError(prefix + 'NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create addComment object correctly', () => {
    // Arrange
    const payload = {
      thread: 'title',
      owner: 'user-xxx',
      content: 'someContent'
    }

    // Action
    const { thread, owner, content } = new AddComment(payload)

    // Assert
    expect(thread).toEqual(payload.thread)
    expect(owner).toEqual(payload.owner)
    expect(content).toEqual(payload.content)
  })
})
