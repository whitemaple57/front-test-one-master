<template>
  <div style="margin: 15px 0">
    <el-table min-height="200" max-height="500" v-loading="loading"  :data="tableList">
      <el-table-column label="排名" align="center" type="index" width="100" />
      <el-table-column label="名称" prop="companyName" />
      <el-table-column label="进厂量" align="center" prop="inCount" />
      <el-table-column label="出厂量" align="center" prop="outCount" />
      <el-table-column label="总量" align="center" prop="sumCount" />
      <el-table-column label="占比" align="center" prop="scale" >
        <template scope="{ row }" >
          <div>
            {{ row.scale | filterFixed }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCompanyCount } from "@/api/statistics/data"
export default {
  data() {
    return {
      loading: false,
      tableList: [],
    };
  },
  created() {
    this.getCompanyCount()
  },
  filters: {
    filterFixed(val) {
      return val.toFixed(2) + '%'
    }
  },
  methods: {
    getCompanyCount() {
      this.loading = true
      getCompanyCount().then(res => {
        this.loading = false
        this.tableList = res.data
      })
    }
  }
};
</script>

<style>
</style>