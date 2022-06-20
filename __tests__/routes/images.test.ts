import request from 'supertest'

import app from '../../src/app'
describe('Images Route', () => {
	beforeEach(() => {
		request(app).delete('/images')
	})

	it('should resize an image', async () => {
		// simulate get request to the /images/resize/:id/:width/:height route
		const res = request(app).get('/images/resize/profile.jpeg/100/100')
		expect((await res).statusCode).toBe(200)
	})

	it('should resize an image with a random width and height', async () => {
		// simulate get request to the /images/resize/:id route
		const res = request(app).get('/images/resize/profile.jpeg/')
		expect((await res).statusCode).toBe(200)
	})

	it('should resize all images with a random width and height', async () => {
		// simulate get request to the /images/resize route
		const res = request(app).get('/images/resize')
		expect((await res).statusCode).toBe(200)
	})

	it('should monochrome an image', async () => {
		// simulate get request to the /images/monochrome/:id route
		const res = request(app).get('/images/monochrome/profile.jpeg')
		expect((await res).statusCode).toBe(200)
	})

	it('should monochrome all images', async () => {
		// simulate get request to the /images/monochrome route
		const res = request(app).get('/images/monochrome')
		expect((await res).statusCode).toBe(200)
	})

	it('should get all images', async () => {
		// simulate get request to the /images route
		const res = request(app).get('/images')
		expect((await res).statusCode).toBe(200)
	})

	it('should get an image', async () => {
		// simulate get request to the /images/view/:id route
		const res = request(app).get('/images/view/profile.jpeg')
		expect((await res).statusCode).toBe(200)
	})

	it('should delete all images expect the example image', async () => {
		// simulate delete request to the /images route
		const res = request(app).delete('/images')
		expect((await res).statusCode).toBe(200)
	})
})
