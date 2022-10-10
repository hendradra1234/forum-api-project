/* eslint-disable no-undef */
const AddedThread = require('../AddedThread')
const prefix = 'ADDED_THREAD.'
describe('a AddedThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      title: 'Sample title test',
      body: 'Nulla eiusmod esse aliquip do laborum fugiat enim consequat laborum aliquip consequat nulla labore.'
    }

    expect(() => new AddedThread(payload)).toThrowError(prefix + 'NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: 123,
      title: 'Sint consequat est duis amet consequat in do sit adipisicing quis id magna.',
      owner: true
    }

    expect(() => new AddedThread(payload)).toThrowError(prefix + 'NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create new thread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-abc123',
      title: 'Culpa irure velit elit ad veniam labore do ut enim.',
      owner: 'user-123'
    }

    // Action
    const addedThread = new AddedThread(payload)

    // Assert
    expect(addedThread.id).toEqual(payload.id)
    expect(addedThread.title).toEqual(payload.title)
    expect(addedThread.owner).toEqual(payload.owner)
  })
})
