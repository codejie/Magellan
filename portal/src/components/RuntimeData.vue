<template>
  <div>
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
            <!-- {{ data.runtime }} -->
          </div>
          <div>
            <button @click="onPreDay">&nbsp;&lt;&nbsp;-</button>
            <el-date-picker
              v-model="todayValue"
              type="date"
              size="small"
              placeholder="select date" />
            <button @click="onPastDay">&nbsp;-&gt;&nbsp;</button>
          </div>
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
import { toDateString, toDateTimeString } from '../utils'

export default {
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
        update: (data) => {
          return {
            info: data.BaseInfo.oneById,
            day: data.DayData.data.length > 0 ? data.DayData.data[0] : undefined,
            runtime: data.RuntimeData.data
          }
        }
      },
      todayValue: toDateString(this.today)
    }
  },
  computed: {
    queryVariables () {
      const ret = this.getQueryVariables(this.id, this.date)
      return ret
    }
  },
  watch: {
    todayValue: function (value, oldValue) {
      console.log(value, oldValue)
      this.date = new Date(value)
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
    onPreDay: function () {
      this.date.setDate(this.date.getDate() - 1)
      this.todayValue = toDateString(this.date)
    },
    onPastDay: function () {
      this.date.setDate(this.date.getDate() + 1)
      this.todayValue = toDateString(this.date)      
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
