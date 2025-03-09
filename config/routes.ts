export default [
  { path: '/', redirect: '/welcome' }, // 确保 `/` 直接跳转
  { path: '/welcome', name: 'Welcome', icon: 'smile', component: './Welcome' },

  {
    path: '/user',
    layout: false,
    routes: [
      { name: 'Login', path: '/user/login', component: './User/Login' },
      { name: 'Register', path: '/user/register', component: './User/Register' },
    ],
  },

  {
    path: '/admin',
    name: 'Admin Page',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      { path: '/admin/user-manage', name: 'User Management', icon: 'smile', component: './Admin/UserManage' },
      { path: '*', component: './404' }, // 确保 404 规则生效
    ],
  },

  // { name: 'Enquiry Form', icon: 'table', path: '/list', component: './TableList' },
  { path: '*', layout: false, component: './404' }, // 全局 404 处理放在最后
];

