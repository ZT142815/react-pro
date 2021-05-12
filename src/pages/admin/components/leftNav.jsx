import React, { useEffect, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import menuList from '../../../config/configMenu';
import { AppCreateContext, createContextAction } from '../../../containers/App/context';
import {
  HomeOutlined,
  AppstoreOutlined,
  BarsOutlined,
  ToolOutlined,
  UserOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  WindowsOutlined,
  PieChartOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;

const LeftNav = (props) => {
  const AppVaribleContext = useContext(AppCreateContext);
  // 默认选中节点
  let selectKeys = props.location.pathname;
  if(selectKeys.indexOf('/product')===0) {
    selectKeys = '/product'
  }
  let openKeys;

  useEffect(() => {
    menuClick()
  }, [])

  // 获取默认展开的节点
  menuList.map((item) => {
    if (item.children) {
      const cItem = item.children.find(cItem => selectKeys.indexOf(cItem.key) === 0);
      if (cItem) {
        openKeys = item.key;
      }
    }
  })

  const getMenuNode = (menuList) => {
    return menuList.map((item) => {
      const icon = getIcon(item.icon);
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={icon} >
            <Link to={item.key} >
              {item.title}
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu key={item.key} title={item.title} icon={icon} >
            {getMenuNode(item.children)}
          </SubMenu>
        )
      }
    })
  }

  const menuClick = (e) => {
    const path = e ? e.key : selectKeys;
    const getTitleHandle = (menuList) => {
      menuList.map((item) => {
        if (item.children) {
          getTitleHandle(item.children);
        } else {
          if (item.key === path) {
            AppVaribleContext.dispatch(
              createContextAction(
                {
                  selectTitle: item.title,
                }
              )
            )
          }
        }
      })
    };
    getTitleHandle(menuList);
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div className='left-nav-top' >
        <div className='g-learn-admin-logo top-logo'></div>
        <div>硅谷后台</div>
      </div>
      <div>
        <Menu
          defaultOpenKeys={[openKeys]}
          selectedKeys={[selectKeys]}
          mode="inline"
          theme="dark"
          onClick={menuClick}
        >
          {getMenuNode(menuList)}
        </Menu>
      </div>
    </div>
  )
}

export default withRouter(LeftNav);

const getIcon = (icon) => {
  switch (icon) {
    case 'HomeOutlined':
      return <HomeOutlined />
    case 'AppstoreOutlined':
      return <AppstoreOutlined />
    case 'BarsOutlined':
      return <BarsOutlined />
    case 'ToolOutlined':
      return <ToolOutlined />
    case 'UserOutlined':
      return <UserOutlined />
    case 'WindowsOutlined':
      return <WindowsOutlined />
    case 'AreaChartOutlined':
      return <AreaChartOutlined />
    case 'BarChartOutlined':
      return <BarChartOutlined />
    case 'LineChartOutlined':
      return <LineChartOutlined />
    case 'PieChartOutlined':
      return <PieChartOutlined />

    default:
      break;
  }
}

