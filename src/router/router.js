const rootRouter = [
	{
		key: 'home',
		name: '首页',
		path: '/home',
		components: () => import('@views/home/index'),
	},
	{
		key: 'login',
		name: '登录',
		path: '/login',
		components: () => import('@views/login/index'),
	},
];

const contentRouter = [
	{
		key: 'data',
		name: '数据监控',
		path: '/home/data',
		icon: '',
		showMenu: true,
		components: () => import('@views/data/index'),
	},

	{
		key: 'swiper',
		name: '轮播图',
		path: '/home/swiper',
		icon: '',
		showMenu: true,
		components: () => import('@views/swiper/index'),
	},
	{
		key: 'user',
		name: '用户管理',
		path: '/home/user',
		icon: '',
		showMenu: true,
		components: () => import('@views/user/index'),
	},
	{
		key: 'type',
		name: '课程类别管理',
		path: '/home/type',
		icon: '',
		showMenu: true,
		components: () => import('@views/type/index'),
	},
	{
		key: 'subject',
		name: '课程管理',
		path: '/home/subject',
		icon: '',
		showMenu: true,
		components: () => import('@views/subject/index'),
	},
	{
		key: 'cabinet',
		name: '内容管理',
		path: '/home/content',
		icon: '',
		showMenu: true,
		components: () => import('@views/content/index'),
	},
	{
		key: 'shop',
		name: '区域管理',
		path: '/home/area',
		icon: '',
		showMenu: true,
		components: () => import('@views/address/index'),
	},
	{
		key: 'opinion',
		name: '意见和反馈',
		path: '/home/opinion',
		icon: '',
		showMenu: true,
		components: () => import('@views/opinion/index'),
	},
];

export default { rootRouter, contentRouter };
