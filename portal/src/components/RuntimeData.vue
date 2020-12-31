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
    ref="dataQuery"
    :query="query.ql"
    :options="query.options"
    :variables="queryVariables"
    :update="query.update"
  >
    <template v-slot="{ result: { loading, error, data }}">
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">An Error</div>
        <div v-else-if="data">
          <!-- {{ data }} -->
          <div>
            <span style="font-size: 36px">{{ data.info.name }}</span>&nbsp;&nbsp;<span style="font-size: 24px">({{ data.info.code }})</span>
            {{ data.info }}
            {{ data.day }}
            {{ data.runtime }}
          </div>
          <div>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="select date" />
          </div>
          <RuntimeDataGraph :qlData=data @ready="onGraphReady" />
        </div>
        <div v-else>No Result</div>
    </template>
  </ApolloQuery>
  </div>
</template>

<script>
// import gql from 'graphql-tag'
import RuntimeDataGraph from './RuntimeDataGraph'
import { toDateString, toDateTimeString } from '../utils'

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
  props: ['id', 'today'],
  data: function () {
    return {
      date: this.today,
      query: {
        ql: require('../graphql/day-runtime-data.gql'),
        options: {
          fetchPolicy: 'no-cache'
        },
        // variables: {
        //   id: 19,
        //   start: '2020-12-14 00:00:00',
        //   end: '2020-12-15 00:00:00',
        //   dstart: '2020-12-14',
        //   dend: '2020-12-15'
        // },
        update: (data) => {
          return {
            info: data.BaseInfo.oneById,
            day: data.DayData.data.length > 0 ? data.DayData.data[0] : undefined,
            runtime: data.RuntimeData.data
          }
        }
      },
      value1: ''
    }
  },
  computed: {
    queryVariables () {
      const ret = this.getQueryVariables(this.id, this.date)
      return ret
    }
  },
  watch: {
    value1: function (value, oldValue) {
      console.log(value, oldValue)
      this.date = value
      // this.$refs.dataQuery.getApolloQuery().setVariables(this.query.variables)
      this.$refs.dataQuery.getApolloQuery().refetch()
    }
  },
  methods: {
    getQueryVariables: function (id, today) {
      today.setHours(0)
      today.setMinutes(0)
      today.setSeconds(0)
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      return {
        id: id,
        start: toDateTimeString(today),
        end: toDateTimeString(tomorrow),
        dstart: toDateString(today),
        dend: toDateString(tomorrow)
      }
    },
    onGraphReady: function () {
      console.log('ready')
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
