const deleteFile = require('../../utils/functions/deleteFile')
const Videogame = require('../models/videogame')

const getVideogames = async (req, res, next) => {
  try {
    const videogames = await Videogame.find().populate('editedBy')
    if (videogames.length === 0) {
      return res.status(404).json("There's no videogames to be found")
    } else {
      return res.status(200).json(videogames)
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

const getVideogamesById = async (req, res, next) => {
  try {
    const { id } = req.params
    const videogame = await Videogame.findById(id).populate('editedBy')
    if (!videogame) {
      return res.status(404).json('videogame not found')
    } else {
      return res.status(200).json(videogame)
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}
const getVideogamesByEditor = async (req, res, next) => {
  try {
    const { editedBy } = req.params
    console.log(editedBy)

    const videogameByEditor = await Videogame.find({ editedBy }).populate(
      'editedBy'
    )

    if (videogameByEditor.length === 0) {
      return res.status(404).json('videogame not found')
    } else {
      return res.status(200).json(videogameByEditor)
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}
const getVideogamesByPlatform = async (req, res, next) => {
  try {
    const { platforms } = req.params

    const videogamesByPlatform = await Videogame.find({ platforms }).populate(
      'editedBy'
    )
    if (videogamesByPlatform.length === 0) {
      return res.status(404).json("There's no videogames for this platform")
    } else {
      return res.status(200).json(videogamesByPlatform)
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

const postNewVideogame = async (req, res, next) => {
  try {
    const newVideogame = new Videogame(req.body)
    if (req.file) {
      newVideogame.coverImage = req.file.path
    }
    const videogameSaved = await newVideogame.save()
    return res.status(201).json(videogameSaved)
  } catch (error) {
    return res.status(400).json('error')
  }
}

const updateVideogameInfo = async (req, res, next) => {
  try {
    const { id } = req.params
    const oldVideogame = await Videogame.findById(id)
    if (!oldVideogame) return res.status(404).json('Videogame not found')

    const updatedData = { ...req.body }

    if (req.file) {
      if (oldVideogame.coverImage) deleteFile(oldVideogame.coverImage)
      updatedData.coverImage = req.file.path
    }

    const videogameUpdated = await Videogame.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true
      }
    )
    return res.status(200).json(videogameUpdated)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const deleteVideogame = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedVideogame = await Videogame.findByIdAndDelete(id)
    if (!deletedVideogame) {
      return res.status(404).json('Videogamenot found')
    } else {
      deleteFile(deletedVideogame.coverImage)
      return res
        .status(200)
        .json(`The videogame ${deletedVideogame.title} has been deleted`)
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = {
  getVideogames,
  getVideogamesByEditor,
  getVideogamesById,
  getVideogamesByPlatform,
  postNewVideogame,
  deleteVideogame,
  updateVideogameInfo
}
