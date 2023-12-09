import { Button, Space, Dropdown, Menu, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthState, selectAuth } from "../../features/authSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { routeList } from "../../routes/RouteList";
import { SettingOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next'

export function AuthStatus() {
  let { t } = useTranslation()
  let location = useLocation();
  let navigate = useNavigate();
  let auth = useAppSelector(selectAuth)
  if (location.pathname === routeList.LOGIN) {
    return (<Space />)
  }

  const menu: MenuProps = {
    items: [
      {
        key: 'user-info',
        label: t("authStatus.detail"),
        onClick: () => navigate(routeList.USER_INFO),
      },
      {
        key: 'logout',
        label: t("authStatus.logout"),
        onClick: () => navigate(routeList.LOGOUT)
      }
    ]
  }
  if (!auth.jwt) return null
  return (
    <Space id="auth-status">
      <span className="hello-user" >{t('authStatus.hello')}</span>
      <span id="display-name-user" className="hello-user" >
        {auth.fullname}
      </span>
      <Dropdown menu={menu}>
        <Button
          icon={<SettingOutlined />}
        >
        </Button>
      </Dropdown>
      {" "}
    </Space>
  );
}