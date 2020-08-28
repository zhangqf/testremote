<template>
  <Layout :style="{padding: '0 24px 24px'}">
    <Breadcrumb :style="{margin: '24px 0',textAlign:'left'}">
      <BreadcrumbItem>会员管理</BreadcrumbItem>
      <BreadcrumbItem>绩效审核</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
      <Verified :data="data" :columns="columns" ></Verified>
    </Content>
  </Layout>
</template>

<script>
import Verified from "../common/verified";
export default {
  name: "PerformanceReview",
  components: {
    Verified,
  },
  data() {
    return {
      columns: [
        {
          title: "医生姓名",
          slot: "name",
          width: "120",
        },
        {
          title: "年龄",
          slot: "age",
          width: "70",
        },
        {
          title: "电话号码",
          slot: "mobile",
          width: "140",
        },
        {
          title: "身份证号",
          slot: "identify",
          width: "250",
        },
        {
          title: "开始时间",
          slot: "startTime",
        },
        {
          title: "结束时间",
          slot: "endTime",
        },
        {
          title: "会诊记录数",
          slot: "consultation",
        },
        {
          title: "好评条数",
          slot: "rateNum",
        },
        {
          title: "绩效评分",
          slot: "score",
        },
      ],
      data: [
        {
          name: "王小明",
          age: 18,
          identify: "62246432164849646234523",
          mobile: 13254896548,
          rateNum: 88,
          consultation: 90,
          score: 4,
        },
        {
          name: "张小刚",
          age: 25,
          identify: "62246432164849646165253",
          score: 4.8,
          mobile: 13254896548,
          rateNum: 88,
          consultation: 90,
        },
        {
          name: "李小红",
          age: 30,
          identify: "62246432164849646165365",
          score: 3.8,
          mobile: 13254896548,
          rateNum: 88,
          consultation: 120,
        },
        {
          name: "周小伟",
          age: 26,
          identify: "62246432164849646165123",
          mobile: 13254896548,
          score: 3,
          rateNum: 55,
          consultation: 60,
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
 
};
</script>

<style lang="scss" scoped>
</style>