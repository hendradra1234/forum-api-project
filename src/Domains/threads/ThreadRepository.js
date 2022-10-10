class ThreadRepository {
  async addThread (payload) {
    throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async checkAvailabilityThread (thread) {
    throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getDetailThread (thread) {
    throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }
}

module.exports = ThreadRepository
