import express from 'express'
import ImagesController from '../controllers/Images'

const router = express.Router()

router.delete('/', ImagesController.deleteAllImages)

router.get('/', ImagesController.getAllImages)

router.get('/view/:id', ImagesController.getImage)

router.get('/resize', ImagesController.randomResizeAll)

router.get('/resize/:id', ImagesController.randomResize)

router.get('/resize/:id/:width/:height', ImagesController.resize)

router.get('/monochrome', ImagesController.monochromeAll)

router.get('/monochrome/:id', ImagesController.monochrome)

export default router
