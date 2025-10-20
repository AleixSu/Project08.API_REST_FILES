require('dotenv').config()

const mongoose = require('mongoose')
const seedHelper = require('../functions/seedHelper')
const { editorsArray, videogameArray } = require('../../data/globalData')

const launchSeed = async (array1, array2) => {
  try {
    console.log('Connection in process...')
    await mongoose.connect(process.env.DB_URL)
    console.log('Database connection established')

    await array1.model.deleteMany({})
    console.log('Old editors collection removed from DB')
    const insertedEditors = await array1.model.insertMany(array1.array)
    console.log(`${array1.name} succesfully seeded`)

    await array2.model.deleteMany()
    console.log('Old videogames collection removed from DB')
    await array2.model.insertMany(seedHelper(insertedEditors))
    console.log(`${array2.name} succesfully seeded`)
  } catch (error) {
    console.log('Failed to connect to Database:' + error)
  } finally {
    await mongoose.disconnect()
    console.log('Database connection closed')
  }
}

launchSeed(editorsArray, videogameArray)
