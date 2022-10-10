/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool')

const RepliesTableTestHelper = {
  async addReplies ({
    id = 'replies-xxx', comment = 'a comment', content = 'a content', thread = 'thread-xxx', owner = 'user-xxx'
  }) {
    const creation = new Date().toISOString()
    const modified = creation
    const query = {
      text: `INSERT INTO replies(id, content, thread, comment, owner, creation, modified) 
      VALUES($1, $2, $3, $4, $5, $6, $7)`,
      values: [id, content, thread, comment, owner, creation, modified]
    }

    await pool.query(query)
  },

  async findRepliesById (id) {
    const query = {
      text: 'SELECT * FROM replies WHERE id = $1',
      values: [id]
    }

    const result = await pool.query(query)
    return result.rows
  },

  async checkIsDeleteRepliesById (id) {
    const query = {
      text: 'SELECT is_delete FROM replies WHERE id = $1',
      values: [id]
    }

    const result = await pool.query(query)
    return result.rows[0].is_delete
  },

  async DeleteReplies (id) {
    const query = {
      text: 'DELETE FROM replies WHERE id = $1',
      values: [id]
    }

    const result = await pool.query(query)
    return result.rows[0].is_delete
  },

  async cleanTable () {
    await pool.query('DELETE FROM replies WHERE 1=1')
  }
}

module.exports = RepliesTableTestHelper
