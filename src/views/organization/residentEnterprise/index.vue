<template>
  <div class="app-container">
    <div>
      <el-form
        :model="queryParams"
        ref="queryForm"
        size="small"
        :inline="true"
        v-show="showSearch"
        label-width="68px"
      >
        <el-form-item label="企业名称" prop="companyName">
          <el-input
            v-model="queryParams.companyName"
            placeholder="请输入企业名称"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="queryParams.status"
            placeholder="用户状态"
            clearable
            style="width: 240px"
          >
            <el-option :label="'启用'" :value="0" />
            <el-option :label="'禁用'" :value="-1" />
          </el-select>
        </el-form-item>
        <el-form-item
          label-width="150px"
          label="是否属于装卸企业"
          prop="companyType"
        >
          <el-select
            v-model="queryParams.companyType"
            placeholder="是否属于装卸企业"
            clearable
            style="width: 240px"
          >
            <el-option
              v-for="dict in dict.type.company_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="企业规模" prop="companySize">
          <el-select
            v-model="queryParams.companySize"
            placeholder="企业规模"
            clearable
            style="width: 240px"
          >
            <el-option
              v-for="dict in dict.type.company_size"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="handleQuery"
            >搜索</el-button
          >
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
            >重置</el-button
          >
        </el-form-item>
      </el-form>

      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
            v-hasPermi="['biz:residentCompany:add']"
            >新增</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="info"
            plain
            icon="el-icon-upload2"
            size="mini"
            @click="handleImport"
            v-hasPermi="['biz:residentCompany:import']"
            >导入</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
            v-hasPermi="['biz:residentCompany:export']"
            >导出</el-button
          >
        </el-col>
        <right-toolbar
          :showSearch.sync="showSearch"
          @queryTable="getList"
        ></right-toolbar>
      </el-row>
      <el-table
        v-loading="loading"
        :data="tableList"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="50" align="center" /> -->
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column
          label="企业编码"
          align="center"
          key="companyCode"
          width="150"
          :show-overflow-tooltip="true"
          prop="companyCode"
        />
        <el-table-column
          label="企业名称"
          key="companyName"
          prop="companyName"
          width="400"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="简称"
          key="companyAbbreviation"
          prop="companyAbbreviation"
          width="250"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="企业规模"
          key="companySize"
          prop="companySize"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <dict-tag
              :options="dict.type.company_size"
              :value="scope.row.companySize"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="是否属于装卸企业"
          key="companyType"
          prop="companyType"
          width="180"
        >
          <template slot-scope="scope">
            <dict-tag
              :options="dict.type.company_type"
              :value="scope.row.companyType"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="企业联系人"
          width="130"
          key="contacts"
          prop="contacts"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="状态" align="center" key="status">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-value="0"
              disabled
              inactive-value="-1"
              @change="handleStatusChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="添加车队"
          key="transportCount"
          prop="transportCount"
          width="120"
        />
        <el-table-column
          label="车辆数量"
          key="vehicleCount"
          prop="vehicleCount"
          width="120"
        />
        <el-table-column
          label="更新时间"
          align="center"
          prop="updateTime"
          width="160"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.updateTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          width="160"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          width="160"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['biz:residentCompany:edit']"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleDetail(scope.row)"
              v-hasPermi="['biz:residentCompany:query']"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>

    <!-- 添加或修改用户配置对话框 -->
    <add-or-edite-dialog :open="open"  :title="title" @cancel="cancel" :id="companyId" @submit-form="submitForm"></add-or-edite-dialog>
    <!-- 用户导入对话框 -->
    <upload-data :uploadOpen="uploadOpen" @handle-file-success="handleFileSuccess" @upload-cancel="uploadCancel"></upload-data>
    <!-- 详情页 -->
    <detail :visible.sync="detailVisible" :data="currentRow"></detail>
  </div>
</template>

<script>
import {
  listCompany,
  delCompany,
} from "@/api/organization/residentEnterprise";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { Detail,AddOrEditeDialog,UploadData } from "./component/index.js";
export default {
  name: "ResidentEnterprise",
  dicts: ["company_size", "company_type"],
  components: {  Detail,AddOrEditeDialog,UploadData },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 用户表格数据
      tableList: null,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 导入弹框
      uploadOpen: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        companyCode: undefined,
        companyName: undefined,
        companySize: undefined,
        companyType: undefined,
        status: "",
      },
      detailVisible: false, // 是否显示详情弹窗
      currentRow: {},
      dateRange: [],
      companyId:null,
    };
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listCompany(this.addDateRange(this.queryParams, this.dateRange))
        .then((response) => {
          this.tableList = response.rows;
          this.total = response.total;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 用户状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$modal
        .confirm('确认要"' + text + '""' + row.userName + '"用户吗？')
        .then(function () {
          return changeUserStatus(row.userId, row.status);
        })
        .then(() => {
          this.$modal.msgSuccess(text + "成功");
        })
        .catch(function () {
          row.status = row.status === "0" ? "1" : "0";
        });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /*  多选框选中数据 */
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.userId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.open = true;
      this.title = "添加企业";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.open = true;
      this.title = "修改企业";
      this.companyId = row.companyId;
    },
     /* 新增修改弹框取消按钮 */
    cancel() {
      this.open = false;
    },
    /** 提交按钮 */
    submitForm: function () {
      this.open = false;
      this.getList();
    },
    // 打开详情
    handleDetail(row) {
      this.currentRow = row;
      this.detailVisible = true;
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const companyIds = row.companyId || this.ids;
      this.$modal
        .confirm('是否确认删除企业编号为"' + companyIds + '"的数据项？')
        .then(function () {
          return delCompany(companyIds);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "/biz/residentCompany/export",
        {
          ...this.queryParams,
        },
        `驻区企业_${new Date().getTime()}.xlsx`
      );
    },
    /** 导入按钮操作 */
    handleImport() {
      this.uploadOpen = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.uploadOpen = false;
      this.getList();
    },
    uploadCancel(){
      this.uploadOpen = false;
    }
  },
};
</script>
