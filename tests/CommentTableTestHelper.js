/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool')

const CommentTableTestHelper = {
  async addComment ({
    id = 'comment-xxx', content = 'a content', thread = 'thread-xxx', owner = 'user-xxx'
  }) {
    const creation = new Date().toISOString()
    const modified = creation
    const query = {
      text: `INSERT INTO comments(id, content, thread, owner, creation, modified) 
      VALUES($1, $2, $3, $4, $5, $6)`,
      values: [id, content, thread, owner, creation, modified]
    }

    await pool.query(query)
  },

  async findCommentsById (id) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [id]
    }

    const result = await pool.query(query)
    return result.rows
  },

  async checkIsDeleteCommentById (id) {
    const query = {
      text: 'SELECT is_delete FROM comments WHERE id = $1',
      values: [id]
    }

    const result = await pool.query(query)
    return result.rows[0].is_delete
  },

  async DeleteComment (id) {
    const query = {
      text: 'DELETE FROM comments WHERE id = $1',
      values: [id]
    }

    const result = await pool.query(query)
    return result.rows[0].is_delete
  },

  async cleanTable () {
    await pool.query('DELETE FROM comments WHERE 1=1')
  }
}

module.exports = CommentTableTestHelper
