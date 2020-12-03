<template>
  <div class="base">
    <div v-if="$apollo.loading">Loading...</div>
    BaseInfo Table
    {{ info.one.id }}
    <div>
      {{ hello }}
    </div>
    <ApolloQuery :query="gql => gql`
        query {
          hello
        }
      `">
      <template v-slot="{ result: { loading, error, data } }">
        <div v-if="loading">Loading...</div>
        <div v-else-if="error"> An Error</div>
        <div v-else-if="data"> {{ data.hello }}</div>
        <div v-else>No Result</div>
      </template>
    </ApolloQuery>
    <ApolloQuery :query="gql => gql`
        query ($id: Int!) {
          BaseInfo {
            oneById (id: $id) {
              id
            }
          }
        }
      `"
      :variables="{ id }"
      >
      <template v-slot="{ result: { loading, error, data } }">
        <div v-if="loading">Loading...</div>
        <div v-else-if="error"> An Error</div>
        <div v-else-if="data"> {{ data.BaseInfo.oneById.id }}</div>
        <div v-else>No Result</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    info: {
      query: gql`query a($id: Int!) {
          BaseInfo {
          one: oneById(id: $id) {
            id
          }
        }
      }`,
      update: data => data.BaseInfo,
      variables: {
        id: 20
      }
    },
    hello () {
      return {
        query: gql`query {
          hello
        }`
      }
    }
  },
  data () {
    return {
      info: {},
      hello: '',
      id: 212
    }
  },
  methods: {}
}
</script>
