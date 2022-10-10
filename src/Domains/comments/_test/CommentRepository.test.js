/* eslint-disable no-undef */
const CommentRepository = require('../CommentRepository')

describe('CommentRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const commentRepository = new CommentRepository()

    // Action and Assert
    const prefix = 'COMMENT_REPOSITORY.'
    await expect(commentRepository.addComment({})).rejects.toThrowError(prefix + 'METHOD_NOT_IMPLEMENTED')
    await expect(commentRepository.checkAvailabilityComment({})).rejects.toThrowError(prefix + 'METHOD_NOT_IMPLEMENTED')
    await expect(commentRepository.getDetailComment({})).rejects.toThrowError(prefix + 'METHOD_NOT_IMPLEMENTED')
    await expect(commentRepository.getCommentThread({})).rejects.toThrowError(prefix + 'METHOD_NOT_IMPLEMENTED')
    await expect(commentRepository.deleteComment({})).rejects.toThrowError(prefix + 'METHOD_NOT_IMPLEMENTED')
  })
})
