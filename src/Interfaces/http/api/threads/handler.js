const AddThreadUseCase = require('../../../../Applications/use_case/Thread/AddThreadUseCase')
const DetailTheadUseCase = require('../../../../Applications/use_case/Thread/DetailTheadUseCase')

class ThreadsHandler {
  constructor (container) {
    this._container = container
    this.postThreadsHandler = this.postThreadsHandler.bind(this)
    this.getDetailThreadHandler = this.getDetailThreadHandler.bind(this)
    this.DashboardHandler = this.DashboardHandler.bind(this)
  }

  async postThreadsHandler (request, h) {
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name)
    const { id: owner } = request.auth.credentials
    const { title, body } = request.payload
    const addPayload = { owner, title, body }

    const addedThread = await addThreadUseCase.execute(addPayload)

    const response = h.response({
      status: 'success',
      data: {
        addedThread
      }
    })
    response.code(201)
    return response
  }

  async getDetailThreadHandler (request, h) {
    const { threadId } = request.params
    const parameter = { thread: threadId }

    const detailThreadUseCase = this._container.getInstance(DetailTheadUseCase.name)
    const { thread } = await detailThreadUseCase.execute(parameter)

    const response = h.response({
      status: 'success',
      data: {
        thread
      }
    })
    response.code(200)
    return response
  }

  async DashboardHandler (request, h) {
    const response = h.response({
      status: 'success',
      value: 'Dashboard-Welcome',
      message: 'Welcome to Forum-API'
    })
    response.code(200)
    return response
  }
}

module.exports = ThreadsHandler
