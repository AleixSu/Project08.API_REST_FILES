require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./src/config/db')
const connectCloudinary = require('./src/config/cloudinary')
const videogameRouter = require('./src/api/routes/videogame')
const editorRouter = require('./src/api/routes/editor')

const app = express()
app.use(express.json())
app.use(cors())
connectCloudinary()
connectDB()

app.use('/api/v1/videogamesreviews', videogameRouter)
app.use('/api/v1/editors', editorRouter)

app.use((req, res, next) => {
  return res.status(404).json('Route not found')
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
