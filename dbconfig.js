require('dotenv').config()
const mongoose = require('mongoose')

const url =
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-2rero.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`

mongoose.connect(
  url
  , { useNewUrlParser: true }
)
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}`))
