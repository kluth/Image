import {
    Request,
    Response
} from 'express'
import fs, { readdirSync, writeFileSync } from 'fs'
import sharp from 'sharp'

// method to controll if image already exists, starts with thumb_ or monochrome_
const imageExists = (image: string, prefix: string, width?: number, height?: number): boolean => {
    const filePath = width ? `${prefix}_${width}x${height}${image}` : `${prefix}_${image}`
    return fs.existsSync(filePath)
}

const ImagesController = {
    getAllImages: (req: Request, res: Response) => {
        // get all images inside the images folder using fs.readdirSync
        // and send the result to the client
        const errors: Array<string> = []
        fs.readdir(`./images`, (err, files) => {
            if (err) {
                errors.push(err.message)
            }
            errors.length ? res.status(500).send(errors) : res.send(files)
        })
    },

    getImage: (req: Request, res: Response) => {
        // get the image with the id in the url
        // and send the result to the client
        let error: string = ''
        fs.readFile(`./images/${req.params.id}`, (err, data) => {
            if (err) {
                error = err.message
            }
            error !== '' ? res.status(500).send(error) : res.send(data)
        })
    },

    deleteAllImages: (req: Request, res: Response) => {
        // delete all images inside the images folder using fs.readdirSync
        // and send the result to the client
        const errors: Array<string> = []
        fs.readdir(`./images`, (err, files) => {
            if (err) {
                errors.push(err.message)
            }
            files.forEach(file => {
                if (file !== 'profile.jpeg')
                    fs.unlink(`./images/${file}`, (err) => {
                        if (err) {
                            errors.push(err.message)
                        }
                    })
            }
            )
            errors.length ? res.status(500).send(errors) : res.send('Images deleted')
        })
    },

    resize: (req: Request, res: Response) => {
        const { id, width, height } = req.params
        imageExists(id, 'thumb', +width, +height) ? res.sendFile(`./images/thumb_${width}x${height}${id}`) :
            sharp(`./images/${id}`)
                .resize(Math.abs(+width), Math.abs(+height))
                .toFile(`./images/thumb_${width}x${height}${id}`, (err, info) => {
                    if (err) {
                        res.status(500).send(err.message)
                    }
                })
        res.sendStatus(200).send('Image resized')
    },

    randomResizeAll: (req: Request, res: Response) => {
        // resize all images inside the images folder using sharp
        // and send the result to the client
        const errors: Array<string> = []
        fs.readdir(`./images`, (err, files) => {
            if (err) {
                errors.push(err.message)
            }
            files.forEach(file => {
                const width = Math.abs(Math.floor(Math.random() * 1000 + 1))
                const height = Math.abs(Math.floor(Math.random() * 1000 + 1))
                imageExists(file, 'thumb', width, height) ? res.sendFile(`./images/thumb_${width}x${height}${file}`) :
                    sharp(`./images/${file}`)
                        .resize(+width, +height)
                        .toFile(`./images/thumb_${width}x${height}${file}`, (err, info) => {
                            if (err) {
                                errors.push(err.message)
                            }

                        })
            })
            errors.length > 0 ? res.status(500).send(errors) : res.status(200).send('ok')
        })
    },

    randomResize: (req: Request, res: Response) => {
        // resize image with id to a random width and height using sharp
        // and send the result to the client
        const id = req.params.id
        const width = Math.abs(Math.floor(Math.random() * 1000 + 1))
        const height = Math.abs(Math.floor(Math.random() * 1000 + 1))
        const errors: Array<string> = []
        imageExists(id, 'thumb', width, height) ? res.sendFile(`./images/thumb_${width}x${height}${id}`) :
            sharp(`./images/${id}`)
                .resize(+width, +height)
                .toFile(`./images/thumb_${width}x${height}${id}`, (err, info) => {
                    if (err) {
                        errors.push(err.message)
                    }
                    errors.length ? res.status(500).send(errors) : res.status(200).send('ok')
                })
    },

    monochromeAll: (req: Request, res: Response) => {
        // convert all images to monochrome using sharp
        // and send the result to the client
        const errors: Array<string> = []
        fs.readdir(`./images`, (err, files) => {
            if (err) {
                errors.push(err.message)
            }
            files.forEach(file => {
                imageExists(file, 'monochrome') ? res.sendFile(`./images/monochrome_${file}`) :
                    sharp(`./images/${file}`)
                        .grayscale()
                        .toFile(`./images/mono_${file}`, (err, info) => {
                            if (err) {
                                errors.push(err.message)
                            }
                        })
            })
            errors.length > 0 ? res.status(500).send(errors) : res.status(200).send('ok')
        })
    },

    monochrome: (req: Request, res: Response) => {
        const { id } = req.params
        // monochrome image with id using sharp
        // and send the result to the client
        imageExists(id, 'monochrome') ? res.sendFile(`./images/monochrome_${id}`) :
            sharp(`./images/${id}`)
                .grayscale()
                .toFile(`./images/mono_${id}`, (err, info) => {
                    if (err) {
                        res.status(500).send(err.message)
                    }
                    res.status(200).send('ok')
                })
    }
}

export default ImagesController