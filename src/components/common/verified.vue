<template>
  <div>
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
      <template slot-scope="{ row, index }" slot="job">
        <span>{{ row.job}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="identify">
        <span>{{ row.identify}}</span>
      </template>
        <template slot-scope="{ row, index }" slot="startTime">
            <DatePicker type="date" :value="row.startTime" placeholder="Select date"></DatePicker>
        <span>{{ }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="endTime">
        <DatePicker type="date" :value="row.endTime" placeholder="Select date"></DatePicker>
      </template>
      <template slot-scope="{ row, index }" slot="consultation">
        <span>{{row.consultation}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="rateNum">
        <span>{{row.rateNum }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="score">
         <Rate allow-half :value="row.score" :v-model="row.score"/>
         {{row.score }}
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
  </div>
</template>

<script>
export default {
  name: "Verified",
  props: ["data",'columns'],
  data() {
    return {
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

  },
  methods: {
    // 查询列表
    handleQuery() {
      this.queryParams.pageNum = 1;
     
    },
    resetQuery() {
      this.$refs.queryForm.resetFields();
      this.handleQuery();
    },
    // 改变每页的条数
    changePage(page) {
      this.queryParams.pageSize = page;
      // 重新获取列表
     
    },
    // 页码的改变
    changcurrent(page) {
      this.queryParams.pageNum = page;
      // 重新获取列表
     
      this.$emit("getList",this.queryParams)
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