/* eslint-disable camelcase */
const table = 'authentications'
exports.up = (pgm) => {
  pgm.createTable(table, {
    token: {
      type: 'TEXT',
      notNull: true
    }
  })
}

exports.down = (pgm) => {
  pgm.dropTable(table)
}
