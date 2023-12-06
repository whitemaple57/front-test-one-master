<template>
  <el-dialog
    :title="title"
    :close-on-click-modal="false"
    :visible="open"
    width="900px"
    append-to-body
    @close="cancel"
    @open="openModel"
  >
    <el-form
      size="small"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="150px"
      v-loading='loading'
    >
      <el-descriptions title="基本信息"></el-descriptions>
      <el-row :gutter="15">
        <el-col :span="12">
          <el-form-item label="企业编码" prop="companyCode">
            <el-input
              disabled
              v-model="form.companyCode"
              placeholder="系统自动生成"
              maxlength="30"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="统一社会信用代码" prop="orgCode">
            <el-input
              v-model="form.orgCode"
              maxlength="18"
              placeholder="请输入统一社会信用代码"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="12">
          <el-form-item label="企业名称" prop="companyName">
            <el-input
              v-model="form.companyName"
              placeholder="请输入企业名称"
              maxlength="30"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="简称" prop="companyAbbreviation">
            <el-input
              v-model="form.companyAbbreviation"
              placeholder="请输入简称"
              maxlength="30"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="12">
          <el-form-item label="企业负责人姓名" prop="leadingCadre">
            <el-input
              v-model="form.leadingCadre"
              placeholder="请输入企业负责人姓名"
              maxlength="30"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话" prop="telephone">
            <el-input v-model="form.telephone" placeholder="请输入电话" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="12">
          <el-form-item label="企业规模" prop="companySize">
            <el-select
              style="width: 100%"
              v-model="form.companySize"
              placeholder="请选择企业规模"
            >
              <el-option
                v-for="dict in dict.type.company_size"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否为装卸作业企业" prop="companyType">
            <el-select
              style="width: 100%"
              v-model="form.companyType"
              placeholder="请选择是否为装卸作业企业"
            >
              <el-option
                v-for="dict in dict.type.company_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="24">
          <el-form-item label="地址" prop="registPlace">
            <el-input v-model="form.registPlace" placeholder="请输入地址" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="12">
          <el-form-item label="联系人" prop="contacts">
            <el-input v-model="form.contacts" placeholder="请输入联系人" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="mobile">
            <el-input
              v-model="form.mobile"
              @blur="mobileBluer"
              placeholder="请输入11位手机号"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="12">
          <el-form-item label="联系电子邮件" prop="email">
            <el-input v-model="form.email" placeholder="请输入联系电子邮件" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-switch
              v-model="form.status"
              active-value="0"
              inactive-value="-1"
            ></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="24">
          <el-form-item label="企业经营范围" prop="businessScope">
            <el-input
              type="textarea"
              :rows="3"
              v-model="form.businessScope"
              placeholder="请输入企业经营范围"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="!form.companyId">
        <el-divider></el-divider>
        <el-descriptions title="账号设置"></el-descriptions>
        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="企业登录账号" prop="userName">
              <el-input
                disabled
                v-model="form.userName"
                placeholder="请输入联系电话自动生成账号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业登录密码" prop="password">
              <el-input
                v-model="form.password"
                disabled
                placeholder="企业登录密码"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  getCompanyCode,
  getCompany,
  addCompany,
  updateCompany,
} from "@/api/organization/residentEnterprise";
import { regexIsSocialcode } from "@/utils/validate";
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    id: {
      type: Number,
    },
  },
  dicts: ["company_size", "company_type"],
  data() {
    const validateSocialcode = (rule, value, callback) => {
      if (!regexIsSocialcode(value)) {
        callback(new Error("信用代码格式错误"));
      } else {
        callback();
      }
    };
    return {
      // 表单参数
      form: {
        registeType: 1, //1驻区企业 2承运企业
        companyId: null,
        companyCode: null,
        orgCode: null,
        companyName: null,
        companyAbbreviation: null,
        registPlace: null,
        companySize: "",
        companyType: "",
        leadingCadre: null,
        telephone: null,
        contacts: null,
        mobile: null,
        email: null,
        businessScope: null,
        status: "0",
        remark: null,
        createCompanyId: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        userName: "",
      },
      // 表单校验
      rules: {
        // companyCode: [
        //   { required: true, message: "企业编码不能为空", trigger: "blur" },
        // ],
        userName: [
          { required: true, message: "账号不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        orgCode: [
          {
            required: true,
            message: "统一社会信用代码不能为空",
            trigger: "blur",
          },
          {
            validator: validateSocialcode,
            trigger: "blur",
          },
        ],
        companyName: [
          { required: true, message: "企业名称不能为空", trigger: "blur" },
        ],
        companyAbbreviation: [
          { required: true, message: "企业简称不能为空", trigger: "blur" },
        ],
        leadingCadre: [
          {
            required: true,
            message: "企业负责人姓名不能为空",
            trigger: "blur",
          },
        ],
        companySize: [
          { required: true, message: "请选择企业规模", trigger: "change" },
        ],
        companyType: [
          {
            required: true,
            message: "请选择是否为装卸作业企业",
            trigger: "change",
          },
        ],
        contacts: [
          { required: true, message: "联系人不能为空", trigger: "blur" },
        ],
        registPlace: [
          { required: true, message: "地址不能为空", trigger: "blur" },
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        mobile: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
      },
      loading: false,
    };
  },
  methods: {
    // 重置表单
    reset(){
      this.form={
        registeType: 1, //1驻区企业 2承运企业
        companyId: null,
        companyCode: null,
        orgCode: null,
        companyName: null,
        companyAbbreviation: null,
        registPlace: null,
        companySize: "",
        companyType: "",
        leadingCadre: null,
        telephone: null,
        contacts: null,
        mobile: null,
        email: null,
        businessScope: null,
        status: "0",
        remark: null,
        createCompanyId: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        userName: "",
      }
    },
    //打开弹框时
    openModel(){
      this.reset()
      this.loading=true
      if(this.title=== "添加企业"){
        this.getCompanyCode()
      }else{
        getCompany(this.id).then((response) => {
          this.form = response.data;
          this.form.companySize = this.form.companySize
            ? this.form.companySize.toString()
            : "";
          this.form.companyType = this.form.companyType
            ? this.form.companyType.toString()
            : "";
          this.form.password = "";
          this.loading=false
        });
      }
    },
    // 手机号输入完  赋值账号
    mobileBluer() {
      if (this.form.companyId) {
        return;
      }
      this.$refs.form.validateField("mobile", (error) => {
        if (!error) {
          this.form.userName = this.form.mobile;
        }
      });
    },
    // 提交
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.companyId != undefined) {
            updateCompany(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.$emit("submit-form");
            });
          } else {
            addCompany(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.$emit("submit-form");
            });
          }
        }
      });
    },
    // 取消
    cancel() {
      this.$emit("cancel");
    },
    // 获取住区企业代码
    getCompanyCode() {
      getCompanyCode().then((res) => {
        this.form.companyCode = res.msg;
        this.getConfigKey("sys.user.initPassword").then((response) => {
          this.form.password = response.msg;
          this.loading=false
        });
      });
    },
  },
};
</script>

