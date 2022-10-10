const NotFoundError = require('../../Commons/exceptions/NotFoundError')
const AddedThread = require('../../Domains/threads/entities/AddedThread')
const ThreadRepository = require('../../Domains/threads/ThreadRepository')

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor (pool, idGenerator) {
    super()
    this._pool = pool
    this._idGenerator = idGenerator
  }

  async addThread (payload) {
    const { title, body, owner } = payload
    const id = `thread-${this._idGenerator()}`
    const creation = new Date().toISOString()
    const modified = creation
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5, $6) RETURNING id, title, body, owner',
      values: [id, title, body, owner, creation, modified]
    }

    const result = await this._pool.query(query)

    return new AddedThread({ ...result.rows[0] })
  }

  async checkAvailabilityThread (thread) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [thread]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('thread not found')
    }
    return result.rows
  }

  async getDetailThread (thread) {
    const query = {
      text: `SELECT threads.id, title, username, body, threads.creation AS "date"
      FROM threads LEFT JOIN users ON threads.owner = users.id
      WHERE threads.id = $1`,
      values: [thread]
    }

    const result = await this._pool.query(query)
    return result.rows[0]
  }
}

module.exports = ThreadRepositoryPostgres
