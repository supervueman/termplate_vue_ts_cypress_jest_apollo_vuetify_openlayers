import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'

/** MUTATIONS */
import userCreate from './mutations/userCreate.gql'
import userUpdate from './mutations/userUpdate.gql'
import userDelete from './mutations/userDelete.gql'

/** QUERIES */
import allUsers from './queries/allUsers.gql'
import oneUser from './queries/oneUser.gql'

export {
  userCreate,
  userUpdate,
  userDelete,
  allUsers,
  oneUser,
}

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_GRAPHQL_TEST_MODULE,
})

const cache = new InMemoryCache()

export default new ApolloClient({
  link: httpLink,
  cache,
})
