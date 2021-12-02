import { ApolloClient } from 'apollo-client'

import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { NormalizedCacheObject } from '@apollo/client'
import { apollo as livestream } from '@/modules/livestream'

Vue.use(VueApollo)

type VueApolloOptions<NormalizedCacheObject> = {
  defaultClient: ApolloClient<NormalizedCacheObject>
  clients?: { [key: string]: ApolloClient<NormalizedCacheObject> }
}

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:3020/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const options = {
  defaultClient: apolloClient,
  clients: {
    livestream: livestream.apolloClient,
  },
}

export default new VueApollo(options as unknown as VueApolloOptions<NormalizedCacheObject>)
