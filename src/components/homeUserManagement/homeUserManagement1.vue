<template>
  <Layout :style="{padding: '0 24px 24px'}">
    <Breadcrumb :style="{margin: '24px 0',textAlign:'left'}">
      <BreadcrumbItem>会员管理</BreadcrumbItem>
      <BreadcrumbItem>患者管理</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
      <Verified :data="data" :columns="columns"></Verified>
    </Content>
  </Layout>
</template>

<script>
import Verified from '../common/verified'
export default {
  name: "HomeUserManagement1",
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
  components:{
    Verified
  },

  created() {
   
  },
  methods: {

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