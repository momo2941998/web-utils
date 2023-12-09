import { PageHeader, Layout, Typography, Row, Space, Button } from 'antd'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AuthState, selectAuth, updateAuth } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { routeList } from './RouteList';
import { useEffect, useState } from 'react';
import { userService } from '../service/user';
const { Content } = Layout

export const UserInfo = () => {
  let navigate = useNavigate();
  let dispatch = useAppDispatch()
  let auth = useAppSelector(selectAuth)
  if (!auth.jwt) navigate(routeList.HOME)

  const [editInfo, setEditInfo] = useState<Pick<AuthState, 'fullname'>>({fullname: auth.fullname})
  const edited = editInfo.fullname != auth.fullname

  const getInfo = async () => {
    let res = await userService.getInfo(auth.jwt) 
    if (res) {
      dispatch(updateAuth({fullname: res.fullname, username: res.username}))
    }
  }
  useEffect(() => {
    getInfo()
  }, [])
  

  const changeInfo = async () => {
    try {
      let res = await userService.updateInfo(auth.jwt, editInfo)
      if (res) {
        dispatch(updateAuth({fullname: res.fullname, username: res.username}))
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div id='user-info-page'>
      <Typography.Title level={2}>
        Thông tin tài khoản
      </Typography.Title>
      <Content>
        <Row>
          <Space>
            <Typography.Text strong >Tên đăng nhập:</Typography.Text>
            <Typography.Text italic >{auth.username}</Typography.Text>
          </Space>
        </Row>
        <Row>
          <Space>
            <Typography.Text strong >Tên người dùng:</Typography.Text>
            <Typography.Text italic editable={{onChange:(text) => setEditInfo(prev => ({...prev, fullname: text}))}}>{editInfo.fullname}</Typography.Text>
          </Space>
        </Row>
        <Row>
          <Button disabled={!edited} danger onClick={changeInfo}>Cập nhật thông tin</Button>
        </Row>
      </Content>
    </div>
  )
}