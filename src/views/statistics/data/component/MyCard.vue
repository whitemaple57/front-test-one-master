<template>
  <el-row :gutter="15">
    <el-col :span="6">
      <div class="num-box">
        <div class="desc">
          <span class="name">今日车辆统计</span>
          <span class="tag">实时</span>
        </div>
        <h3>{{ info.today }}</h3>
      </div>
    </el-col>
    <el-col :span="6"
      ><div class="num-box" style="--b: #2095f2">
        <div class="desc">
          <span class="name">危化品车辆统计</span>
          <span class="tag">实时</span>
        </div>
        <h3>{{ info.chemica }}</h3>
      </div></el-col
    >
    <el-col :span="6">
      <div class="scroll-box">
        <div
          :class="['num-box', showIndex == idx ? 'active' : '']"
          style="--b: #fd5b50"
          v-for="(i, idx) of grossList"
          :key="i.name"
        >
          <div class="desc">
            <span class="name">{{ i.name }}</span>
            <span class="tag">实时</span>
          </div>
          <h3>{{ i.sum }}</h3>
        </div>
      </div>
    </el-col>
    <el-col :span="6"
      ><div class="num-box" style="--b: #02bad4">
        <div class="desc">
          <span class="name">本月车辆统计</span>
          <span class="tag">实时</span>
        </div>
        <h3>{{ info.month }}</h3>
      </div></el-col
    >
  </el-row>
</template>

<script>
import {
  getEntranceCountName,
  getTodayVehicle,
  getMonthVehicle,
  getChemicalVehicle,
} from "@/api/statistics/data";
export default {
  data() {
    return {
      showIndex: 0,
      timer: null,
      loopTimer: null,
      grossList: [],
      info: {
        today: 0,
        month: 0,
        chemica: 0,
      },
    };
  },
  mounted() {
    this.loopGetData();
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.loopTimer);
  },
  methods: {
    loopGetData() {
      this.getEntranceCountName();
      this.getTodayVehicle();
      this.getChemicalVehicle();
      this.getMonthVehicle();
    },
    // 获取岗亭对应的进出数量
    getEntranceCountName() {
      getEntranceCountName({}).then((res) => {
        const result = res.data;
        const len = result.nameData.length;
        const list = [];
        for (let index = 0; index < len; index++) {
          list.push({
            name: result.nameData[index],
            in: result.inData[index],
            out: result.outData[index],
            sum: result.sumData[index],
          });
        }
        this.grossList = list;
        clearInterval(this.timer);
        if (len > 1) {
          this.timer = setInterval(() => {
            const max = this.grossList.length;
            const index = this.showIndex + 1;
            this.showIndex = index > max - 1 ? 0 : index;
          }, 5000);
        }

        this.loopTimer = setTimeout(() => {
          this.loopGetData();
        }, 1000 * 60 * 4);
      });
    },
    getTodayVehicle() {
      getTodayVehicle().then((res) => {
        this.info.today = res.data;
      });
    },
    getMonthVehicle() {
      getMonthVehicle().then((res) => {
        this.info.month = res.data;
      });
    },
    getChemicalVehicle() {
      getChemicalVehicle().then((res) => {
        this.info.chemica = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped >
.num-box {
  --b: #ffa306;
  min-width: 100px;
  background-color: var(--b);
  height: 100px;
  border-radius: 4px;
  color: #fff;
  padding: 16px;
  h3 {
    font-size: 24px;
  }
  .desc {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    .tag {
      padding: 2px 5px;
      border-radius: 4px;
      background: rgba($color: #000000, $alpha: 0.1);
    }
  }
}
.scroll-box {
  height: 100px;
  overflow: hidden;
  position: relative;
  .num-box {
    transition: all 1.5s linear;
    width: 100%;
    position: absolute;
    z-index: 1;
    height: 0;
    overflow: hidden;
    &.active {
      height: 100px;
      bottom: 0;
      z-index: 2;
    }
  }
}
</style>