//路由懒加载

//登入
const Login = resolve => require(['../container/manage/Login.vue'], resolve);
//404
const NotFound = resolve => require(['../container/404.vue'], resolve);
//后端导航
const Home = resolve => require(['../container/manage/Home.vue'], resolve);
//后端主界面
const Main = resolve => require(['../container/Main.vue'], resolve);
//后端三级路由
const Content = resolve => require(['../container/manage/Content.vue'], resolve);

//货物管理
//图书管理
const Book = resolve => require.ensure([], () => resolve(require('../container/manage/goods/books/Book.vue')), 'group-book');
//新增图书
const AddBook = resolve => require.ensure([], () => resolve(require('../container/manage/goods/books/AddBook.vue')), 'group-book');
//修改图书
const EditBook = resolve => require.ensure([], () => resolve(require('../container/manage/goods/books/EditBook.vue')), 'group-book');
//分类管理
const BookType = resolve => require.ensure([], () => resolve(require('../container/manage/goods/bookTypes/BookType.vue')), 'group-bookType');
//单据管理
//订单管理
const Order = resolve => require.ensure([], () => resolve(require('../container/manage/receipt/orders/Order.vue')), 'group-order');
//修改订单
const EditOrder = resolve => require.ensure([], () => resolve(require('../container/manage/receipt/orders/EditOrder.vue')), 'group-order');
//订单相关的图书
const RelateBooks = resolve => require.ensure([], () => resolve(require('../container/manage/receipt/orders/RelateBooks.vue')), 'group-order');
//回收管理
const Reclaim = resolve => require.ensure([], () => resolve(require('../container/manage/receipt/reclaim/Reclaim.vue')), 'group-reclaim');
//系统管理
//用户管理
const User = resolve => require.ensure([], () => resolve(require('../container/manage/system/user/User.vue')), 'group-user');
const AddUser = resolve => require.ensure([], () => resolve(require('../container/manage/system/user/AddUser.vue')), 'group-user');
const EditUser = resolve => require.ensure([], () => resolve(require('../container/manage/system/user/EditUser.vue')), 'group-user');
//角色管理
const Role = resolve => require.ensure([], () => resolve(require('../container/manage/system/role/Role.vue')), 'group-role');
const AddRole = resolve => require.ensure([], () => resolve(require('../container/manage/system/role/AddRole.vue')), 'group-role');
const EditRole = resolve => require.ensure([], () => resolve(require('../container/manage/system/role/EditRole.vue')), 'group-role');
//权限管理
const Purview = resolve => require.ensure([], () => resolve(require('../container/manage/system/purview/Purview.vue')), 'group-purview');
const AddPurview = resolve => require.ensure([], () => resolve(require('../container/manage/system/purview/AddPurview.vue')), 'group-purview');
const EditPurview = resolve => require.ensure([], () => resolve(require('../container/manage/system/purview/EditPurview.vue')), 'group-purview');
//日志管理
const Log = resolve => require.ensure([], () => resolve(require('../container/manage/system/log/Log.vue')), 'group-log');

//前台
const PlatForm = resolve => require(['../container/platform/Index.vue'], resolve);
const PlatForm2 = resolve => require(['../container/platform/Index2.vue'], resolve);
const PlatFormMain = resolve => require(['../container/platform/Main.vue'], resolve);
const PlatFormHotBook = resolve => require(['../container/platform/hotBook/Main.vue'], resolve);
const PlatFormCheapBook = resolve => require(['../container/platform/cheapBook/Main.vue'], resolve);
const PlatFormOnlineRetrieve = resolve => require(['../container/platform/onlineRetrieve/Main.vue'], resolve);
const PlatFormSearch = resolve => require(['../container/platform/search/Main.vue'], resolve);
const PlatFormShopping = resolve => require(['../container/platform/shopping/Main.vue'], resolve);

//个人中心
const Person = resolve => require.ensure([], () => resolve(require('../container/platform/person/Index.vue')), 'person');
const MyInfo = resolve => require.ensure([], () => resolve(require('../container/platform/person/MyInfo.vue')), 'person');
const MyPsw = resolve => require.ensure([], () => resolve(require('../container/platform/person/MyPsw.vue')), 'person');
const MyOrder = resolve => require.ensure([], () => resolve(require('../container/platform/person/MyOrder.vue')), 'person');
const MyRetrieve = resolve => require.ensure([], () => resolve(require('../container/platform/person/MyRetrieve.vue')), 'person');
const MyAdvice = resolve => require.ensure([], () => resolve(require('../container/platform/person/MyAdvice.vue')), 'person');

//登入注册
const PlatFormLogin = resolve => require.ensure([], () => resolve(require('../container/platform/user/Login.vue')), 'platform-user');
const PlatFormRegist = resolve => require.ensure([], () => resolve(require('../container/platform/user/Regist.vue')), 'platform-user');
let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/goods',
        component: Home,
        name: '货物管理',
        iconCls: 'fa fa-book',//图标样式class
		meta: {
            requireAuth: true,  // 添加该字段，true表示进入这个路由是需要登录的
        },
        redirect: '/goods/book',
		children: [
            { path: 'book', component: Content, name: '图书管理',redirect: '/goods/book/list',
	            children: [
		            { path: 'list', component: Book, name: '图书列表' },
		            { path: 'addBook', component: AddBook, name:'新增图书' },
		            { path: 'editBook', component: EditBook, name:'修改图书' },
		        ]
	        },
            { path: 'bookType', component: Content, name: '分类管理',redirect: '/goods/bookType/list',
            	children: [
		            { path: 'list', component: BookType, name: '分类列表' },
		        ]
            }
        ]
    },
    {
        path: '/receipt',
        component: Home,
        name: '单据管理',
        iconCls: 'fa fa-files-o',//图标样式class
        meta: {
            requireAuth: true,  // 添加该字段，true表示进入这个路由是需要登录的
        },
        redirect: '/receipt/order',
        children: [
            { path: 'order', component: Content, name: '订单管理',redirect: '/receipt/order/list',
            	children: [
		            { path: 'list', component: Order, name: '订单列表' },
		            { path: 'editOrder', component: EditOrder, name: '修改订单'},
		            {path: 'relateBooks', component: RelateBooks, name: '订单相关图书'}
		        ]
            },
            { path: 'reclaim', component: Content, name: '回收管理',redirect: '/receipt/reclaim/list',
            	children: [
		            { path: 'list', component: Reclaim, name: '回收列表' },
		        ]
            }
        ]
    },
    {
        path: '/system',
        component: Home,
        name: '系统管理',
        iconCls: 'el-icon-setting',//图标样式class
        meta: {
            requireAuth: true,  // 添加该字段，true表示进入这个路由是需要登录的
        },
        redirect: '/system/user',
        children: [
            { path: 'user', component: Content, name: '用户管理',redirect: '/system/user/list',
            	children:[
            		{ path: 'list', component: User, name: '用户列表' },
	            	{ path: 'addUser', component: AddUser, name: '新增用户' },
	            	{ path: 'editUser', component: EditUser, name: '编辑用户' }
            	] 
            },
            { path: 'role', component: Content, name: '角色管理',redirect: '/system/role/list',
            	children:[
            		{ path: 'list', component: Role, name: '角色列表' },
	            	{ path: 'addRole', component: AddRole, name: '新增角色' },
            		{ path: 'editRole', component: EditRole, name: '编辑角色' },
            	] 
            },
            { path: 'purview', component: Content, name: '权限管理',redirect: '/system/purview/list',
            	children:[
            		{ path: 'list', component: Purview, name: '权限列表' },
	            	{ path: 'addPurview', component: AddPurview, name: '新增权限' },
           			{ path: 'editPurview', component: EditPurview, name: '编辑权限' },
            	]
            },
            { path: 'log', component: Log, name: '日志管理' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    },
    {
        path: '/platform',
        component: PlatForm,
        hidden: true,
        meta: {
            requireAuth: false,  // 添加该字段，false表示进入这个路由是不需要登录的
        },
        redirect: '/platform/main',
        children: [
        	{ path: 'main', component: PlatFormMain,hidden:true},
        	{ path: 'hotBook', component: PlatFormHotBook,hidden:true},
        	{ path: 'cheapBook', component: PlatFormCheapBook,hidden:true},
        	{ path: 'onlineRetrieve', component: PlatFormOnlineRetrieve,hidden:true},
        	{ path: 'search', component: PlatFormSearch,hidden:true},
        ]
    },
    {
        path: '/bookStore',
        component: PlatForm2,
        hidden: true,
        meta: {
            requireAuth: false,  // 添加该字段，false表示进入这个路由是不需要登录的
        },
        redirect: '/platform/main',
        children: [
        	{ path: 'search', component: PlatFormSearch,hidden:true},
        	{ path: 'shopping', component: PlatFormShopping,hidden:true},
        	{ path: 'person', component: Person,hidden:true,redirect: '/bookStore/person/myInfo',
            	children:[
            		{ path: 'myInfo', component: MyInfo, name: '我的资料' },
            		{ path: 'myPsw', component: MyPsw, name: '修改密码' },
            		{ path: 'myOrder', component: MyOrder, name: '我的订单' },
            		{ path: 'myRetrieve', component: MyRetrieve, name: '我的回收单' },
            		{ path: 'myAdvice', component: MyAdvice, name: '咨询反馈' },
            	]
           }
        ]
    },
    {
        path: '/platFormLogin',
        component: PlatFormLogin,
        name: '',
        hidden: true,
        meta: {
            requireAuth: false,  // 添加该字段，false表示进入这个路由是不需要登录的
        },
    },
    {
        path: '/regist',
        component: PlatFormRegist,
        name: '',
        hidden: true,
        meta: {
            requireAuth: false,  // 添加该字段，false表示进入这个路由是不需要登录的
        },
    },
];

export default routes;