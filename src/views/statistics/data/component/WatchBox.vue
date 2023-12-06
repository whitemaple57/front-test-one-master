<template>
  <div>
    <div
      style="display: flex; justify-content: space-between; margin: 15px 0"
    >
      <el-radio-group v-model="queryParams.entrance" size="small" @change="handleChangeType">
        <el-radio-button label="">全部</el-radio-button>
        <el-radio-button :label="name" v-for="name in nameList"> {{ name }}</el-radio-button>

      </el-radio-group>
      <div>
        <el-radio-group v-model="queryParams.timeRange" size="small" @change="handleChangeTimeType">
          <el-radio-button label="DAY">今天</el-radio-button>
          <el-radio-button label="RECENT">近三天</el-radio-button>
          <el-radio-button label="RECENT_WEEK">近一周</el-radio-button>
          <el-radio-button label="SELF_TIME">自定义</el-radio-button>
        </el-radio-group>
        <el-date-picker
          v-model="queryParams.time"
          type="daterange"
          range-separator="至"
          style="margin-left: 15px"
          size="small"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd "
          @change="handleChangeTime"
        >
        </el-date-picker>
      </div>
    </div>
    <line-chart :chartData="chartData"></line-chart>
  </div>
</template>

<script>
import LineChart from './LineChart.vue'
import { getEntranceCount, getEntranceCountName, getEntranceName } from '../../../../api/statistics/data'

export default {
  data() {
    return {
      radio1: 'all',
      nameList: [],
      chartData: {
        xAxis: {
          data: [],
          boundaryGap: ['20%', '20%'],
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 20,
          right: 0,
          bottom: 20,
          top: 60,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['出厂数量', '入厂数量'],
          left: 0
        },
        series: [
          {
            name: '出厂数量',
            type: 'bar',
            barWidth: 12,
            color: '#3b9cfd',
            // 实现数字展示在柱状图
            label: {
              show: true,
              position: 'top',
              fontSize: 12,
              color: '#F5F5F5',
              offset: [0, -10],
              formatter: '{c}' //添加单位
            },
            data: []
          },
          {
            name: '入厂数量',
            type: 'bar',
            barWidth: 12,
            color: '#ffa306',
            // 实现数字展示在柱状图
            label: {
              show: true,
              position: 'top',
              fontSize: 12,
              color: '#F5F5F5',
              offset: [0, -10],
              formatter: '{c}' //添加单位
            },
            data: []
          }
        ]
      },
      queryParams: {
        entrance: '',
        startTime: '',
        endTime: '',
        timeRange: 'DAY'

      }
    }
  },
  created() {
    this.getNameList()
    this.getData()

  },
  methods: {
    handleChangeTimeType(value) {
      if (value == 'SELF_TIME') {
        return
      }
      this.getData()
    },

    handleChangeTime(value) {
      this.queryParams.startTime = value[0] + '00:00:00'
      this.queryParams.endTime = value[1] + '00:00:00'
      if (this.queryParams.timeRange == 'SELF_TIME') {
        this.getData()
      }
    },
    handleChangeType() {
      this.getData()
    },
    getNameList() {
      getEntranceName().then(res => {
        if (res.code == '200') {
          this.nameList = res.data
        }
      })
    },

    getData() {
      if (this.queryParams.entrance) {
        getEntranceCount(this.queryParams).then(res => {
          if (res.code == '200') {
            this.chartData.xAxis.data = res.data.nameData
            this.chartData.series[0].data = res.data.outData
            this.chartData.series[1].data = res.data.inData
          }
        })
      } else {
        getEntranceCountName(this.queryParams).then(res => {
          if (res.code == '200') {
            this.chartData.xAxis.data = res.data.nameData
            this.chartData.series[0].data = res.data.outData
            this.chartData.series[1].data = res.data.inData
          }
        })
      }
    }
  },

  components: {
    LineChart
  }
}
</script>

<style>

</style>
