<template>
 <div class="layout">
        <Layout>
            <!-- 头部 -->
            <Header class="ui-indexHeader">
               <div class="ui-indexLogo">
                   <img :src="logoImg" alt="">
                   <h1>爱医信后台管理系统</h1>
               </div>
               <div>
                    <Button type="info" @click="getOut()">退出</Button>
               </div>
            </Header>
            <!-- 内容区 -->
            <Layout>
                <!-- 侧边栏 -->
                <Sider hide-trigger :style="{background: '#000'}">
                    <Menu ref="side_menu" :active-name="menu[0].children[0].id" theme="primary" width="auto" :open-names="[menu[0].id]" accordion>
                        <Submenu :name="item.id" v-for="item in menu" :key="item.id">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                {{item.title}}
                            </template>
                            <MenuItem :name="itemoption.id" v-for="itemoption in item.children" :key="itemoption.id" :to="itemoption.path">{{itemoption.title}}</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <!-- 主内容区 -->
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0',textAlign:'left'}">
                        <BreadcrumbItem>系统管理</BreadcrumbItem>
                        <BreadcrumbItem>用户角色</BreadcrumbItem>
                        <!-- <BreadcrumbItem>Layout</BreadcrumbItem> -->
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                       <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      logoImg: require("../assets/logo.png"),
      menu: [
        {
          title: "系统管理",
          path:'/sysmana',
          id:"01",
          children: [
            {
              title: "用户管理",
               id:"011",
               path:'/userInformation',
            },
            {
              title: "角色管理",
               id:"012",
                path:'/userRoleManagement',
            },
            {
              title: "权限管理",
               id:"013",
              path:'/authorityManagement',
            },
          ],
        },
        {
          title: "会员管理",
           id:"02",
           path:'',
          children: [
            {
              title: "患者管理",
               id:"021",
               path:'/homeUserManagement',
            },
            {
              title: "医生管理",
               id:"022",
               path:'/doctorManagement',
            },
            {
              title: "绩效审核",
               id:"023",
               path:'/performanceReview',
            },
          ],
        },
         {
          title: "咨询管理",
           id:"03",
           path:'',
          children: [
            {
              title: "新闻管理",
               id:"031",
               path:'/newsManagement',
            },
            {
              title: "通知公告",
               id:"032",
              path:'/newsNotice',
            },
            {
              title: "广告管理",
               id:"033",
               path:'/carouselMapManagement',
            },
          ],
        },
         {
          title: "商城管理",
           id:"04",
           path:'',
          children: [
            {
              title: "商品类型",
               id:"041",
               path:'/commodityTypeManagement',
            },
            {
              title: "商品管理",
               id:"042",
               path:'/commodityManagement',

            },
            {
              title: "订单管理",
               id:"043",
               path:'/orderManagement',
            },
          ],
        },
      ],
    };
  },
  
  methods:{
      getOut(){
          // 清空token 跳登录页 

          this.$router.push("/login")

      }
  }
};
</script>

<style lang="stylus" scoped>
.ui-indexHeader
    display flex 
    justify-content space-between
    align-items center 
    .ui-indexLogo
        display flex
        align-items center
        img
            width 40px
            height 40px
            margin-right 20px
        h1 
            color #fff
            font-size 20px
    

.ivu-layout
    height 100%
.ivu-menu
    height 100%
.layout{
    height:100%;
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>