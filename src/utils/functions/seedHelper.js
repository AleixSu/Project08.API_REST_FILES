const editorsSeed = require('../../data/editorsSeed')
const videoGames = require('../../data/videoGames')

const seedHelper = (insertedEditors) => {
  const editorsData = []

  for (const editor of editorsSeed) {
    editorsData.push(editor.name)
  }
  const editorsId = {}
  for (const editor of insertedEditors) {
    if (editorsData.includes(editor.name)) {
      editorsId[editor.name] = editor._id
    }
  }
  const result = editorsId

  const videoGameSeed = []

  for (const videogame of videoGames) {
    videogame.editedBy = videogame.editedBy.map((p) => {
      return result[p] || p
    })
    videoGameSeed.push(videogame)
  }
  return videoGameSeed
}

module.exports = seedHelper
