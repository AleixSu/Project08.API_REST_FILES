const mongoose = require('mongoose')

const editorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: 'editors'
  }
)

const Editor = mongoose.model('editors', editorSchema, 'editors')
module.exports = Editor
