const { merge } = require('graphql-merge-resolvers')

const userResolver = require('./user')
const loginResolver = require('./login')

const merged = merge([userResolver, loginResolver])

module.exports = merged
