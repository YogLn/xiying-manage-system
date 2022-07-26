const role = parseInt(window.localStorage.getItem('role'))
export const menuList = [
  {
    MENU_KEY: '1',
    MENU_TITLE: '用户管理',
    MENU_PATH: '/main/user',
    MENU_ICON: 'icon-yonghuguanli',
    MENU_SHOW: role === 1 ? true : false
  },
  {
    MENU_KEY: '2',
    MENU_TITLE: '评论管理',
    MENU_PATH: '/main/comment',
    MENU_ICON: 'icon-pinglun',
    MENU_SHOW: role === 1 ? true : false
  },
  {
    MENU_KEY: '3',
    MENU_TITLE: '作品管理',
    MENU_PATH: '/main/work',
    MENU_ICON: 'icon-zuopin',
    MENU_SHOW: role === 1 ? true : false
  },
  {
    MENU_KEY: '4',
    MENU_TITLE: '活动管理',
    MENU_PATH: '/main/activity',
    MENU_ICON: 'icon-huodongxiangqu',
    MENU_SHOW: true,
    MENU_CHILDREN: [
      {
        MENU_KEY: '4 - 1',
        MENU_TITLE: '发布活动',
        MENU_PATH: '/main/addActivity',
        MENU_SHOW: true
      },
      {
        MENU_KEY: '4 - 2',
        MENU_TITLE: '删除活动',
        MENU_PATH: '/main/removeActivity',
        MENU_SHOW: role === 1 ? true : false
      }
    ]
  },
  {
    MENU_KEY: '5',
    MENU_TITLE: '帖子管理',
    MENU_PATH: '/main/post',
    MENU_ICON: 'icon-exe-post-primary',
    MENU_SHOW: role === 1 ? true : false
  }
]
