const { merge } = require('graphql-merge-resolvers')

const userResolver = require('./user')
const loginResolver = require('./auth')
const filesResolver = require('./files')

const merged = merge([userResolver, loginResolver, filesResolver])

module.exports = merged
