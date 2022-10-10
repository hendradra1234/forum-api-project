const AddCommentUseCase = require('../../../../Applications/use_case/Comments/AddCommentUseCase')
const DeleteCommentUseCase = require('../../../../Applications/use_case/Comments/DeleteCommentUseCase')

class CommentsHandler {
  constructor (container) {
    this._container = container

    this.postCommentHandler = this.postCommentHandler.bind(this)
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this)
  }

  async postCommentHandler (request, h) {
    const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name)
    const { id: owner } = request.auth.credentials
    const { content } = request.payload
    const { threadId } = request.params
    const commentPayload = { owner, content, thread: threadId }
    const addedComment = await addCommentUseCase.execute(commentPayload)

    const response = h.response({
      status: 'success',
      data: {
        addedComment
      }
    })
    response.code(201)
    return response
  }

  async deleteCommentHandler (request, h) {
    const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name)
    const { id: owner } = request.auth.credentials
    const { threadId, commentId } = request.params
    const payload = {
      owner,
      thread: threadId,
      comment: commentId
    }
    await deleteCommentUseCase.execute(payload)

    const response = h.response({
      status: 'success'
    })
    response.code(200)
    return response
  }
}

module.exports = CommentsHandler
