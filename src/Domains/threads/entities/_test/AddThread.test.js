/* eslint-disable no-undef */
const AddThread = require('./../AddThread')
const prefix = 'ADD_THREAD.'
describe('a Add Thead entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'abc',
      owner: 'usr-xxx'
    }

    // Action and Assert
    expect(() => new AddThread(payload)).toThrowError(prefix + 'NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      title: '123',
      owner: true,
      body: 'abc1212e12e12e'
    }

    // Action and Assert
    expect(() => new AddThread(payload)).toThrowError(prefix + 'NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should throw error when title contains more than 250 character', () => {
    // Arrange
    const payload = {
      title: 'habeiwenfiwbefiefb2iednwefb2diwnf2eufbqodjcwuefb2eufv2befui2bfwjdn 2iodh2fchjwehcfbreyufbwnjcwehvfwuecnfwueyfbwcifwgfuywefbwuefbwefuywecvbehubcwehn2eifu1nwfi23fb2ifb2uf2b3fuy2b3fuy2b3fyu23fv2u3f',
      owner: 'user-xxx',
      body: 'someContent'
    }

    // Action and Assert
    expect(() => new AddThread(payload)).toThrowError(prefix + 'TITLE_LIMIT_CHAR')
  })

  it('should create addThread object correctly', () => {
    // Arrange
    const payload = {
      title: 'title',
      owner: 'user-xxx',
      body: 'someContent'
    }

    // Action
    const { title, owner, body } = new AddThread(payload)

    // Assert
    expect(title).toEqual(payload.title)
    expect(owner).toEqual(payload.owner)
    expect(body).toEqual(payload.body)
  })
})
