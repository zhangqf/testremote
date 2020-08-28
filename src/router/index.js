import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login',
    component: () => import(/* webpackChunkName: "about" */ '../components/login/login.vue'),
    
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../components/login/login.vue')
  },
  {
    path: '/index',
    
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Index.vue'),
    children:[
      // 系统管理
      {
        path:'/',
        redirect:'/userInformation',
        component:() => import("../components/userInformation/userInformation.vue"),
      },
      {
        path:'/userInformation',
        name:'UserInformation',
        component:() => import("../components/userInformation/userInformation.vue"),
      },
      {
        path:'/userRoleManagement',
        name:'UserRoleManagement',
        component:() => import("../components/userRoleManagement/userRoleManagement.vue"),
      },
      {
        path:'/authorityManagement',
        name:'AuthorityManagement',
        component:() => import("../components/authorityManagement/authorityManagement.vue"),
      },
      // 会员管理
      {
        path:'/homeUserManagement',
        name:'HomeUserManagement',
        component:() => import("../components/homeUserManagement/homeUserManagement.vue"),
      },
      {
        path:'/doctorManagement',
        name:'DoctorManagement',
        component:() => import("../components/doctorManagement/doctorManagement.vue"),
      },
      {
        path:'/performanceReview',
        name:'PerformanceReview',
        component:() => import("../components/performanceReview/performanceReview.vue"),
      },
      // 新闻公告管理
      {
        path:'/newsManagement',
        name:'NewsManagement',
        component:() => import("../components/newsManagement/newsManagement.vue"),
      },
      {
        path:'/newsNotice',
        name:'NewsNotice',
        component:() => import("../components/newsNotice/newsNotice.vue"),
      },
      {
        path:'/carouselMapManagement',
        name:'CarouselMapManagement',
        component:() => import("../components/carouselMapManagement/carouselMapManagement.vue"),
      },
      // 商城管理
      {
        path:'/commodityTypeManagement',
        name:'CommodityTypeManagement',
        component:() => import("../components/commodityTypeManagement/commodityTypeManagement.vue"),
      },
      {
        path:'/commodityManagement',
        name:'CommodityManagement',
        component:() => import("../components/commodityManagement/commodityManagement.vue"),
      },
      {
        path:'/orderManagement',
        name:'OrderManagement',
        component:() => import("../components/orderManagement/orderManagement.vue"),
      },

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
