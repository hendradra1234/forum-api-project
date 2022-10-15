/* eslint-disable no-undef */
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const pool = require('../../database/postgres/pool')
const container = require('../../container')
const createServer = require('../createServer')
const loginPayload = {
  username: 'hendra',
  password: 'xxd2wd23d'
}

describe('/threads endpoint', () => {
  afterAll(async () => {
    await pool.end()
  })

  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable()
    await UsersTableTestHelper.cleanTable()
  })

  describe('when POST /threads', () => {
    it('should response 401 if payload not access token', async () => {
      // Arrange
      const server = await createServer(container)
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: {}
      })

      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(401)
      expect(responseJson.error).toEqual('Unauthorized')
      expect(responseJson.message).toEqual('Missing authentication')
    })

    it('should response 400 if payload not contain needed property', async () => {
      const server = await createServer(container)

      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          ...loginPayload,
          fullname: 'hendrakho'
        }
      })

      const authentication = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: loginPayload
      })

      const responseAuth = JSON.parse(authentication.payload)
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: {},
        headers: { Authorization: `Bearer ${responseAuth.data.accessToken}` }
      })

      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJson.status).toEqual('fail')
      expect(responseJson.message).toEqual('add thread payload not contain needed property')
    })

    it('should response 400 if payload not meet data type specification', async () => {
      const server = await createServer(container)

      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          ...loginPayload,
          fullname: 'Zaenurrochman'
        }
      })

      const authentication = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: loginPayload
      })

      const responseAuth = JSON.parse(authentication.payload)

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: {
          title: 123,
          body: true
        },
        headers: { Authorization: `Bearer ${responseAuth.data.accessToken}` }
      })

      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJson.status).toEqual('fail')
      expect(responseJson.message).toEqual('add thread payload not meed data type specification')
    })

    it('should response 201 and create new thread', async () => {
      const server = await createServer(container)

      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          ...loginPayload,
          fullname: 'Zaenurrochman'
        }
      })

      const authentication = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: loginPayload
      })

      const responseAuth = JSON.parse(authentication.payload)

      // Action
      const threadPayload = {
        title: 'sebuah thread',
        body: 'lorem ipsum dolorr sit amet'
      }
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: threadPayload,
        headers: { Authorization: `Bearer ${responseAuth.data.accessToken}` }
      })

      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(201)
      expect(responseJson.status).toEqual('success')
      expect(responseJson.data.addedThread.title).toEqual(threadPayload.title)
    })
  })
  describe('when GET /threads/{threadId}', () => {
    it('should response 404 when thread not valid', async () => {
      const server = await createServer(container)

      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          ...loginPayload,
          fullname: 'Zaenurrochman'
        }
      })

      const authentication = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: loginPayload
      })

      const responseAuth = JSON.parse(authentication.payload)

      // Action
      const response = await server.inject({
        method: 'GET',
        url: '/threads/xxxx',
        headers: { Authorization: `Bearer ${responseAuth.data.accessToken}` }
      })

      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(404)
      expect(responseJson.status).toEqual('fail')
      expect(responseJson.message).toEqual('thread not found')
    })

    it('should response 200 and return detail thread', async () => {
      const server = await createServer(container)
      const userPayload = {
        ...loginPayload,
        fullname: 'hendrakho'
      }

      await server.inject({
        method: 'POST',
        url: '/users',
        payload: userPayload
      })

      const authentication = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: loginPayload
      })

      const responseAuth = JSON.parse(authentication.payload)
      const threadPayload = {
        title: 'sebuah thread',
        body: 'lorem ipsum dolorr sit amet'
      }

      const thread = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: threadPayload,
        headers: { Authorization: `Bearer ${responseAuth.data.accessToken}` }
      })

      const threadResponse = JSON.parse(thread.payload)

      const comment = await server.inject({
        method: 'POST',
        url: `/threads/${threadResponse.data.addedThread.id}/comments`,
        payload: {
          content: 'sebuah komentar'
        },
        headers: { Authorization: `Bearer ${responseAuth.data.accessToken}` }
      })

      const commentResponse = JSON.parse(comment.payload)

      // Action
      const replyPayload = {
        content: 'sebuah komentar reply'
      }
      await server.inject({
        method: 'POST',
        url: `/threads/${threadResponse.data.addedThread.id}/comments/${commentResponse.data.addedComment.id}/replies`,
        payload: replyPayload,
        headers: { Authorization: `Bearer ${responseAuth.data.accessToken}` }
      })

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/threads/${threadResponse.data.addedThread.id}`,
        headers: { Authorization: `Bearer ${responseAuth.data.accessToken}` }
      })

      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(200)
      expect(responseJson.status).toEqual('success')
      expect(responseJson.data.thread.id).toEqual(threadResponse.data.addedThread.id)
      expect(responseJson.data.thread.title).toEqual(threadPayload.title)
      expect(responseJson.data.thread.body).toEqual(threadPayload.body)
      expect(responseJson.data.thread.username).toEqual(userPayload.username)
      expect(Array.isArray(responseJson.data.thread.comments)).toBe(true)
      expect(Array.isArray(responseJson.data.thread.comments[0].replies)).toBe(true)
    })
  })

  describe('when GET /', () => {
    it('should return 200 and Dashboard-Welcome', async () => {
      // Arrange
      const server = await createServer({})
      // Action
      const response = await server.inject({
        method: 'GET',
        url: '/'
      })
      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(200)
      expect(responseJson.value).toEqual('Dashboard-Welcome')
    })
  })
})
