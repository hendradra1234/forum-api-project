/* eslint-disable no-undef */
const AddedReplies = require('../AddedReplies')
const addedCommentReplyPrefix = 'ADDED_REPLIES.'
describe('a AddedCommentReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      content: 'tes comment reply',
      owner: 'user-123'
    }

    expect(() => new AddedReplies(payload)).toThrowError(addedCommentReplyPrefix + 'NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: 'reply-abc123',
      content: ['tes comment reply'],
      owner: true
    }

    expect(() => new AddedReplies(payload)).toThrowError(addedCommentReplyPrefix + 'NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create new comment Reply object correctly', () => {
    // Arrange
    const payload = {
      id: 'reply-abc123',
      content: 'tes comment reply',
      owner: 'user-123'
    }

    // Action
    const addedCommentReply = new AddedReplies(payload)

    // Assert
    expect(addedCommentReply.id).toEqual(payload.id)
    expect(addedCommentReply.content).toEqual(payload.content)
    expect(addedCommentReply.owner).toEqual(payload.owner)
  })
})
