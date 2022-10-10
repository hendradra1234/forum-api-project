/* eslint-disable no-undef */
const GetDetailComment = require('../GetDetailComment')
const prefix = 'DETAIL_COMMENT.'
describe('a Detail Comment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {}

    // Action and Assert
    expect(() => new GetDetailComment(payload)).toThrowError(prefix + 'NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      comments: {}
    }

    // Action and Assert
    expect(() => new GetDetailComment(payload)).toThrowError(prefix + 'NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should remap Detail Comment object correctly', () => {
    // Arrange
    const payload = {
      comments: [{
        id: 'comment-wdqwdqwdwd',
        username: 'Clari',
        date: '2022-08-08T07:22:33.555Z',
        content: 'comment',
        is_delete: false
      },
      {
        id: 'comment-dqwdqwdqwdqwd',
        username: 'hendra',
        date: '2022-08-08T07:26:21.338Z',
        content: 'komentar',
        is_delete: true
      },
      {
        id: 'comment-wdqwsasswdwd',
        username: 'Clari',
        date: '2022-08-08T07:22:33.555Z',
        content: 'comment trial',
        is_delete: false
      }]
    }

    // Action
    const { comments } = new GetDetailComment(payload)

    // Assert
    const expectedRemap = [
      {
        id: 'comment-wdqwdqwdwd',
        username: 'Clari',
        date: '2022-08-08T07:22:33.555Z',
        content: 'comment'
      },
      {
        id: 'comment-dqwdqwdqwdqwd',
        username: 'hendra',
        date: '2022-08-08T07:26:21.338Z',
        content: '**komentar telah dihapus**'
      },
      {
        id: 'comment-wdqwsasswdwd',
        username: 'Clari',
        date: '2022-08-08T07:22:33.555Z',
        content: 'comment trial'
      }
    ]
    expect(comments).toEqual(expectedRemap)
  })

  it('should create Detail Comment object correctly', () => {
    // Arrange
    const payload = {
      comments: [{
        id: 'comment-wdqwdqwdwd',
        username: 'Clari',
        date: '2022-08-08T07:22:33.555Z',
        content: 'comment'
      },
      {
        id: 'comment-dqwdqwdqwdqwd',
        username: 'hendra',
        date: '2022-08-08T07:26:21.338Z',
        content: '**komentar telah dihapus**'
      },
      {
        id: 'comment-wdqwsasswdwd',
        username: 'Clari',
        date: '2022-08-08T07:22:33.555Z',
        content: 'comment trial'
      }]
    }

    // Action
    const { comments } = new GetDetailComment(payload)

    // Assert
    expect(comments).toEqual(payload.comments)
  })
})
