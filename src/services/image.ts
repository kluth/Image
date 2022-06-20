import fs from 'fs'
import sharp from 'sharp'
const types = ['jpg', 'png', 'jpeg', 'gif', 'bmp', 'webp', 'tiff']
export class ImageService {
	resizeImage(
		imageName: string,
		width: number,
		height: number,
		type: string,
	): string {
		if (width < 0) {
			throw new Error('Image width must be greater than 0')
		}
		if (height < 0) {
			throw new Error('Image height must be greater than 0')
		}
		if (types.indexOf(type) === -1) {
			throw new Error('Image type must be a valid image type')
		}
		if (!fs.existsSync(`./images/${imageName}`)) {
			throw new Error('Image path must be a valid image path')
		}

		const imageNameWithoutExtension = imageName.split('.')[0]
		sharp(`${imageName}`)
			?.resize(width, height)
			.toFile(`${imageNameWithoutExtension}-${width}x${height}.${type}`)

		return `${imageNameWithoutExtension}-${width}x${height}.${type}`
	}
}

export default new ImageService()
