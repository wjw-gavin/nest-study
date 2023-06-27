export interface Menu {
  id: string
  name: string
  path?: string
  icon?: string
  children?: Menu[]
}

export const menus: Menu[] = [
  {
    id: 'home',
    name: '首页',
    icon: 'HomeFilled',
    path: '/home'
  },
  {
    id: 'base',
    name: '基础管理',
    icon: 'Management',
    children: [
      {
        id: 'article',
        name: '文章管理',
        path: '/base/article'
      }
    ]
  },
  {
    id: 'system',
    name: '系统管理',
    icon: 'Platform',
    children: [
      {
        id: 'user',
        name: '用户管理',
        path: '/system/user'
      },
      {
        id: 'role',
        name: '角色管理',
        path: '/system/role'
      }
    ]
  }
]
