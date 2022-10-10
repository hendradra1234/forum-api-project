const AuthorizationError = require('../../Commons/exceptions/AuthorizationError')
const NotFoundError = require('../../Commons/exceptions/NotFoundError')
const AddedReplies = require('../../Domains/replies/entities/AddedReplies')
const RepliesRepository = require('../../Domains/replies/RepliesRepository')

class RepliesRepositoryPostgres extends RepliesRepository {
  constructor (pool, idGenerator) {
    super()
    this._pool = pool
    this._idGenerator = idGenerator
  }

  async checkIsDeletedRepliesById (id) {
    const query = {
      text: 'SELECT is_delete FROM replies WHERE id = $1',
      values: [id]
    }

    const result = await this._pool.query(query)
    return result.rows[0].is_delete
  }

  async addReplies (payload) {
    const { content, comment, thread, owner } = payload
    const id = `reply-${this._idGenerator()}`
    const creation = new Date().toISOString()
    const modified = creation
    const query = {
      text: `INSERT INTO replies(id, content, comment, thread, owner, creation, modified)
      VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id, content, owner`,
      values: [id, content, comment, thread, owner, creation, modified]
    }

    const result = await this._pool.query(query)

    return new AddedReplies({ ...result.rows[0] })
  }

  async checkAvailabilityReplies (replies) {
    const query = {
      text: 'SELECT * FROM replies WHERE id = $1',
      values: [replies]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('replies not found')
    }
    return result.rows
  }

  async verifyRepliesOwner (replies, owner) {
    const query = {
      text: 'SELECT * FROM replies WHERE id = $1 AND owner = $2',
      values: [replies, owner]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new AuthorizationError('Access Denied, only Owner can delete this reply')
    }
    return result.rows
  }

  async deleteReplies (comment) {
    const isDeleted = true
    const query = {
      text: 'UPDATE replies SET is_delete = $1 WHERE id = $2 RETURNING id',
      values: [isDeleted, comment]
    }
    const result = await this._pool.query(query)
    return result.rows[0]
  }

  async getRepliesComment (comment) {
    const query = {
      text: `SELECT replies.id, replies.content, users.username,
        replies.is_delete, replies.creation AS "date"
        FROM replies LEFT JOIN users ON replies.owner = users.id
        WHERE replies.comment = $1 ORDER BY replies.creation ASC
        `,
      values: [comment]
    }
    const result = await this._pool.query(query)
    return result.rows
  }
}

module.exports = RepliesRepositoryPostgres
