<template>
  <Layout :style="{padding: '0 24px 24px'}">
    <Breadcrumb :style="{margin: '24px 0',textAlign:'left'}">
      <BreadcrumbItem>系统管理</BreadcrumbItem>
      <BreadcrumbItem>用户角色</BreadcrumbItem>
      <!-- <BreadcrumbItem>Layout</BreadcrumbItem> -->
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
      <!-- 搜索 -->
      <Form ref="queryForm" :model="queryParams" :labelWidth="68" inline>
        <FormItem prop="identity" label="身份证号">
          <Input
            type="text"
            v-model="queryParams.identity"
            placeholder="请输入身份证"
            size="default"
            @keyup.enter.native="handleQuery"
          ></Input>
        </FormItem>
        <FormItem prop="userName" label="姓名">
          <Input
            type="text"
            v-model="queryParams.userName"
            placeholder="请输入姓名"
            size="default"
            @keyup.enter.native="handleQuery"
          ></Input>
        </FormItem>
        <FormItem>
          <Button class="ui-searchbtn" type="primary" size="default" @click="handleQuery">搜索</Button>
          <Button size="default" @click="resetQuery">重置</Button>
        </FormItem>
        <Button type="info" size="default" @click="addUser" style="font-size:12px">
          <Icon type="md-add" size="14" />新增
        </Button>
      </Form>
      <!-- 主表格 -->
      <Table height="620" border stripe highlight-row :columns="columns" :data="data">
        <template slot-scope="{ row, index }" slot="name">
          <span>{{ row.name }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="age">
          <span>{{ row.age }}</span>
        </template>
        <template slot-scope="{ row, index }" slot="mobile">
          <span>{{ row.mobile}}</span>
        </template>
        <template slot-scope="{ row, index }" slot="identify">
          <span>{{ row.identify}}</span>
        </template>

        <template slot-scope="{ row, index }" slot="birthday">
          <span>{{row.birthday | formateTime}}</span>
        </template>

        <template slot-scope="{ row, index }" slot="address">
          <span>{{ (row.address).join("") }}</span>
        </template>

        <template slot-scope="scope" slot="action">
          <Tooltip content="编辑">
            <Button type="info" class="ui-margin-right" size="small" @click="editModalRow(scope)">
              <Icon type="ios-brush-outline" />
            </Button>
          </Tooltip>
          <Tooltip content="删除">
            <Button type="error" size="small" @click="removeRow(scope)">
              <Icon type="ios-trash-outline" />
            </Button>
          </Tooltip>
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
        v-model="addModal"
        width="60%"
        title="添加用户信息"
        @on-ok="addmodalConfirm"
        @on-cancel="addmodalCancel"
      >
        <Form ref="addFormRef" :model="addForm" :label-width="80" :rules="addFormRules">
          <FormItem label="姓名" prop="name">
            <Input v-model="addForm.name" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="年龄">
            <Input v-model="addForm.age" placeholder="Enter something..."></Input>
          </FormItem>

          <FormItem label="身份证号" prop="indentify">
            <Input v-model="addForm.indentify" placeholder="请输入身份证号"></Input>
          </FormItem>
          <FormItem label="手机" prop="mobile">
            <Input v-model="addForm.mobile" placeholder="请输入手机号"></Input>
          </FormItem>
          <FormItem label="出生年月" prop="birthday">
            <DatePicker
              type="date"
              placeholder="选择时间"
              v-model="addForm.birthday"
              format="yyyy-MM-dd"
            ></DatePicker>
          </FormItem>
          <FormItem label="地址" prop="address">
            <div class="ui-cascader">
              <Cascader :data="dataprovinces" v-model="addForm.address"></Cascader>
            </div>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="default" size="large" @click="addmodalCancel">取消</Button>
          <Button type="primary" size="large" @click="addmodalConfirm">确定</Button>
        </div>
      </Modal>
      <!-- 编辑弹框 -->
      <Modal
        v-model="editModal"
        width="60%"
        title="编辑"
        @on-ok="editmodalConfirm"
        @on-cancel="editmodalCancel"
      >
        <Form ref="editFormRef" :model="editForm" :label-width="80" :rules="editFormRules">
          <FormItem label="姓名" prop="name">
            <Input v-model="editForm.name" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="年龄">
            <Input v-model="editForm.age" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="身份证号" prop="identify">
            <Input v-model="editForm.identify" placeholder="请输入身份证号"></Input>
          </FormItem>
          <FormItem label="手机" prop="mobile">
            <Input v-model="editForm.mobile" placeholder="请输入手机号"></Input>
          </FormItem>
          <FormItem label="出生年月" prop="birthday">
            <div>
              <DatePicker type="date" placeholder="选择时间" v-model="editForm.birthday"></DatePicker>
            </div>
          </FormItem>
          <FormItem label="地址" prop="address">
            <div class="ui-cascader">
              <Cascader :data="dataprovinces" v-model="editForm.address"></Cascader>
            </div>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="default" size="large" @click="editmodalCancel">取消</Button>
          <Button type="primary" size="large" @click="editmodalConfirm">确定</Button>
        </div>
      </Modal>
    </Content>
  </Layout>
</template>

<script>
export default {
  name: "UserInformation",
  data() {
    return {
      columns: [
        // {
        //   type: "selection",
        //   width: 60,
        //   align: "center",
        // },
        {
          title: "姓名",
          slot: "name",
        },
        {
          title: "年龄",
          slot: "age",
        },
        {
          title: "电话号码",
          slot: "mobile",
        },
        {
          title: "身份证号",
          slot: "identify",
        },
        {
          title: "出生日期",
          slot: "birthday",
        },
        {
          title: "地址",
          slot: "address",
        },
        {
          title: "操作",
          slot: "action",
          width: "150px",
        },
      ],
      data: [
        {
          name: "王小明",
          age: 18,
          identify: "62246432164849646234523",
          birthday: "Fri Dec 03 1999 00:00:00 GMT+0800 (中国标准时间)",
          address: ["辽宁省", "鞍山市", "立山区"],
          mobile: 13254896548,
        },
        {
          name: "张小刚",
          age: 25,
          identify: "62246432164849646165253",
          birthday: "Sun Jun 06 1993 00:00:00 GMT+0800 (中国标准时间)",
          address: ["湖南省", "湘潭市", "湘潭县"],
          mobile: 13254896548,
        },
        {
          name: "李小红",
          age: 30,
          identify: "62246432164849646165365",
          birthday: "Mon Feb 04 1991 00:00:00 GMT+0800 (中国标准时间)",
          address: ["江西省", "九江市", "武宁县"],
          mobile: 13254896548,
        },
        {
          name: "周小伟",
          age: 26,
          identify: "62246432164849646165123",
          birthday: "Wed Aug 07 1996 00:00:00 GMT+0800 (中国标准时间)",
          address: ["福建省", "莆田市", "荔城区"],
          mobile: 13254896548,
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
        userName: undefined,
        identity: undefined,
      },
      addModal: false, //新增弹框

      addForm: {
        name: "",
        age: "",
        indentify: "",
        mobile: "",
        birthday: null,
        address: [],
      },
      editFormcopy: {
        name: "",
        select: "",
        indentify: "",
        mobile: "",
        birthday: null,
        address: [],
      },
      editForm: {
        name: "",
        select: "",
        indentify: "",
        mobile: "",
        birthday: null,
        address: [],
      },
      dataprovinces: "",
      addFormRules: {
        name: [
          { required: true, message: "用户名不能为空!", trigger: "blur" },
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
      editFormRules: {
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
      editModal: false,
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
        (value.getDate() > 10 ? value.getDate() : "0" + value.getDate());
      return value;
    },
  },

  created() {
    this.getList();
    this.getProvincesData();
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
    addUser() {
      this.addModal = true;
    },
    // 添加弹框确定
    addmodalConfirm() {
      // 校验rule 成功后连接后台
      this.$refs.addFormRef.validate((valid) => {
        console.log(valid);
        if (valid) {
          // 将表单数据添加到后台并重新获取数据
          this.getList();
          this.addModal = false;
          this.$refs.addFormRef.resetFields();
        }
      });
    },
    // 添加弹框取消
    addmodalCancel() {
      this.addModal = false;
      this.$refs.addFormRef.resetFields();
      console.log(this.addForm);
    },
    // 删除行
    removeRow(scope) {
      console.log(scope.row);
      this.$Message.info("从数据库删除该行");
    },
    // 编辑弹框
    editModalRow(scope) {
      this.editModal = true;
      this.editForm = scope.row;
      this.editForm.birthday = this.timeFormat(scope.row.birthday);
      // console.log(this.editForm)
    },

    // 编辑弹框确定
    editmodalConfirm() {
      this.$refs.editFormRef.validate((valid) => {
        console.log(valid);
        if (valid) {
          // 将表单数据添加到后台并重新获取数据
          this.getList(this.editForm);
          this.editModal = false;
          this.$refs.addFormRef.resetFields();
        }
      });
    },
    // 编辑弹框取消
    editmodalCancel() {
      this.editModal = false;
    },
    //处理时间格式
    timeFormat(time) {
      // if(typeof(time)!="object")return time;
      const formatData = new Date(time);
      const StringTime =
        formatData.getFullYear() +
        "-" +
        (formatData.getMonth() + 1) +
        "-" +
        formatData.getDate();
      return StringTime;
    },
  },
};
</script>

<style lang="stylus" scoped>
.ivu-btn {
  font-size: 10px;
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
  margin-right: 20px;
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