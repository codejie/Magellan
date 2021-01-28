import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client'

// Install the vue plugin
Vue.use(VueApollo)

export var graphqlConnection = null

export function createProvider(options) {
  const { apolloClient, wsClient } = createApolloClient(options)
  apolloClient.wsClient = wsClient
  graphqlConnection = apolloClient

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        // fetchPolicy: 'cache-and-network'
      }
    },
    errorHandler(error) {
      console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    }
  })
  return apolloProvider
}
