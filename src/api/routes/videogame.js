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
videogameRouter.get('/editor/:editor', getVideogamesByEditor)
videogameRouter.get('/platform/:platform', getVideogamesByPlatform)
videogameRouter.get('/:id', getVideogamesById)
videogameRouter.post('/', postNewVideogame)
videogameRouter.patch('/:id', updateVideogameInfo)
videogameRouter.delete('/:id', deleteVideogame)

module.exports = videogameRouter
