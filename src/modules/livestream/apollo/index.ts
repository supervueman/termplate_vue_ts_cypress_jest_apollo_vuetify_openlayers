
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'

/** MUTATIONS */
import cameraLocationCreate from './mutations/cameraLocationCreate.gql'
import cameraLocationUpdate from './mutations/cameraLocationUpdate.gql'
import cameraLocationDelete from './mutations/cameraLocationDelete.gql'

/** QUERIES */
import allCameraLocation from './queries/allCameraLocation.gql'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_GRAPHQL_LIVESTREAM,
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

export default {
  apolloClient,
  mutations: {
    cameraLocationCreate,
    cameraLocationUpdate,
    cameraLocationDelete,
  },
  queries: {
    allCameraLocation,
  },
}
