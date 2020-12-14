<template>
  <div>
    {{ rundata }}
  <ApolloQuery
    :query=queryRuntime
    :variables=queryRuntimeCondition
  >
    <template v-slot="{ result: { loading, error, data }}">
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">An Error</div>
        <div v-else-if="data">
          {{data.RuntimeData}}
          <RuntimeDataGraph :qlData=data.RuntimeData.data />
           <!-- <BaseInfoTable :data=data.BaseInfo.many :removeMethod=removeBaseInfo /> -->
        </div>
        <div v-else>No Result</div>
    </template>
  </ApolloQuery>
    <ve-line :data="chartData"></ve-line>
    <ve-line :data="chartData"></ve-line>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import VeLine from 'v-charts/lib/line.common'
import RuntimeDataGraph from './RuntimeDataGraph'

const queryRuntimeQL = gql`query ($id: Int!, $start: DateTime, $end: DateTime) {
                            RuntimeData {
                              data (id: $id, start: $start, end: $end) {
                                id
                                updated
                                price
                              }
                            }
                          }`

export default {
  apollo: {
    rundata: {
      query: gql`query ($id: Int!, $start: DateTime, $end: DateTime) {
                            RuntimeData {
                              data (id: $id, start: $start, end: $end) {
                                id
                                updated
                                price
                              }
                            }
                          }`,
      update: data => data.RuntimeData.data,
      variables: {
        id: 19,
        start: '2020-12-10 00:00:00',
        end: '2020-12-11 00:00:00'
      }
    }
  },
  components: {
    've-line': VeLine,
    RuntimeDataGraph
  },
  data: function () {
    return {
      queryRuntime: (gql) => queryRuntimeQL,
      queryRuntimeCondition: {
        id: 19,
        start: '2020-12-10 00:00:00',
        end: '2020-12-11 00:00:00'
      },
      chartData: {
        columns: [
          '日期',
          '访问用户',
          '下单用户',
          '下单率'
        ],
        rows: [
          {
            日期: '1/1',
            访问用户: 1393,
            下单用户: 1093,
            下单率: 0.32
          },
          { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      }
    }
  }
}
</script>
