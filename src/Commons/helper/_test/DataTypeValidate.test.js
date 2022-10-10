/* eslint-disable no-undef */
const DataTypeValidate = require('../DataTypeValidate')

describe('DataTypeValidate', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should check invalid Data Type correctly', async () => {
    // Assert
    const status = DataTypeValidate(123, 'string')
    expect(status).toStrictEqual(false)
  })

  it('should check valid Data Type correctly', async () => {
    // Assert
    const status = DataTypeValidate('12', 'string')
    expect(status).toStrictEqual(true)
  })
})
