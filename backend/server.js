const app = require('./app')
const dotenv = require('dotenv')
const cloudinary = require('cloudinary')
const connectMongo = require('./mongo/mongodb')

// Configuration
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({ path: 'backend/config/.env' })
}

// Connect MongoDB
connectMongo()

// Clodinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})
