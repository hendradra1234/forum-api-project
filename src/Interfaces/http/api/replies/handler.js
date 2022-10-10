const AddRepliesUseCase = require('../../../../Applications/use_case/Replies/AddRepliesUseCase')
const DeleteRepliesUseCase = require('../../../../Applications/use_case/Replies/DeleteRepliesUseCase')

class RepliesHandler {
  constructor (container) {
    this._container = container

    this.postCommentRepliesHandler = this.postCommentRepliesHandler.bind(this)
    this.DeleteRepliesCommentHandler = this.DeleteRepliesCommentHandler.bind(this)
  }

  async postCommentRepliesHandler (request, h) {
    const addReplyUseCase = this._container.getInstance(AddRepliesUseCase.name)
    const { content } = request.payload
    const { commentId } = request.params
    const { threadId } = request.params
    const { id: owner } = request.auth.credentials
    const commentReplyPayload = {
      owner,
      content,
      comment: commentId,
      thread: threadId
    }
    const addedReply = await addReplyUseCase.execute(commentReplyPayload)

    const response = h.response({
      status: 'success',
      data: {
        addedReply
      }
    })
    response.code(201)
    return response
  }

  async DeleteRepliesCommentHandler (request, h) {
    const deleteRepliesUseCase = this._container.getInstance(DeleteRepliesUseCase.name)
    const { id: owner } = request.auth.credentials
    const { threadId, commentId, replyId } = request.params
    const payload = {
      owner,
      thread: threadId,
      comment: commentId,
      reply: replyId
    }
    await deleteRepliesUseCase.execute(payload)

    const response = h.response({
      status: 'success'
    })
    response.code(200)
    return response
  }
}

module.exports = RepliesHandler
