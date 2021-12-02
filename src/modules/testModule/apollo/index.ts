import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'

/** MUTATIONS */
import userCreate from './mutations/userCreate.gql'
import cameraLocationUpdate from './mutations/cameraLocationUpdate.gql'
import cameraLocationDelete from './mutations/cameraLocationDelete.gql'

/** QUERIES */
import allUsers from './queries/allUsers.gql'

export {
  userCreate,
  cameraLocationUpdate,
  cameraLocationDelete,
  allUsers,
}

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_GRAPHQL_LIVESTREAM,
})

const cache = new InMemoryCache()

export default new ApolloClient({
  link: httpLink,
  cache,
})
