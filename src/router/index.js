import Vue from 'vue'
import VueRouter from 'vue-router'



// import home from ''

Vue.use(VueRouter)

const routes = [

  //登录进入的首页
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/home/index.vue'),
    // component: resolve => require(['@/components/home/index.vue'], resolve)
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/login')
    // component: resolve => require(['../components/login'], resolve)
  },

  {
    path: '/SystemSettings',
    name: 'SystemSettings',
    component: () => import('../components/SystemSettings')
    // component: resolve => require(['../components/SystemSettings'], resolve)
  },
  {
    path: '/FireManagement',
    name: 'FireManagement',
    component: () => import('../components/FireManagement')
    // component: resolve => require(['../components/FireManagement'], resolve)
  },
  {
    //隐患进度整改
    path: '/FireInternetOfThings',
    name: 'FireInternetOfThings',
    component: () => import('@/components/FireInternetOfThings'),
    // component: resolve => require(['@/components/FireInternetOfThings'], resolve),

    children: [
      //电气火灾隐患
      {
        path: 'electricalFire',
        name: 'electricalFire',
        component: () => import('@/components/FireInternetOfThings/dianqiHZ'),
        // component: resolve => require(['@/components/FireInternetOfThings/dianqiHZ'], resolve),
      },

      //消防水系统
      {
        path: 'FireWaterSystem',
        name: 'FireWaterSystem',
        component: () => import('@/components/FireInternetOfThings/xiaofangshui'),
        // component: resolve => require(['@/components/FireInternetOfThings/xiaofangshui'], resolve),
      },
      //火灾报警系统
      {
        path: 'FireAlarmSystem',
        name: 'FireAlarmSystem',
        component: () => import('@/components/FireInternetOfThings/huozaiBJ'),
      },
      //重点部位
      {
        path: 'KeyParts',
        name: 'KeyParts',
        component: () => import('@/components/FireInternetOfThings/zhongdianBW'),
      },
      //智慧独立烟感
      {
        path: 'SmartIndependentSmoke',
        name: 'SmartIndependentSmoke',
        component: () => import('@/components/FireInternetOfThings/yanganDL'),
      },
      // 燃气探测器
      {
        path: 'GasDetector',
        name: 'GasDetector',
        component: () => import('@/components/FireInternetOfThings/ranqiTC'),
      },
      // 应急处理
      {
        path: 'EmergencyManagement',
        name: 'EmergencyManagement',
        component: () => import('@/components/FireInternetOfThings/yinjiCL'),
      },
      //智慧消防报警
      {
        path: 'IntelligentFireAlarm',
        name: 'IntelligentFireAlarm',
        component: () => import('@/components/FireInternetOfThings/xiaofangBJ'),
      },
      //灭火器
      {
        path: 'FireExtinguisher',
        name: 'FireExtinguisher',
        component: () => import('@/components/FireInternetOfThings/meihuoqi'),
      },
      //电力检测
      {
        path: 'PowerDetection',
        name: 'PowerDetection',
        component: () => import('@/components/FireInternetOfThings/dianliJC'),
      },
      {
        path: 'Panorama',
        name: 'Panorama',
        component: () => import('@/components/FireInternetOfThings/shebeidingwei'),
      },
      {
        path: 'GasBottlePressureDetection',
        name: 'GasBottlePressureDetection',
        component: () => import('@/components/FireInternetOfThings/GasBottlePressureDetection'),
      },

    ],


  },


]

const router = new VueRouter({
  routes,
  // mode: 'history',
  base: '/MingAn1',
})
router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem("userName");
  // console.log(token, 987654321)
  // console.log(to.name, 990, from, 6545, next)
  if (token) {
    next()
  } else {
    //如果没有登录你访问的不是login就让你强制跳转到login页面
    if (to.path !== "/login") {
      // this.$message.error('您还未登录账号')
      next({ path: "/login" });
    } else {
      next();
    }
  }

});
// router.onError((error) => {
//   const pattern = /Loading chunk (\d)+ failed/g;
//   const isChunkLoadFailed = error.message.match(pattern);
//   if (isChunkLoadFailed) {
//     // 用路由的replace方法，并没有相当于F5刷新页面，失败的js文件并没有从新请求，会导致一直尝试replace页面导致死循环，而用 location.reload 方法，相当于触发F5刷新页面，虽然用户体验上来说会有刷新加载察觉，但不会导致页面卡死及死循环，从而曲线救国解决该问题
//     // location.reload();
//     // const targetPath = $router.history.pending.fullPath;
//     // $router.replace(targetPath);
//     router.replace(targetPath);
//   }

// });

export default router
