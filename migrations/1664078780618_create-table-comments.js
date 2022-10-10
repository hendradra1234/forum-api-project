/* eslint-disable camelcase */

const table = 'comments'
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
  pgm.addConstraint(table, 'fk_comments.owner_comments_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE')
  pgm.addConstraint(table, 'fk_comments.thread_comments_threads.id', 'FOREIGN KEY(thread) REFERENCES threads(id) ON UPDATE CASCADE ON DELETE CASCADE')
}

exports.down = (pgm) => { pgm.dropTable(table) }
