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

//!INTENTO DE REUTILIZACIÓN

/* const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {     // Al usar una función en 'params' tenemos acceso completo a la petición HTTP (req) y al objeto 'file', que contiene los metadatos del archivo subido.
    let folder = 'Project08/General'  // Carpeta general que guardará dos carpetas más

    if (file.fieldname === 'avatar') folder = 'Project08/Editors'  // la carpeta para editores
    if (file.fieldname === 'coverImage') folder = 'Project08/Videogames' //carpeta para videojuegos

    return {
      folder,
      allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
    }
  }
}) 
  const upload= multer({ storage: storage })
  module.exports = upload

*/
