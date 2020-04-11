const { merge } = require('graphql-merge-resolvers')

const createUser = require('./createUser')

const merged = merge([createUser])

module.exports = merged
