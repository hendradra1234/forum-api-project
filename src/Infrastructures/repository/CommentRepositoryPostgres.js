const AuthorizationError = require('../../Commons/exceptions/AuthorizationError')
const NotFoundError = require('../../Commons/exceptions/NotFoundError')
const CommentRepository = require('../../Domains/comments/CommentRepository')
const AddedComment = require('../../Domains/comments/entities/AddedComment')

class CommentRepositoryPostgres extends CommentRepository {
  constructor (pool, idGenerator) {
    super()
    this._pool = pool
    this._idGenerator = idGenerator
  }

  async checkIsDeletedCommentsById (id) {
    const query = {
      text: 'SELECT is_delete FROM comments WHERE id = $1',
      values: [id]
    }

    const result = await this._pool.query(query)
    return result.rows[0].is_delete
  }

  async addComment (payload) {
    const { content, thread, owner } = payload
    const id = `comment-${this._idGenerator()}`
    const creation = new Date().toISOString()
    const modified = creation
    const query = {
      text: `INSERT INTO comments(id, content, thread, owner, creation, modified)
      VALUES($1, $2, $3, $4, $5, $6) RETURNING id, content, owner`,
      values: [id, content, thread, owner, creation, modified]
    }

    const result = await this._pool.query(query)

    return new AddedComment({ ...result.rows[0] })
  }

  async checkAvailabilityComment (comment) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [comment]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('comment not found')
    }
    return result.rows
  }

  async verifyCommentOwner (comment, owner) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1 AND owner = $2',
      values: [comment, owner]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new AuthorizationError('Access Denied, only Owner can delete this comment')
    }
    return result.rows
  }

  async deleteComment (comment) {
    const isDeleted = true
    const query = {
      text: 'UPDATE comments SET is_delete = $1 WHERE id = $2 RETURNING id',
      values: [isDeleted, comment]
    }
    const result = await this._pool.query(query)
    return result.rows[0]
  }

  async getCommentThread (thread) {
    const query = {
      text: `SELECT comments.id, comments.content, users.username,
        comments.is_delete, comments.creation AS "date"
        FROM comments LEFT JOIN users ON comments.owner = users.id
        WHERE comments.thread = $1 ORDER BY comments.creation ASC
        `,
      values: [thread]
    }
    const result = await this._pool.query(query)
    return result.rows
  }
}

module.exports = CommentRepositoryPostgres
