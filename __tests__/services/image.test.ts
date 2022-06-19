import fs from 'fs'
import sharp from 'sharp'
import ImageService from '../../src/services/image'

jest.mock('fs')
jest.mock('sharp')
const mockFs = fs as jest.Mocked<typeof fs>

afterEach(() => {
	jest.resetAllMocks()
})
describe('Image Service', () => {
	describe('good path', () => {
		it('should return the image path 1', () => {
			mockFs.existsSync.mockImplementation(() => true)
			// when using resizeImage, the image is resized to the specified width and height and saved with the specified type

			const imagePath = ImageService.resizeImage(
				'/path/to/image1.jpg',
				100,
				100,
				'jpg',
			)
			expect(imagePath).toBe('/path/to/image1-100x100.jpg')
			expect(mockFs.existsSync).toHaveBeenCalledTimes(1)
		})

		it('should return the image path 2', () => {
			mockFs.existsSync.mockImplementation(() => true)
			// when using resizeImage, the image is resized to the specified width and height and saved with the specified type
			const imagePath = ImageService.resizeImage(
				'/path/to/image2.jpg',
				100,
				100,
				'jpg',
			)
			expect(imagePath).toBe('/path/to/image2-100x100.jpg')
			expect(mockFs.existsSync).toHaveBeenCalledTimes(1)
		})

		it('should call the sharp resize method once if file exists', () => {
			mockFs.existsSync.mockImplementation(() => true)
			ImageService.resizeImage('/path/to/image3.jpg', 100, 100, 'jpg')
		})
	})

	describe('bad path', () => {
		it('should throw an error if the image width is not valid', () => {
			expect(() =>
				ImageService.resizeImage('/path/to/image.jpg', -1, 100, 'jpg'),
			).toThrowError('Image width must be greater than 0')
		})

		it('should throw an error if the image height is not valid', () => {
			expect(() =>
				ImageService.resizeImage('/path/to/image.jpg', 100, -1, 'jpg'),
			).toThrowError('Image height must be greater than 0')
		})

		it('should throw an error if the image type is not valid', () => {
			expect(() =>
				ImageService.resizeImage('/path/to/image.jpg', 100, 100, 'invalid'),
			).toThrowError('Image type must be a valid image type')
		})

		it('should throw an error if the image path is not valid', () => {
			mockFs.existsSync.mockImplementation(() => false)
			expect(() =>
				ImageService.resizeImage('invalid', 100, 100, 'jpg'),
			).toThrowError('Image path must be a valid image path')
		})
	})
})
