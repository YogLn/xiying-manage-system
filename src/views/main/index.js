import React, { memo, useState, useMemo, useCallback } from 'react'
import { Layout, Menu, Dropdown } from 'antd'
import { renderRoutes } from 'react-router-config'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import MyIcon from '@/components/icon'
import './index.less'
import { menuList } from '@/common/menu'

const Main = memo(props => {
  const { routes } = props.route
  const history = useHistory()
  const { Header, Content, Footer, Sider } = Layout
  const { SubMenu } = Menu

  const [collapsed, setCollapsed] = useState(false)
  const username = window.localStorage.getItem('username')
  const avatar = window.localStorage.getItem('avatar')

  const handleLogOut = () => {
    history.push('/login')
    window.localStorage.clear()
  }

  const renderMenu = useCallback((item, path = '') => {
    if (!item[`MENU_CHILDREN`]) {
      return (
        <Menu.Item
          key={String(item[`MENU_KEY`])}
          icon={<MyIcon type={item[`MENU_ICON`]} />}
        >
          {item.MENU_SHOW && (
            <Link to={item[`MENU_PATH`]}>{item[`MENU_TITLE`]}</Link>
          )}
        </Menu.Item>
      )
    }
    return (
      <SubMenu
        key={String(item[`MENU_KEY`])}
        title={item[`MENU_TITLE`]}
        icon={<MyIcon type={item[`MENU_ICON`]} />}
      >
        {item[`MENU_CHILDREN`].map(i =>
          renderMenu(i, path + item[`MENU_PATH`])
        )}
      </SubMenu>
    )
  }, [])

  const menuComponent = useMemo(
    () =>
      menuList &&
      menuList.map(item => {
        if (item.MENU_SHOW) {
          return renderMenu(item, '')
        } else return null
      }),
    [renderMenu]
  )

  const userMenu = (
    <Menu>
      <Menu.Item key="login-out" onClick={() => handleLogOut()}>
        退出登录
      </Menu.Item>
    </Menu>
  )
  return (
    <div className="container">
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
          theme="light"
          className="sider"
        >
          <div className="logo">西 影</div>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="light"
          >
            {menuComponent}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="header">
            <div className="user-info">
              <Dropdown overlay={userMenu} placement="bottomCenter">
                <div className="info">
                  <img
                    src={
                      avatar === 'null' || 'undefined'
                        ? 'https://blog-1304388092.cos.ap-chengdu.myqcloud.com/avatar.jpg'
                        : avatar
                    }
                    alt=""
                  />
                  <span className="username">{username ?? ''}</span>
                </div>
              </Dropdown>
            </div>
          </Header>
          <Content className="content">{renderRoutes(routes)}</Content>
          <Footer className="footer">
            西华大学2018级毕业设计 西影后台管理系统
          </Footer>
        </Layout>
      </Layout>
    </div>
  )
})

export default Main
