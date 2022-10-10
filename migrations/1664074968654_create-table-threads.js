/* eslint-disable camelcase */

const table = 'threads'
exports.up = (pgm) => {
  pgm.createTable(table, {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true
    },
    title: {
      type: 'VARCHAR(250)',
      notNull: true
    },
    body: {
      type: 'TEXT',
      notNull: true
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true
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
  pgm.addConstraint(table, 'fk_threads.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE')
}

exports.down = (pgm) => { pgm.dropTable(table) }
