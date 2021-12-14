import { VueComponents } from '@/plugins/windowManager'
import { ApolloClient } from '@apollo/client'
import { Module } from 'vuex'
import { RouteConfig } from 'vue-router'

export interface AppModule<S, R, A, W> {
  name: string
  store?: Module<S, R>
  apolloClient?: ApolloClient<A>
  modals?: VueComponents<W>
  routes?: RouteConfig[]
}
