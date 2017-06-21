//路由懒加载

//登入
const Login = resolve => require(['../container/manage/Login.vue'], resolve);
//404
const NotFound = resolve => require(['../container/404.vue'], resolve);
//后端导航
const Home = resolve => require(['../container/manage/Home.vue'], resolve);
//后端主界面
const Main = resolve => require(['../container/Main.vue'], resolve);
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
const EditOrder = resolve => require.ensure([], () => resolve(require('../container/manage/receipt/orders/EditOrder.vue')), 'group-order');
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
const HomePlatForm = resolve => require(['../container/platform/Home.vue'], resolve);
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
        path: '/',
        component: Home,
        name: '货物管理',
        iconCls: 'fa fa-book',//图标样式class
        children: [
            { path: '/goods/book', component: Book, name: '图书管理' },
            { path: '/goods/book/addBook', component: AddBook, name:'新增图书', hidden: true },
            { path: '/goods/book/editBook', component: EditBook, name:'修改图书', hidden: true },
            { path: '/goods/bookType', component: BookType, name: '分类管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '单据管理',
        iconCls: 'fa fa-files-o',//图标样式class
        children: [
            { path: '/receipt/order', component: Order, name: '订单管理' },
            { path: '/receipt/order/editOrder', component: EditOrder, name: '修改订单',hidden: true },
            { path: '/receipt/reclaim', component: Reclaim, name: '回收管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统管理',
        iconCls: 'el-icon-setting',//图标样式class
        children: [
            { path: '/system/user', component: User, name: '用户管理' },
            { path: '/system/user/addUser', component: AddUser, name: '新增用户',hidden: true },
            { path: '/system/user/editUser', component: EditUser, name: '编辑用户',hidden: true },
            { path: '/system/role', component: Role, name: '角色管理' },
            { path: '/system/role/addRole', component: AddRole, name: '新增角色',hidden: true },
            { path: '/system/role/editRole', component: EditRole, name: '编辑角色',hidden: true },
            { path: '/system/purview', component: Purview, name: '权限管理' },
            { path: '/system/purview/addPurview', component: AddPurview, name: '新增权限',hidden: true },
            { path: '/system/purview/editPurview', component: EditPurview, name: '编辑权限',hidden: true },
            { path: '/system/log', component: Log, name: '日志管理' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    },
    {
        path: '/homePlatForm',
        component: HomePlatForm,
        children: [
        ]
    },
];

export default routes;
