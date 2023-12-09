import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { routeList } from './RouteList'
export const Page403 = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary" onClick={() => navigate(routeList.HOME)}>Back Home</Button>}
      />
    </div>
  )
}
