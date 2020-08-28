<template>
  <Layout :style="{padding: '0 24px 24px'}">
    <Breadcrumb :style="{margin: '24px 0',textAlign:'left'}">
      <BreadcrumbItem>系统管理</BreadcrumbItem>
      <BreadcrumbItem>角色管理</BreadcrumbItem>
      <!-- <BreadcrumbItem>Layout</BreadcrumbItem> -->
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
      <!-- 搜索 -->
      <Form ref="queryForm" :model="queryParams" :labelWidth="68" inline>
        <FormItem prop="rolesName" label="角色名称">
          <Input
            type="text"
            v-model="queryParams.rolesName"
            placeholder="请输入角色名称"
            size="default"
            @keyup.enter.native="handleQuery"
          ></Input>
        </FormItem>
        <FormItem>
          <Button class="ui-searchbtn" type="primary" size="default" @click="handleQuery">
            <Icon type="ios-search-outline" style="margin-right:6px" />搜索
          </Button>
          <Button size="default" @click="resetQuery">
            <Icon type="ios-refresh" size="16" />重置
          </Button>
        </FormItem>
      </Form>
      <Form>
        <FormItem class="ui-formItem">
          <Button type="info" size="default" @click="addRoleUser">
            <Icon type="md-add" size="12" />新增
          </Button>
          <Button type="success" :disabled="isDisabled" size="default" @click="modifyUser">
            <Icon type="ios-brush" size="12" />修改
          </Button>
          <Button type="error" size="default" @click="removeMoreUser">
            <Icon type="ios-trash" size="12" />删除
          </Button>
          <!-- <Button type="warning" size="default" @click="addUser">
             <Icon type="md-arrow-down" size="12"/>导出
          </Button>-->
        </FormItem>
      </Form>
      <!-- 主表格 -->
      <Table
        height="620"
        border
        stripe
        highlight-row
        :columns="columns"
        :data="data"
        @on-select="multipleChoice"
        @on-select-cancel="cancelMultipleChoice"
        @on-select-all-cancel="isDisabled=false"
        @on-select-all="isDisabled=true"
      >
        <template slot-scope="{ row, index }" slot="userId">
          <span>{{ row.userId }}</span>
        </template>
        <template slot-scope="{ row, index }" slot="name">
          <span>{{ row.name }}</span>
        </template>
        <template slot-scope="{ row, index }" slot="status">
          <i-Switch v-model="row.status" size="default" />
        </template>
        <template slot-scope="{ row, index }" slot="addedBy">
          <span>{{ row.addedBy}}</span>
        </template>
        <template slot-scope="{ row, index }" slot="addTime">
          <span>{{ row.addTime | formateTime}}</span>
        </template>
        <template slot-scope="{ row, index }" slot="updateBy">
          <span>{{ row.updateBy}}</span>
        </template>
        <template slot-scope="{ row, index }" slot="updateTime">
          <span>{{ row.updateTime | formateTime}}</span>
        </template>

        <template slot-scope="{ row, index }" slot="address">
          <span>{{ (row.address).join("") }}</span>
        </template>

        <template slot-scope="scope" slot="action">
          <Tooltip content="编辑">
            <Button
              type="info"
              class="ui-margin-right"
              size="small"
              @click="editRoleModalRow(scope)"
            >
              <Icon type="ios-brush-outline" />
            </Button>
          </Tooltip>
          <Tooltip content="删除">
            <Button class="ui-margin-right" type="error" size="small" @click="removeRoleRow(scope)">
              <Icon type="ios-trash-outline" />
            </Button>
          </Tooltip>

          <Button type="warning" size="small" @click="addRoleAuthority(scope)">
            <Icon type="md-share" />权限
          </Button>
        </template>
      </Table>

      <!-- 分页 -->
      <template>
        <Page
          class="ui-page"
          :total="100"
          show-total
          :page-size-opts="[10,20,50,100]"
          :page-size="queryParams.pageSize"
          show-sizer
          show-elevator
          @on-page-size-change="changePage"
          @on-change="changcurrent"
        />
      </template>
      <!-- 添加弹框 -->
      <Modal
        v-model="addRoleModal"
        width="45%"
        title="添加角色"
        @on-ok="addRolemodalConfirm"
        @on-cancel="addRolemodalCancel"
        style="background:#0f1"
      >
        <Form ref="addRoleFormRef" :model="addRoleForm" :label-width="80" :rules="addRoleFormRules">
          <FormItem label="姓名" prop="name">
            <Input v-model="addRoleForm.name" placeholder="请输入角色名称"></Input>
          </FormItem>
          <FormItem label="状态">
            <i-Switch v-model="addRoleForm.status" size="default" />
          </FormItem>
        </Form>
        <div slot="footer" style="text-align:center">
          <Button type="primary" size="default" @click="addRolemodalConfirm">提交</Button>
          <Button type="default" size="default" @click="addRolemodalCancel">关闭</Button>
        </div>
      </Modal>
      <!-- 编辑弹框 -->
      <Modal
        v-model="editRoleModal"
        width="60%"
        title="编辑"
        @on-ok="editRolemodalConfirm"
        @on-cancel="editRolemodalCancel"
      >
        <Form
          ref="editRoleFormRef"
          :model="editRoleForm"
          :label-width="80"
          :rules="editRoleFormRules"
        >
          <FormItem label="姓名" prop="name">
            <Input v-model="editRoleForm.name" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="状态">
            <i-Switch v-model="editRoleForm.status" size="default" />
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" size="large" @click="editRolemodalConfirm">确定</Button>
          <Button type="default" size="large" @click="editRolemodalCancel">取消</Button>
        </div>
      </Modal>

      <!-- 删除提示框 -->
      <Modal v-model="isRemove" width="360" title="提示">
        <div style="text-align:center">
          <p style="text-align:left;">
            <Icon
              type="ios-information-circle"
              style="color:#f60;text-align:center;margin-right:4px"
            ></Icon>确定删除角色？
          </p>
        </div>
        <div slot="footer">
          <Button type="error" :loading="modal_loading" @click="confirmRemove">确定</Button>
          <Button type="default" @click="cancelRemove">取消</Button>
        </div>
      </Modal>
      <!-- 权限弹框 -->
      <Modal v-model="authority" title="权限管理" width="500">
        <Tree :data=authorityData :render="renderContent" show-checkbox></Tree>
      </Modal>
    </Content>
  </Layout>
</template>

<script>
import expandRow from "../common/table-expand";
export default {
  name: "UserRoleManagement",
  component: {
    expandRow,
  },
  data() {
    return {
      columns: [
        {
          type: "expand",
          width: 40,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row.arr,
              },
            });
          },
        },
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "ID",
          slot: "userId",
          width: 80,
        },
        {
          title: "名称",
          slot: "name",
        },
        {
          title: "状态",
          slot: "status",
          width: 100,
        },
        {
          title: "添加人",
          slot: "addedBy",
        },
        {
          title: "添加时间",
          slot: "addTime",
        },
        {
          title: "更新人",
          slot: "updateBy",
        },
        {
          title: "更新时间",
          slot: "updateTime",
        },
        {
          title: "操作",
          slot: "action",
          width: "180px",
        },
      ],
      data: [
        {
          name: "超级管理员",
          status: true,
          userId: "1",
          addedBy: "admin1",
          updateBy: "superAdmin",
          addTime: "Fri Dec 03 1999 00:00:00 GMT+0800 (中国标准时间)",
          updateTime: "Wed Aug 07 1996 00:00:00 GMT+0800 (中国标准时间)",
          arr: [
            {
              name: "系统管理",
              level: "1",
              children: [
                { name: "用户管理", level: "2" },
                { name: "角色管理", level: "2" },
                { name: "权限管理", level: "2" },
              ],
            },
            {
              name: "会员管理",
              level: "1",
              children: [
                { name: "医生管理", level: "2" },
                { name: "绩效审核", level: "2" },
              ],
            },
            {
              name: "咨询管理",
              level: "1",
              children: [
                { name: "广告管理", level: "2" , checked: true},
                { name: "通知公告", level: "2" },
                { name: "新闻管理", level: "2" },
              ],
            },
          ],
        },
        {
          name: "系统管理员",
          status: false,
          userId: "2",
          addedBy: "admin2",
          updateBy: "superAdmin",
          addTime: "Sun Jun 06 1993 00:00:00 GMT+0800 (中国标准时间)",
          updateTime: "Thu Aug 27 2020 11:21:10 GMT+0800 (中国标准时间)",
        },
        {
          name: "技术中心",
          status: false,
          userId: "33",
          addedBy: "admin33",
          updateBy: "superAdmin",
          addTime: "Mon Feb 04 1991 00:00:00 GMT+0800 (中国标准时间)",
          updateTime: "Wed Aug 07 1996 00:00:00 GMT+0800 (中国标准时间)",
        },
        {
          name: "admin",
          userId: "122",
          status: true,
          addedBy: "admin1",
          updateBy: "superAdmin",
          addTime: "Wed Aug 07 1996 00:00:00 GMT+0800 (中国标准时间)",
          updateTime: "Wed Aug 07 1996 00:00:00 GMT+0800 (中国标准时间)",
        },
      ],
      editIndex: -1, // 当前聚焦的输入框的行数
      editName: "", // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editAge: "", // 第二列输入框
      editidentify: "",
      editBirthday: "", // 第三列输入框
      editAddress: "", // 第四列输入框

      queryParams: {
        pageNum: 1,
        pageSize: 10,
        rolesName: undefined,
      },
      addRoleModal: false, //新增弹框

      addRoleForm: {
        name: "",
      },

      editRoleForm: {
        name: "",
        select: "",
        indentify: "",
        mobile: "",
        birthday: null,
        address: [],
      },

      addRoleFormRules: {
        name: [
          { required: true, message: "用户名不能为空!", trigger: "blur" },
          { min: 3, max: 8, message: "3-8个字符", trigger: "blur" },
        ],
      },
      editRoleFormRules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 3, max: 8, message: "3-8个字符", trigger: "blur" },
        ],

        indentify: [
          { required: true, message: "身份证号不能为空", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
        ],
        birthday: [
          {
            required: true,
            message: "请选择出生年月",
            trigger: "change",
            pattern: /.+/,
          },
        ],
        address: [
          {
            required: true,
            message: "请选择地址",
            trigger: "change",
            pattern: /.+/,
          },
        ],
      },
      // 编辑弹框
      editRoleModal: false,
      // 删除提示框
      isRemove: false,
      modal_loading: false,
      // 按钮是否禁用
      isDisabled: false,
      //   权限弹框开关
      authority: false,
      //   权限数据
      authorityData: [],
    };
  },

  // 时间过滤器
  filters: {
    formateTime: function (value) {
      if (!value) return "";
      value = new Date(value);
      value =
        value.getFullYear() +
        "-" +
        (value.getMonth() + 1 >= 10
          ? value.getMonth() + 1
          : "0" + (value.getMonth() + 1)) +
        "-" +
        (value.getDate() > 10 ? value.getDate() : "0" + value.getDate()) +
        " " +
        (value.getHours() > 10 ? value.getHours() : "0" + value.getHours()) +
        ":" +
        (value.getMinutes() > 10
          ? value.getMinutes()
          : +"0" + value.getMinutes()) +
        ":" +
        (value.getSeconds() > 10
          ? value.getSeconds()
          : +"0" + value.getSeconds());
      //   value.getHours() > 10 ? value.getHours() : "0" + value.getHours()
      return value;
    },
  },

  created() {
    this.getList();
    // this.getProvincesData();
  },
  methods: {
    // 获取省市区数据
    getProvincesData() {
      const provinces = require("../../json/provinces.json");
      console.log(provinces);
      this.dataprovinces = provinces.data;
    },
    // 获取列表
    getList() {
      console.log("从后台获取列表");
    },
    // 添加表单
    addEdit() {},
    // 表单重置
    reset() {
      this.form = {
        userName: undefined,
        identity: undefined,
      };
      this.resetForm("form");
    },
    // 查询列表
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    resetQuery() {
      console.log(23);
      this.$refs.queryForm.resetFields();
      this.handleQuery();
    },
    // 改变每页的条数
    changePage(page) {
      this.pageSize = page;
      // 重新获取列表
      this.getList();
    },
    // 页码的改变
    changcurrent(page) {
      this.pageNum = page;
      // 重新获取列表
      this.getList();
    },
    // 添加数据
    addRoleUser() {
      this.addRoleModal = true;
    },
    // 添加弹框确定
    addRolemodalConfirm() {
      // 校验rule 成功后连接后台
      this.$refs.addRoleFormRef.validate((valid) => {
        console.log(valid);
        if (valid) {
          // 将表单数据添加到后台并重新获取数据
          this.getList();
          this.addRoleModal = false;
          this.$refs.addFormRef.resetFields();
        }
      });
    },
    // 添加弹框取消
    addRolemodalCancel() {
      this.addRoleModal = false;
      this.$refs.addRoleFormRef.resetFields();
    },
    // 删除行
    removeRoleRow(scope) {
      console.log(scope.row);
      this.isRemove = true;
    },
    // 编辑弹框
    editRoleModalRow(scope) {
      this.editRoleModal = true;
      this.editRoleForm = scope.row;

      // console.log(this.editForm)
    },

    // 编辑弹框确定
    editRolemodalConfirm() {
      this.$refs.editRoleFormRef.validate((valid) => {
        console.log(valid);
        if (valid) {
          // 将表单数据添加到后台并重新获取数据
          this.getList(this.editRoleForm);
          this.editRoleModal = false;
          this.$refs.addRoleFormRef.resetFields();
        }
      });
    },
    // 编辑弹框取消
    editRolemodalCancel() {
      this.editRoleModal = false;
    },
    // 修改
    modifyUser() {},
    //删除
    removeMoreUser() {},
    // 删除提示框确定
    confirmRemove() {
      this.modal_loading = true;
      setTimeout(() => {
        this.modal_loading = false;
        this.isRemove = false;
        this.$Message.success("删除成功！");
      }, 2000);
    },
    cancelRemove() {
      this.isRemove = false;
    },
    // 判断是否多选 多选顶部编辑为disable
    multipleChoice(selection, row) {
      if (selection.length >= 2) {
        this.isDisabled = true;
      }
    },
    cancelMultipleChoice(selection, row) {
      if (selection.length < 2) {
        this.isDisabled = false;
      }
    },
    // 添加权限
    addRoleAuthority(scope) {
      console.log(scope);
      this.authority = true;
      this.authorityData = scope.row.arr
      // 获取该用户所有的权限并填充到所有权限中
    },
    // 自定义树形结构
    renderContent (h,{root,node,data}){
        return h("span",{
            style:{
                width:"100%"
            }
        }, data.name )
    }
  },
};
</script>

<style lang="stylus" scoped>
.ivu-modal-footer {
  text-align: center;
}

.ui-formItem {
  Button {
    margin-right: 10px;

    I {
      margin-right: 2px;
    }
  }
}

.ivu-layout {
  height: 100%;
}

.ivu-menu {
  height: 100%;
}

.layout {
  height: 100%;
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.ivu-cascader-transfer {
  width: 800px;
}

.ivu-page {
  text-align: left;
  margin-top: 20px;
}

.ui-width150 {
  width: 150px;
  font-size: 14px;
}

.ui-margin-right {
  margin-right: 8px;
}

.ivu-form {
  text-align: left;
}

.ui-btngrounp {
  margin-bottom: 6px;
}

.buttonSize {
  width: 48px;
  height: 26px;
}

.ui-searchbtn {
  margin-right: 20px;
}
</style>