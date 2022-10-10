/* eslint-disable no-undef */
const ThreadRepository = require('../ThreadRepository')

describe('ThreadRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const threadRepository = new ThreadRepository()

    // Action and Assert
    const prefix = 'THREAD_REPOSITORY.'
    await expect(threadRepository.addThread({})).rejects.toThrowError(prefix + 'METHOD_NOT_IMPLEMENTED')
    await expect(threadRepository.checkAvailabilityThread({})).rejects.toThrowError(prefix + 'METHOD_NOT_IMPLEMENTED')
    await expect(threadRepository.getDetailThread({})).rejects.toThrowError(prefix + 'METHOD_NOT_IMPLEMENTED')
  })
})
