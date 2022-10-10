/* eslint-disable no-undef */
const RepliesRepository = require('../RepliesRepository')
const prefix = 'REPLIES_REPOSITORY.'

describe('CommentRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const repliesRepository = new RepliesRepository()

    // Action and Assert
    await expect(repliesRepository.addReplies({})).rejects.toThrowError(prefix + 'METHOD_NOT_IMPLEMENTED')
    await expect(repliesRepository.checkAvailabilityReplies({})).rejects.toThrowError(prefix + 'METHOD_NOT_IMPLEMENTED')
    await expect(repliesRepository.deleteReplies({})).rejects.toThrowError(prefix + 'METHOD_NOT_IMPLEMENTED')
    await expect(repliesRepository.checkRepliesOwner({})).rejects.toThrowError(prefix + 'METHOD_NOT_IMPLEMENTED')
    await expect(repliesRepository.getRepliesComment({})).rejects.toThrowError(prefix + 'METHOD_NOT_IMPLEMENTED')
  })
})
