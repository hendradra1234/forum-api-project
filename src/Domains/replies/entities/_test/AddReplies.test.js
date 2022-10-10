/* eslint-disable no-undef */
const AddReplies = require('../AddReplies')
const prefix = 'ADD_REPLIES.'
describe('a Add Comment Reply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      thread: 'thread-xxx',
      owner: 'usr-xxx'
    }

    // Action and Assert
    expect(() => new AddReplies(payload)).toThrowError(prefix + 'NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      thread: 'thread-xxx',
      comment: 'comment-xxx',
      owner: true,
      content: ['someContent']
    }

    // Action and Assert
    expect(() => new AddReplies(payload)).toThrowError(prefix + 'NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create addComment Reply object correctly', () => {
    // Arrange
    const payload = {
      thread: 'thread-xxx',
      comment: 'comment-xxx',
      owner: 'user-xxx',
      content: 'someContent'
    }

    // Action
    const { thread, comment, owner, content } = new AddReplies(payload)

    // Assert
    expect(thread).toEqual(payload.thread)
    expect(comment).toEqual(payload.comment)
    expect(owner).toEqual(payload.owner)
    expect(content).toEqual(payload.content)
  })
})
