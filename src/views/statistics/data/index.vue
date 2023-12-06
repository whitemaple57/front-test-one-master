<template>
  <div class="app-container">
    <my-card></my-card>
    <el-divider></el-divider>
    <!-- 车型出入统计 -->
    <div>
      <div class="title">车型出入统计</div>
      <vehicle-access></vehicle-access>
    </div>
    <!-- 岗亭统计 -->
    <div>
      <div class="title">岗亭统计</div>
      <watch-box></watch-box>
    </div>
    <div>
      <div class="title">企业车辆出入统计</div>
      <my-table></my-table>
    </div>
  </div>
</template>

<script>
import {MyCard,VehicleAccess,WatchBox,MyTable} from "./component/index";
export default {

  components: {
    MyCard,
    VehicleAccess,
    WatchBox,
    MyTable
  },
};
</script>

<style  lang="scss" scoped >
.title {
  font-size: 14px;
  color: #000000;
  font-weight: bold;
  text-align: left;
}
</style>
