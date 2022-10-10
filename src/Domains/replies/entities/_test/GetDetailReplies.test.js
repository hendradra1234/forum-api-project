/* eslint-disable no-undef */
const GetDetailReplies = require('../GetDetailReplies')
const detailCommentPrefix = 'DETAIL_REPLIES.'
describe('a Detail Comment Reply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {}

    // Action and Assert
    expect(() => new GetDetailReplies(payload)).toThrowError(detailCommentPrefix + 'NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      replies: {}
    }

    // Action and Assert
    expect(() => new GetDetailReplies(payload)).toThrowError(detailCommentPrefix + 'NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should remap Detail Comment Reply object correctly', () => {
    // Arrange
    const payload = {
      replies: [{
        id: 'reply-wdqwdqwdwd',
        username: 'Clari',
        date: '2022-08-08T07:22:33.555Z',
        content: 'comment',
        is_delete: false
      },
      {
        id: 'reply-dqwdqwdqwdqwd',
        username: 'hendra',
        date: '2022-08-08T07:26:21.338Z',
        content: 'komentar',
        is_delete: true
      },
      {
        id: 'reply-wdqwsasswdwd',
        username: 'Clari',
        date: '2022-08-08T07:22:33.555Z',
        content: 'comment trial',
        is_delete: false
      }]
    }

    // Action
    const { replies } = new GetDetailReplies(payload)

    // Assert
    const expectedRemap = [
      {
        id: 'reply-wdqwdqwdwd',
        username: 'Clari',
        date: '2022-08-08T07:22:33.555Z',
        content: 'comment'
      },
      {
        id: 'reply-dqwdqwdqwdqwd',
        username: 'hendra',
        date: '2022-08-08T07:26:21.338Z',
        content: '**balasan telah dihapus**'
      },
      {
        id: 'reply-wdqwsasswdwd',
        username: 'Clari',
        date: '2022-08-08T07:22:33.555Z',
        content: 'comment trial'
      }
    ]
    expect(replies).toEqual(expectedRemap)
  })

  it('should create Detail Comment Reply object correctly', () => {
    // Arrange
    const payload = {
      replies: [{
        id: 'reply-wdqwdqwdwd',
        username: 'Clari',
        date: '2022-08-08T07:22:33.555Z',
        content: 'comment'
      },
      {
        id: 'reply-dqwdqwdqwdqwd',
        username: 'hendra',
        date: '2022-08-08T07:26:21.338Z',
        content: '**balasan telah dihapus**'
      },
      {
        id: 'reply-wdqwsasswdwd',
        username: 'Clari',
        date: '2022-08-08T07:22:33.555Z',
        content: 'comment trial'
      }]
    }

    // Action
    const { replies } = new GetDetailReplies(payload)

    // Assert
    expect(replies).toEqual(payload.replies)
  })
})
