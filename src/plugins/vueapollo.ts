import { ApolloClient } from 'apollo-client'

import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { NormalizedCacheObject } from '@apollo/client'

/** APOLLO CLIENTS */
import { apolloClient as playground } from '@/modules/playground/index.module'

Vue.use(VueApollo)

type VueApolloOptions<NormalizedCacheObject> = {
  defaultClient: ApolloClient<NormalizedCacheObject>
  clients?: { [key: string]: ApolloClient<NormalizedCacheObject> }
}

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_GRAPHQL_DEFAULT_URL,
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const options = {
  defaultClient: apolloClient,
  clients: {
    playground,
  },
}

export default new VueApollo(options as unknown as VueApolloOptions<NormalizedCacheObject>)
