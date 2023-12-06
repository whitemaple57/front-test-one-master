<template>
  <el-dialog
    :title="'详情'"
    :visible="visible"
    @close="updateVisible"
    width="850px"
    append-to-body
  >
    <div v-loading="loading">
      <el-descriptions
        class="margin-top"
        :column="2"
        :labelStyle="{
          width: '150px'
        }"
        title="基本信息"
        :size="'small'"
        border
      >
        <el-descriptions-item label="企业编码">
          {{ info.companyCode  }}
        </el-descriptions-item>
        <el-descriptions-item label="统一社会信用代码">
          {{ info.orgCode  }}
        </el-descriptions-item>
        <el-descriptions-item label="企业名称">
          {{ info.companyName  }}
        </el-descriptions-item>
        <el-descriptions-item label="简称">
          {{ info.companyAbbreviation  }}
        </el-descriptions-item>
        <el-descriptions-item label="企业负责人姓名">
          {{ info.leadingCadre  }}
        </el-descriptions-item>
        <el-descriptions-item label="电话">
          {{ info.telephone  }}
        </el-descriptions-item>
        <el-descriptions-item label="企业规模">
          <dict-tag
            :options="dict.type.company_size"
            :value="info.companySize"
          />
        </el-descriptions-item>
        <el-descriptions-item label="是否为装卸作业企业">
          <dict-tag
            :options="dict.type.company_type"
            :value="info.companyType"
          />
        </el-descriptions-item>
        <el-descriptions-item label="地址">
          {{ info.registPlace  }}
        </el-descriptions-item>
        <el-descriptions-item label="联系人">
          {{ info.contacts  }}
        </el-descriptions-item>
        <el-descriptions-item label="联系电话">
          {{ info.mobile  }}
        </el-descriptions-item>
        <el-descriptions-item label="联系电子邮件">
          {{ info.email  }}
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          {{ info.nickName  }}
          <el-switch
            v-model="info.status"
            active-value="0"
            disabled
            inactive-value="-1"
          ></el-switch>
        </el-descriptions-item>
        <el-descriptions-item label="企业经营范围">
          {{ info.businessScope  }}
        </el-descriptions-item>
      </el-descriptions>
      <!-- <el-descriptions
        style="margin-top: 15px;"
        :column="2"
        :labelStyle="{
          width: '150px'
        }"
        title="账号信息"
        :size="'small'"
        border
      >
      <el-descriptions-item label="企业登录账号">
          {{ info.userName  }}
        </el-descriptions-item>
      </el-descriptions> -->
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="updateVisible(false)">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 详情
import { getCompany } from "@/api/organization/residentEnterprise";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  dicts: ["company_size", "company_type"],
  data() {
    return {
      loading: false,
      info: {},
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.getDetail();
      }
    },
  },
  methods: {
    updateVisible(value = false) {
      this.$emit("update:visible", value);
    },
    // 获取详情信息
    getDetail() {
      this.loading = true;
      const companyId = this.data.companyId;
      getCompany(companyId)
        .then((response) => {
          this.info = response.data;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style>
</style>