const mongoose = require('mongoose')

const videogameSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    platforms: [
      { type: String, enum: ['PC', 'Xbox', 'PS5', 'Switch'], required: true }
    ],
    review: { type: String, required: true, trim: true },
    rating: { type: Number, min: 0, max: 10, required: true },
    coverImage: { type: String, required: true, trim: true },
    editedBy: [{ type: mongoose.Types.ObjectId, ref: 'editors' }]
  },
  {
    timestamps: true,
    collection: 'videogames'
  }
)

const Videogame = mongoose.model('videogames', videogameSchema, 'videogames')
module.exports = Videogame
