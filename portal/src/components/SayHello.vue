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
  </div>
</template>
<script>

export default {
  data () {
    return {
      query: {
        ql: require('../graphql/say-hello-query.gql')
      },
      mutation: {
        ql: require('../graphql/say-hello-mutation.gql')
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
    }
  }
}
</script>
