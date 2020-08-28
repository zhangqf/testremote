<template>
  <Layout :style="{padding: '0 24px 24px'}">
    <Breadcrumb :style="{margin: '24px 0',textAlign:'left'}">
      <BreadcrumbItem>系统管理</BreadcrumbItem>
      <BreadcrumbItem>用户角色</BreadcrumbItem>
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
        <template slot-scope="{ row, index }" slot="status">
          <div style="text-align:center">
            <i-Switch
              size="small"
              v-model="row.status"
              :disabled="row.status"
              :before-change="handleBeforeChange"
            />
          </div>
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
    
    </Content>
  </Layout>
</template>

<script>
export default {
  name: "HomeUserManagement",
  data() {
    return {
      columns: [
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
          title: "审核状态",
          slot: "status",
          width: "110px",
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
          status: true,
        },
        {
          name: "张小刚",
          age: 25,
          identify: "62246432164849646165253",
          birthday: "Sun Jun 06 1993 00:00:00 GMT+0800 (中国标准时间)",
          address: ["湖南省", "湘潭市", "湘潭县"],
          mobile: 13254896548,
          status: false,
        },
        {
          name: "李小红",
          age: 30,
          identify: "62246432164849646165365",
          birthday: "Mon Feb 04 1991 00:00:00 GMT+0800 (中国标准时间)",
          address: ["江西省", "九江市", "武宁县"],
          mobile: 13254896548,
          status: true,
        },
        {
          name: "周小伟",
          age: 26,
          identify: "62246432164849646165123",
          birthday: "Wed Aug 07 1996 00:00:00 GMT+0800 (中国标准时间)",
          address: ["福建省", "莆田市", "荔城区"],
          mobile: 13254896548,
          status: true,
        },
      ],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        identity: undefined,
      },
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
  },
  methods: {
    // 获取列表
    getList() {
      console.log("从后台获取列表");
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
    // 审核
    handleBeforeChange() {
      return new Promise((resolve) => {
        this.$Modal.confirm({
          title: "审核确认",
          content: "您确认审核通过吗？",
          onOk: () => {
            resolve();
          },
        });
      });
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