<template>
  <div>
    <ApolloQuery
      :query="query.ql"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>
        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>
        <!-- Result -->
        <div v-else-if="data" class="result apollo">{{ data }}</div>
        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
    <p> Mutation </p>
    <ApolloMutation
      :mutation="mutation.ql"
      :update="mutationUpdated"
      @done="onMutationDone"
    >
      <template v-slot="{ mutate, loading, error }">
        <button :disabled="loading" @click="mutate({variables})">Click</button>
        <p v-if="error">An Error: {{ error }}</p>
      </template>
    </ApolloMutation>
    <!-- <button @click="onsub">Sub</button> -->
    <!-- <ApolloSubscribeToMore
      :document="subscription.ql"
      :updateQuery="onSubscriptionUpdated"
    >
    </ApolloSubscribeToMore> -->
  </div>
</template>
<script>

export default {
  apollo: {
    $subscribe: {
      hello: {
        query: require('../graphql/say-hello-subscription.gql'),
        variables: {
          msg: 'msg'
        },
        result: (data, key) => {
          console.log('sub = ' + key)
          console.log('sub = ' + data)
        }
      }
    }
  },
  data () {
    return {
      query: {
        ql: require('../graphql/say-hello-query.gql')
      },
      mutation: {
        ql: require('../graphql/say-hello-mutation.gql')
      },
      subscription: {
        ql: require('../graphql/say-hello-subscription.gql')
      },
      variables: {
        msg: 'aaaaa'
      }
    }
  },
  methods: {
    mutationUpdated (store, { data }) {
      console.log('updated = ' + JSON.stringify(data))
    },
    onMutationDone: (data) => {
      console.log('done = ' + JSON.stringify(data))
    },
    onSubscriptionUpdated: (data) => {
      console.log('sub = ' + JSON.stringify(data))
    }
  }
}
</script>
