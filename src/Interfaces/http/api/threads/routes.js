const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads',
    handler: handler.postThreadsHandler,
    options: {
      auth: 'system_forum_api_jwt'
    }
  },
  {
    method: 'GET',
    path: '/threads/{threadId}',
    handler: handler.getDetailThreadHandler
  }
])

module.exports = routes
