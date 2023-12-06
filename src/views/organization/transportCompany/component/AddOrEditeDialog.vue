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
      v-loading="loading"
    >
      <el-descriptions title="基本信息"></el-descriptions>
      <el-row :gutter="15">
        <el-col :span="12">
          <el-form-item label="公司编码" prop="companyCode">
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
          <el-form-item label="公司名称" prop="companyName">
            <el-input
              v-model="form.companyName"
              placeholder="请输入公司名称"
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
          <el-form-item label="公司负责人姓名" prop="leadingCadre">
            <el-input
              v-model="form.leadingCadre"
              placeholder="请输入公司负责人姓名"
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
          <el-form-item label="公司规模" prop="companySize">
            <el-select
              style="width: 100%"
              v-model="form.companySize"
              placeholder="请选择公司规模"
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
          <el-form-item label="公司经营范围" prop="businessScope">
            <el-input
              type="textarea"
              :rows="3"
              v-model="form.businessScope"
              placeholder="请输入公司经营范围"
            />
          </el-form-item>
        </el>

