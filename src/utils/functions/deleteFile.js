const cloudinary = require('cloudinary').v2

const deleteFile = async (url) => {
  try {
    const urlToArray = url.split('/')
    const fileName = urlToArray.at(-1).split('.')[0]
    let public_id = `${urlToArray.at(-2)}/${fileName}`

    await cloudinary.uploader.destroy(public_id)
    console.log('Erased')
  } catch (error) {
    console.log('Error deleting file from Cloudinary: ' + error)
    throw error
  }
}
module.exports = deleteFile
