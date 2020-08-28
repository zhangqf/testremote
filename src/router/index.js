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
        meta:{index:0},
        component:() => import("../components/userInformation/userInformation.vue"),
      },
      {
        path:'/userInformation',
        name:'UserInformation',
        meta:{index:1},
        component:() => import("../components/userInformation/userInformation.vue"),
      },
      {
        path:'/userRoleManagement',
        name:'UserRoleManagement',
        meta:{index:2},
        component:() => import("../components/userRoleManagement/userRoleManagement.vue"),
      },
      {
        path:'/authorityManagement',
        name:'AuthorityManagement',
        meta:{index:3},
        component:() => import("../components/authorityManagement/authorityManagement.vue"),
      },
      // 会员管理
      {
        path:'/homeUserManagement',
        name:'HomeUserManagement',
        meta:{index:4},
        component:() => import("../components/homeUserManagement/homeUserManagement.vue"),
      },
      {
        path:'/doctorManagement',
        name:'DoctorManagement',
        meta:{index:5},
        component:() => import("../components/doctorManagement/doctorManagement.vue"),
      },
      {
        path:'/performanceReview',
        name:'PerformanceReview',
        meta:{index:6},
        component:() => import("../components/performanceReview/performanceReview.vue"),
      },
      // 新闻公告管理
      {
        path:'/newsManagement',
        name:'NewsManagement',
        meta:{index:7},
        component:() => import("../components/newsManagement/newsManagement.vue"),
      },
      {
        path:'/newsNotice',
        name:'NewsNotice',
        meta:{index:8},
        component:() => import("../components/newsNotice/newsNotice.vue"),
      },
      {
        path:'/carouselMapManagement',
        name:'CarouselMapManagement',
        meta:{index:9},
        component:() => import("../components/carouselMapManagement/carouselMapManagement.vue"),
      },
      // 商城管理
      {
        path:'/commodityTypeManagement',
        name:'CommodityTypeManagement',
        meta:{index:10},
        component:() => import("../components/commodityTypeManagement/commodityTypeManagement.vue"),
      },
      {
        path:'/commodityManagement',
        name:'CommodityManagement',
        meta:{index:11},
        component:() => import("../components/commodityManagement/commodityManagement.vue"),
      },
      {
        path:'/orderManagement',
        name:'OrderManagement',
        meta:{index:12},
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
