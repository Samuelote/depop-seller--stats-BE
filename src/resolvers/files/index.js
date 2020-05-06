const path = require('path')
const User = require('../../models/user')
const { createWriteStream, existsSync, mkdirSync, readFileSync, readdir, unlinkSync } = require('fs')

// checks if directory exists and creates one if not
existsSync(path.join(__dirname, './uploaded_files')) || mkdirSync(path.join(__dirname, './uploaded_files'))

module.exports = {
  Query: {
    getFiles: async (_, __, { req }) => {
      if (req.payload) {
        const filesToSend = []
        await getFilesToSend(
          req.payload,
          (file) => filesToSend.push(file)
        )
        return filesToSend
      } else {
        throw new Error('not authenticated')
      }
    }
  },
  Mutation: {
    uploadFile: async (_, { file }, { req }) => {
      if (req.payload) {
        // uploads file to filesystem
        const { createReadStream, filename } = await file
        const personalizedFilename = `${req.payload.userId}_${filename}`
        try {
          await new Promise(resolve =>
            createReadStream()
              .pipe(createWriteStream(path.join(__dirname, './uploaded_files', personalizedFilename)))
              .on('close', resolve)
          )

          return true
        } catch (err) {
          console.log(err)
          throw new Error('There was en error uploading a file.')
        }
      } else {
        throw new Error('not authenticated')
      }
    },
    updateFile: async (_, { file }, { req }) => {
      if (req.payload) {
        console.log('edit here')
      } else {
        throw new Error('not authenticated')
      }
    },
    deleteFile: async (_, { file }, { req }) => {
      if (req.payload) {
        if (path.join(__dirname, './uploaded_files', file)) {
          if (!file.includes(req.payload.userId)) throw new Error("Can't delete file that isn't yours")
          await unlinkSync(path.join(__dirname, './uploaded_files', file))

          return true
        } else {
          throw new Error('No File Found. Please refresh your page.')
        }
      } else {
        throw new Error('not authenticated')
      }
    }
  }
}

const getFilesToSend = ({ userId }, addFileToList) => {
  return new Promise((resolve, reject) => {
    readdir(path.join(__dirname, './uploaded_files'), (err, files) => {
      if (err) {
        reject(err)
        throw err
      }
      if (!files.length) resolve()
      files.forEach((file, i) => {
        if (file.includes(userId)) {
          addFileToList({
            filename: file,
            content: readFileSync(
              path.join(
                __dirname,
                `./uploaded_files/${file}`),
              'utf8',
              (err, data) => {
                if (err) throw (err)
              }
            )
          })
        }
        if (i === files.length - 1 || !files.length) resolve()
      })
    })
  })
}
