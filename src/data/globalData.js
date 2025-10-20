const Editor = require('../api/models/editor')
const Videogame = require('../api/models/videogame')
const editorsSeed = require('./editorsSeed')
const videogames = require('./videoGames')

const editorsArray = {
  name: 'Editors data',
  array: editorsSeed,
  model: Editor
}
const videogameArray = {
  name: 'Videogames data',
  array: videogames,
  model: Videogame
}

module.exports = { editorsArray, videogameArray }
