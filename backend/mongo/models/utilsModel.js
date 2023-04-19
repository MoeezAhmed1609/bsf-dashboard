const mongoose = require('mongoose')

const utilsSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Full Name is required!'],
    minLength: [3, 'Name must have at least 3 characters!'],
  },
  image: {
    public_id: String,
    url: String,
  },
  stock: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('Utils', utilsSchema)
