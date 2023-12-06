<template>
  <div>
    <div
      style="display: flex; justify-content: space-between; margin: 15px 0"
    >
      <el-radio-group v-model="queryParams['vehicle_type']" size="small" @change="handleChangeType">
        <el-radio-button label="">全部</el-radio-button>
        <el-radio-button :label="type.dictValue"  v-for="type in vehicleList">{{type.dictLabel}}</el-radio-button>

      </el-radio-group>
      <div>
        <el-radio-group v-model="queryParams.type" size="small" @change="handleChangeTimeType">
          <el-radio-button label="DAY">今天</el-radio-button>
          <el-radio-button label="RECENT">近三天</el-radio-button>
          <el-radio-button label="RECENT_MONTH">近一周</el-radio-button>
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
          value-format="yyyy-MM-dd"
          @change="handleChangeTime"
        >
        </el-date-picker>
      </div>
    </div>
    <line-chart :chartData="chartData"></line-chart>
  </div>
</template>

<script>
import LineChart from "./LineChart.vue";
import { getCountData } from '../../../../api/statistics/statistics'
import { getDicts } from '../../../../api/system/dict/data'
export default {
  data() {
    return {
      vehicleList:[],
      radio1: "all",
      value1: [],
      chartData: {
        xAxis: {
          data: [],
          boundaryGap: ["20%", "20%"],
          axisTick: {
            show: false,
          },
        },
        grid: {
          left: 20,
          right: 0,
          bottom: 20,
          top: 60,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          padding: [5, 10],
        },
        yAxis: {
          axisTick: {
            show: false,
          },
        },
        legend: {
          data: ["出厂数量", "入厂数量"],
          left: 0,
        },
        series: [
          {
            name: "出厂数量",
            type: "bar",
            barWidth: 12,
            color: "#3b9cfd",
            // 实现数字展示在柱状图
            label: {
              show: true,
              position: "top",
              fontSize: 12,
              color: "#F5F5F5",
              offset: [0, -10],
              formatter: "{c}", //添加单位
            },
            data: [],
          },
          {
            name: "入厂数量",
            type: "bar",
            barWidth: 12,
            color: "#ffa306",
            // 实现数字展示在柱状图
            label: {
              show: true,
              position: "top",
              fontSize: 12,
              color: "#F5F5F5",
              offset: [0, -10],
              formatter: "{c}", //添加单位
            },
            data: [],
          },
        ],
      },
      queryParams:{
        'vehicle_type':'',
        startDate:'',
        endDate:'',
        type:'DAY',
        time:' '
      }
    }
  },
  created() {
    this.getData();
    this.getDictList();
  },
  methods:{
    handleChangeTimeType(value){
      if (value == 'SELF_TIME') {
        return
      }else {
        this.queryParams.time=[]
        this.getData()
      }

    },
    handleChangeTime(value){
      this.queryParams.startDate = value[0]
      this.queryParams.endDate = value[1]
      this.getData();
    },
    handleChangeType(value){
      this.getData();
    },
    getData(){
      getCountData(this.queryParams).then(res=>{
        if(res.code == '200') {
          this.chartData.xAxis.data=res.data.xdata
          this.chartData.series[0].data=res.data.ydata1
          this.chartData.series[1].data=res.data.ydata2
        }
      })
    },
    /** 查询字典 */
    getDictList() {
      getDicts('vehicle_type').then(res => {
        if (res.code == '200') {
          const vehicleList = res.data
          let list =[]
          vehicleList.forEach(item =>{
            let name = item.dictLabel.indexOf('（') != '-1' ?  item.dictLabel.slice(0,item.dictLabel.indexOf('（')) : item.dictLabel
            list.push({
              dictLabel:name,
              dictValue:item.dictValue
            })
          })
          this.vehicleList = list
        }
      })},
  },
  components: {
    LineChart
  }
}
</script>

<style>

</style>






























