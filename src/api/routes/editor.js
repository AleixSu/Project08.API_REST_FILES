const { uploadToEditors } = require('../../middlewares/file')
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
editorRouter.post('/', uploadToEditors.single('avatar'), createNewEditor)
editorRouter.patch('/:id', uploadToEditors.single('avatar'), updateEditorInfo)
editorRouter.delete('/:id', deleteEditor)

module.exports = editorRouter
