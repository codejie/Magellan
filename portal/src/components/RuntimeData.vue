<template>
  <div>
  <!-- <ApolloQuery
    :query=queryRuntime
    :options=queryOptions
    :variables=queryRuntimeCondition
  >
    <template v-slot="{ result: { loading, error, data }}">
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">An Error</div>
        <div v-else-if="data">
          <RuntimeDataGraph :qlData=data.RuntimeData.data />
        </div>
        <div v-else>No Result</div>
    </template>
  </ApolloQuery> -->
  <ApolloQuery
    class="query"
    :query="query.ql"
    :options="query.options"
    :variables="query.variables"
    :update="query.update"
  >
    <template v-slot="{ result: { loading, error, data }}">
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">An Error</div>
        <div v-else-if="data">
          <!-- {{ data }} -->
          <p>{{ data.info }}</p>
          <p>{{ data.day }}</p>
          <!-- <p>{{ data.runtime }}</p> -->
          <RuntimeDataGraph :qlData=data />
        </div>
        <div v-else>No Result</div>
    </template>
  </ApolloQuery>
  </div>
</template>

<script>
// import gql from 'graphql-tag'
import RuntimeDataGraph from './RuntimeDataGraph'

// const queryRuntimeQL = gql`query ($id: Int!, $start: DateTime, $end: DateTime) {
//                             RuntimeData {
//                               data (id: $id, start: $start, end: $end) {
//                                 id
//                                 updated
//                                 price
//                               }
//                             }
//                           }`

export default {
  // apollo: {
  //   rundata: {
  //     query: gql`query ($id: Int!, $start: DateTime, $end: DateTime) {
  //                           RuntimeData {
  //                             data (id: $id, start: $start, end: $end) {
  //                               id
  //                               updated
  //                               price
  //                             }
  //                           }
  //                         }`,
  //     update: data => data.RuntimeData.data,
  //     variables: {
  //       id: 19,
  //       start: '2020-12-17 00:00:00',
  //       end: '2020-12-18 00:00:00'
  //     },
  //     result ({ data, loading, networkStatus }) {
  //       console.log('We got some result!')
  //       console.log('data = ' + data.RuntimeData.data[10].updated)
  //     },
  //     fetchPolicy: 'no-cache'
  //   }
  // },
  components: {
    RuntimeDataGraph
    // LineTest
  },
  data: function () {
    return {
      query: {
        ql: require('../graphql/day-runtime-data.gql'),
        options: {
          fetchPolicy: 'no-cache'
        },
        variables: {
          id: 19,
          start: '2020-12-14 00:00:00',
          end: '2020-12-15 00:00:00',
          dstart: '2020-12-14',
          dend: '2020-12-15'
        },
        update: (data) => {
          return {
            info: data.BaseInfo.oneById,
            day: data.DayData.data.length > 0 ? data.DayData.data[0] : undefined,
            runtime: data.RuntimeData.data
          }
        }
      }//,
      // queryRuntime: (gql) => queryRuntimeQL,
      // queryOptions: {
      //   fetchPolicy: 'no-cache'
      // },
      // queryRuntimeCondition: {
      //   id: 19,
      //   start: '2020-12-17 00:00:00',
      //   end: '2020-12-18 00:00:00'
      // }
    }
  }
}
</script>

<style scoped>
.query {
  margin: auto;
  width: 75%;
  border: 1px solid gray;
  padding: 40px;
}
</style>
