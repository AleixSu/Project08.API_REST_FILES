const {
  getEditors,
  getEditorById,
  createNewEditor,
  updateEditorInfo,
  deleteEditor
} = require('../controllers/editor')

const editorRouter = require('express').Router()

editorRouter.get('/', getEditors)
editorRouter.get('/:id', getEditorById)
editorRouter.post('/', createNewEditor)
editorRouter.patch('/:id', updateEditorInfo)
editorRouter.delete('/:id', deleteEditor)

module.exports = editorRouter
