const deleteFile = require('../../utils/functions/deleteFile')
const errorHandler = require('../../utils/functions/errorHandler')
const Editor = require('../models/editor')

const getEditors = async (req, res, next) => {
  try {
    const editors = await Editor.find()
    if (editors.length === 0) {
      return res.status(404).json("There's no editors to be found")
    } else {
      return res.status(200).json(editors)
    }
  } catch (error) {
    console.log(error)
    return errorHandler(res, error, 500, 'get the data')
  }
}

const getEditorById = async (req, res, next) => {
  try {
    const { id } = req.params
    const editor = await Editor.findById(id)
    if (!editor) {
      return res.status(404).json('Editor not found')
    } else {
      return res.status(200).json(editor)
    }
  } catch (error) {
    console.log(error)
    return errorHandler(res, error, 500, 'get editor by id')
  }
}

const createNewEditor = async (req, res, next) => {
  try {
    const newEditor = new Editor(req.body)
    if (req.file) {
      newEditor.avatar = req.file.path
    }
    const editorSaved = await newEditor.save()
    return res.status(201).json(editorSaved)
  } catch (error) {
    console.log(error)
    return errorHandler(res, error, 500, 'create a new editor')
  }
}

const updateEditorInfo = async (req, res, next) => {
  try {
    const { id } = req.params
    const oldEditor = await Editor.findById(id)
    if (!oldEditor) return res.status(404).json('Editor not found')

    if (req.file && oldEditor.avatar) await deleteFile(oldEditor.avatar)

    const updatedData = { ...req.body }
    if (req.file) updatedData.avatar = req.file.path

    const editorUpdated = await Editor.findByIdAndUpdate(id, updatedData, {
      new: true
    })
    return res.status(200).json(editorUpdated)
  } catch (error) {
    console.log(error)
    return errorHandler(res, error, 500, 'update the editor information')
  }
}

const deleteEditor = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedEditor = await Editor.findByIdAndDelete(id)
    if (!deletedEditor) {
      return res.status(404).json('Editor not found')
    } else {
      await deleteFile(deletedEditor.avatar)
      return res
        .status(200)
        .json(`The editor ${deletedEditor.name} has been deleted`)
    }
  } catch (error) {
    console.log(error)
    return errorHandler(res, error, 500, 'delete the editor')
  }
}

module.exports = {
  getEditorById,
  getEditors,
  createNewEditor,
  updateEditorInfo,
  deleteEditor
}
