import React, { memo, useState, useMemo, useCallback } from 'react'
import { Layout, Menu, Dropdown } from 'antd'
import { renderRoutes } from 'react-router-config'
import { Link } from 'react-router-dom'
import MyIcon from '@/components/icon'
import './index.less'
import { menuList } from '@/common/menu'

const Main = memo(props => {
  const { routes } = props.route
  const { Header, Content, Footer, Sider } = Layout
  const { SubMenu } = Menu
  const [collapsed, setCollapsed] = useState(false)

  const renderMenu = useCallback((item, path = '') => {
    if (!item[`MENU_CHILDREN`]) {
      return (
        <Menu.Item
          key={String(item[`MENU_KEY`])}
          icon={<MyIcon type={item[`MENU_ICON`]} />}
        >
          <Link to={item[`MENU_PATH`]}>{item[`MENU_TITLE`]}</Link>
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
        return renderMenu(item, '')
      }),
    [renderMenu]
  )

  const userMenu = (
    <Menu>
      <Menu.Item key="login-out">退出登录</Menu.Item>
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
                    src="https://blog-1304388092.cos.ap-chengdu.myqcloud.com/avatar.jpg"
                    alt=""
                  />
                  <span className="username">用户名</span>
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
