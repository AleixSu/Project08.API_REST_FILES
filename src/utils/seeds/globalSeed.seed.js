require('dotenv').config()
const cloudinary = require('cloudinary').v2

const mongoose = require('mongoose')
const seedHelper = require('../functions/seedHelper')
const { editorsArray, videogameArray } = require('../../data/globalData')
const connectCloudinary = require('../../config/cloudinary')

const launchSeed = async (array1, array2) => {
  try {
    console.log('Connection in process...')
    await mongoose.connect(process.env.DB_URL)
    console.log('Database connection established')

    await array1.model.deleteMany({})
    console.log('Old editors collection removed from DB')

    connectCloudinary()
    for (const element of array1.array) {
      const result = await cloudinary.uploader.upload(element.avatar, {
        folder: 'Project_08:_Editors_folder'
      })
      element.avatar = result.secure_url
    }

    const insertedEditors = await array1.model.insertMany(array1.array)
    console.log(`${array1.name} succesfully seeded`)

    await array2.model.deleteMany()
    console.log('Old videogames collection removed from DB')

    const videogamesToInsert = seedHelper(insertedEditors)

    for (const element of videogamesToInsert) {
      const result = await cloudinary.uploader.upload(element.coverImage, {
        folder: 'Project_08:_Videogames_folder'
      })
      element.coverImage = result.secure_url
    }
    await array2.model.insertMany(videogamesToInsert)
    console.log(`${array2.name} succesfully seeded`)
  } catch (error) {
    console.log('Failed to connect to Database:' + error)
  } finally {
    await mongoose.disconnect()
    console.log('Database connection closed')
  }
}

launchSeed(editorsArray, videogameArray)
