const { uploadToVideogames } = require('../../middlewares/file')
const {
  getVideogames,
  getVideogamesByEditor,
  getVideogamesByPlatform,
  getVideogamesById,
  postNewVideogame,
  updateVideogameInfo,
  deleteVideogame
} = require('../controllers/videogame')

const videogameRouter = require('express').Router()

videogameRouter.get('/', getVideogames)
videogameRouter.get('/editor/:editedBy', getVideogamesByEditor)
videogameRouter.get('/platform/:platforms', getVideogamesByPlatform)
videogameRouter.get('/:id', getVideogamesById)
videogameRouter.post(
  '/',
  uploadToVideogames.single('coverImage'),
  postNewVideogame
)
videogameRouter.patch(
  '/:id',
  uploadToVideogames.single('coverImage'),
  updateVideogameInfo
)
videogameRouter.delete('/:id', deleteVideogame)

module.exports = videogameRouter
