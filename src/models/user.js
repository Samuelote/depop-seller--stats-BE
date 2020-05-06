const mongoose = require('mongoose')

const Schema = mongoose.Schema

const accountSchema = new Schema({
  type: String,
  subscription: String
}, { _id: false })

const paymentInfoSchema = new Schema({
  type: String
}, { _id: false })

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  account: {
    type: accountSchema,
    required: true
  },
  files: {
    type: [String],
    required: true
  },
  payment: {
    type: paymentInfoSchema,
    required: true
  }
})

module.exports = mongoose.model('User', userSchema)
