import { Button, Space, Typography } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectAuth } from '../features/authSlice'
import { routeList } from './RouteList'
import { useTranslation } from 'react-i18next'



export const Welcome = () => {
  let { t } = useTranslation()
  let auth = useAppSelector(selectAuth)
  let navigate = useNavigate();
  
  return (
    <div>
      <Typography.Title level={4}>{t("welcome.welcomeText")}</Typography.Title>
      <Typography.Text>
        <Space>
          {!auth.jwt && (
            <>
              {t("welcome.goLogin")}
              <Button onClick={() => navigate(routeList.LOGIN)}>{t("welcome.loginButton")}</Button>
            </>
          )}
        </Space>
      </Typography.Text>
    </div>
  )
}
