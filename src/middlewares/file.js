const cloudinary = require('cloudinary').v2
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const storageEditor = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Project_08:_Editors_folder',
    allowedFormats: ['jpg', 'jpeg', 'gif', 'png', 'webp']
  }
})
const storageVideogame = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Project_08:_Videogames_folder',
    allowedFormats: ['jpg', 'jpeg', 'gif', 'png', 'webp']
  }
})

const uploadToEditors = multer({ storage: storageEditor })
const uploadToVideogames = multer({ storage: storageVideogame })

console.log('Cloudinary middlewares loaded')
module.exports = { uploadToEditors, uploadToVideogames }
