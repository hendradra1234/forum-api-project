/* eslint-disable no-undef */
const AddedComment = require('../AddedComment')
const prefix = 'ADDED_COMMENT.'
describe('a AddedComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      content: 'tes comment',
      owner: 'user-123'
    }

    expect(() => new AddedComment(payload)).toThrowError(prefix + 'NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload not meet data type specification', () => {
    const payload = {
      id: 'comment-abc123',
      content: ['tes comment'],
      owner: 'user-123'
    }

    expect(() => new AddedComment(payload)).toThrowError(prefix + 'NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create new comment object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-abc123',
      content: 'tes comment',
      owner: 'user-123'
    }

    // Action
    const addedThread = new AddedComment(payload)

    // Assert
    expect(addedThread.id).toEqual(payload.id)
    expect(addedThread.content).toEqual(payload.content)
    expect(addedThread.owner).toEqual(payload.owner)
  })
})
