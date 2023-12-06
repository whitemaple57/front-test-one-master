
<template>
  <el-dialog
    title="企业导入"
    :visible="uploadOpen"
    width="400px"
    :close-on-click-modal="false"
    append-to-body
    @close="cancel"
  >
    <el-upload
      ref="upload"
      :limit="1"
      accept=".xlsx, .xls"
      :headers="headers"
      :action="url + '?updateSupport=' + updateSupport"
      :disabled="isUploading"
      :on-progress="handleFileUploadProgress"
      :on-success="handleFileSuccess"
      :auto-upload="false"
      drag
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip text-center" slot="tip">
        <span>仅允许导入xls、xlsx格式文件。</span>
        <el-link
          type="primary"
          :underline="false"
          style="font-size: 12px; vertical-align: baseline"
          @click="importTemplate"
        >下载模板</el-link
        >
      </div>
    </el-upload>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitFileForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getToken } from "@/utils/auth";
export default {
  props: {
    uploadOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 是否禁用上传
      isUploading: false,
      // 是否更新已经存在的用户数据
      updateSupport: 0,
      // 设置上传的请求头部
      headers: { Authorization: "Bearer " + getToken() },
      // 上传的地址
      url: process.env.VUE_APP_BASE_API + "/biz/residentCompany/importData",
    };
  },
  methods: {
    /** 下载模板操作 */
    importTemplate() {
      this.download(
        "/biz/residentCompany/importTemplate",
        {},
        `驻区企业导入模板_${new Date().getTime()}.xlsx`
      );
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(
        "<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" +
        response.msg +
        "</div>",
        "导入结果",
        { dangerouslyUseHTMLString: true }
      );
      this.$emit("handle-file-success")
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
    // 取消
    cancel() {
      this.$emit("upload-cancel");
    },
  },
};
</script>

