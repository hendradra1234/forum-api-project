/* eslint-disable camelcase */

const table = 'replies'
exports.up = (pgm) => {
  pgm.createTable(table, {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    comment: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    thread: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    content: {
      type: 'TEXT',
      notNull: true
    },
    is_delete: {
      type: 'BOOLEAN',
      default: false
    },
    creation: {
      type: 'TIMESTAMPTZ',
      notNull: true
    },
    modified: {
      type: 'TIMESTAMPTZ',
      notNull: true
    }
  })
  pgm.addConstraint(table, 'fk_comment_reply.owner_comment_reply_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE')
  pgm.addConstraint(table, 'fk_comment_reply.comment_reply_comment.id', 'FOREIGN KEY(comment) REFERENCES comments(id) ON UPDATE CASCADE ON DELETE CASCADE')
  pgm.addConstraint(table, 'fk_comment_reply.comment_reply_threads.id', 'FOREIGN KEY(thread) REFERENCES threads(id) ON UPDATE CASCADE ON DELETE CASCADE')
}

exports.down = (pgm) => { pgm.dropTable(table) }
