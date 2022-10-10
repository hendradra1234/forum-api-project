const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads/{threadId}/comments/{commentId}/replies',
    handler: handler.postCommentRepliesHandler,
    options: {
      auth: 'system_forum_api_jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}/replies/{replyId}',
    handler: handler.DeleteRepliesCommentHandler,
    options: {
      auth: 'system_forum_api_jwt'
    }
  }
])

module.exports = routes
