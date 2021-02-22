<template>
  <div class="frame">
    <div style="display:flex; justify-content:flex-end; width:100%; padding:0;">
      <el-button type="primary" plain @click="onAdd">添加持股记录</el-button>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 90%"
      >
        <el-table-column
          prop="id"
          label="编号"
          width="60"
        />
        <el-table-column
          prop="name"
          label="名称"
          width="180"
        />
        <el-table-column
          prop="total"
          label="持仓"
          width="120"
        />
        <el-table-column
          prop="price"
          label="成本"
          width="180"
        />
        <el-table-column
          prop="fund"
          label="资金"
          width="180"
        />
        <el-table-column
          prop="value"
          label="价值"
          width="180"
        />
        <el-table-column
          prop="updated"
          label="日期"
        />
      </el-table>
    </div>
    <el-dialog
      title="添加持股记录"
      width="20%"
      :visible.sync="showAddDialog"
      :destroy-on-close="true"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <el-form :model="form">
        <el-form-item label="股票名称">
          <el-select v-model="form.stockId">
            <el-option
              v-for="item in stocks"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="form.total" />
        </el-form-item>
        <el-form-item label="成本">
          <el-input v-model="form.price" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="showAddDialog=false">取消</el-button>
        <el-button @click="onDialogOK">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
import { updateStockData } from '@/graphql/person'
export default {
  name: 'PersonStockData',
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    stockInfos: {
      type: Array,
      default: () => []
    },
    parent: {
      type: Object,
      default: () => undefined
    }
  },
  data() {
    return {
      showAddDialog: false,
      // stocks: [], // this.makeStocks(),
      form: {
        total: 0,
        price: 0,
        stockId: undefined
      }
    }
  },
  computed: {
    stocks() {
      const ret = []
      this.stockInfos.forEach(item => {
        ret.push({
          id: item.id,
          name: item.name
        })
      })
      return ret
    }
  },
  methods: {
    onAdd() {
      this.showAddDialog = true
    },
    onDialogOK() {
      console.log(this.form)
      if (this.form.stockId && this.form.total && this.form.price) {
        this.updateStockData(0, this.form)
          .then(ret => {
            this.showAddDialog = false
            this.parent.refresh()
          })
      } else {
        MessageBox('缺少必要数据')
      }
    },
    updateStockData(action, form) {
      const data = {
        action: parseInt(action),
        stockId: parseInt(form.stockId),
        total: parseInt(form.total),
        price: parseFloat(form.price)
      }
      return updateStockData(data)
    }
  }
}
</script>

<style scoped>
.frame {
  width: 90%;
  height: 100%;
}
.table {
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin-top: 4px;
  padding-left: 4px;
}
</style>
