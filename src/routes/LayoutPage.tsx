import logo from '../image/logoMobifone.png'
import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import { AuthStatus } from '../components/auth';
import { useState } from 'react';
import { UserOutlined, LineChartOutlined, HomeOutlined, RightOutlined, CaretRightOutlined, WhatsAppOutlined, FileSyncOutlined, TableOutlined, YoutubeOutlined } from '@ant-design/icons';
import { routeList } from './RouteList';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectRouter, updateSelectedKeys } from '../features/routerSlice';
import { selectAuth } from '../features/authSlice';
import jwt_decode from "jwt-decode";
import { JwtInfo, UserRole } from '../types';
const { Header, Content, Sider } = Layout
export function LayoutPage() {
  const [collapsed, setCollapsed] = useState(false)
  const selectedKeys = useAppSelector(selectRouter).selectedKeys
  const dispatch = useAppDispatch()
  const authJwt = useAppSelector(selectAuth).jwt
  const handleCollase = () => {
    setCollapsed(old => !old)
  }
  const handleSelect = (info: any) => {
    dispatch(updateSelectedKeys([info.key]))
  }
  let menuItems: ItemType[] = []
  if (authJwt) {
    try {
      var decoded: JwtInfo = jwt_decode(authJwt);
      if (decoded.role) {
        menuItems = getMenuItemsForRole(UserRole.USER)
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible collapsed={collapsed} onCollapse={handleCollase}>
      <div className="logo">
        <Link to={routeList.HOME}>
          <img src = {logo} alt="Logo" />
        </Link>
      </div>
      <Menu theme="dark" mode="inline" selectedKeys={selectedKeys} onSelect={handleSelect} items={menuItems} />
    </Sider>
    <Layout className="site-layout">
      <Header className="site-layout-header" style={{ padding: 0 }} >
        <AuthStatus />
      </Header>
      <Content id='my-content' style={{ margin: '16px 16px' }}>
        <Outlet />
      </Content>
    </Layout>
  </Layout>
  );
}

const getMenuItemsForRole = (role: UserRole) => {
  let menuItems: ItemType[] = []
  console.log(role)
  switch (role) {
    case UserRole.USER:
      menuItems = [
        {
          key: routeList.HOME,
          icon: <HomeOutlined />,
          label: <Link to={routeList.HOME}>Trang chủ</Link>,
        },
        {
          key: routeList.YOUTUBE_VIDEO,
          icon: <YoutubeOutlined />,
          label: <Link to={routeList.YOUTUBE_VIDEO} > Youtube Video</Link>
        }
      ]
      break;
    case UserRole.ADMIN:
      menuItems = [
        {
          key: routeList.HOME,
          icon: <HomeOutlined />,
          label: <Link to={routeList.HOME}>Trang chủ</Link>,
        },
      ]
      break;
    case UserRole.SP_ADMIN:
      menuItems = [
        {
          key: routeList.HOME,
          icon: <HomeOutlined />,
          label: <Link to={routeList.HOME}>Trang chủ</Link>,
        },
      ]
      break;
    default:
      break;
    }
  return menuItems;
} 