const cloudinary = require('cloudinary').v2

const deleteFile = (url) => {
  const urlToArray = url.split('/')
  const fileName = urlToArray.at(-1).split('.')[0]
  let public_id = `${urlToArray.at(-2)}/${fileName}`

  cloudinary.uploader.destroy(public_id, () => {
    console.log('Erased')
  })
}
module.exports = deleteFile
