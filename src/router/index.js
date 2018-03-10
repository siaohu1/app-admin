import Vue from 'vue'
import Router from 'vue-router'
import { format } from 'path';

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const superadmin = r => require.ensure([], () => r(require('@/page/superadmin')), 'superadmin');
//币列表页面
const currency = r => require.ensure([], () => r(require('@/page/currencymarket/currency')), 'currency');//币列表侧边栏
const waitcomplete = r => require.ensure([], () => r(require('@/page/currencymarket/waitcomplete')), 'waitcomplete');
const all = r => require.ensure([], () => r(require('@/page/currencymarket/all')), 'all');
const iconmanage = r => require.ensure([], () => r(require('@/page/currencymarket/iconmanage')), 'iconmanage');
const taglist = r => require.ensure([], () => r(require('@/page/currencymarket/taglist')), 'taglist');
const industry = r => require.ensure([], () => r(require('@/page/currencymarket/industry')), 'industry');
//币圈页面
const groupHome = r => require.ensure([], () => r(require('@/page/currencygroup/groupHome')), 'groupHome');//币圈侧边栏
const abnormal = r => require.ensure([], () => r(require('@/page/currencygroup/abnormal')), 'abnormal');//异常处理
const groupList = r => require.ensure([], () => r(require('@/page/currencygroup/groupList')), 'groupList');//圈子列表
const waitcomplain = r => require.ensure([], () => r(require('@/page/currencygroup/waitcomplain')), 'waitcomplain');//投诉处理-未处理
const complainok = r => require.ensure([], () => r(require('@/page/currencygroup/complainok')), 'complainok');//投诉处理——衣已处理
//币活动页面
const carousel = r => require.ensure([], () => r(require('@/page/currencyactive/carousel')), 'carousel');//币活动——轮播图
const cityManage = r => require.ensure([], () => r(require('@/page/currencyactive/cityManage')), 'cityManage');//城市管理
const examineList = r => require.ensure([], () => r(require('@/page/currencyactive/examineList')), 'examineList');//审核列表
const activeHome = r => require.ensure([], () => r(require('@/page/currencyactive/activeHome')), 'activeHome');//币活动首页

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/home',
		component: home
	},
	{
		path: '/superadmin',
		component: superadmin
	},
	{
		path: '/currency',
		component: currency,
		name: '',
		children: [{
			path: '/waitcomplete',
			component: waitcomplete,

		},
		{
			path: '/all',
			component: all,

		},
		{
			path: '/iconmanage',
			component: iconmanage,
		
		},{
			path: '/taglist',
			component: taglist,

		},{
			path: '/industry',
			component: industry,

		},
	]
	},
	{
		path: '/groupHome',
		component: groupHome,
		name: '',
		children: [{
			path: '/groupList',
			component: groupList,

		},
		{
			path: '/abnormal',
			component: abnormal,

		},
		{
			path: '/waitcomplain',
			component: waitcomplain,

		},
		{
			path: '/complainok',
			component: complainok,

		}
	]
	},
	{
		path: '/activeHome',
		component: activeHome,
		name: '',
		children: [{
			path: '/carousel',
			component: carousel,
		
		},
		{
			path: '/cityManage',
			component: cityManage,
			
		},
		{
			path: '/examineList',
			component: examineList,
		
		}
	]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
	
})
// router.beforeEach((to, from, next) => {
//     if (to.meta.login) { //判断是否需要登录权限
//         if (token) {
//            alert('有token！')
//         }
//         else {
//           alert('没有token!')
//         }npm 
//     }
//     else {
//         next();
//     }
// })

// export default router;

