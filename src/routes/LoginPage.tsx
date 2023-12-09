import logo from "../image/logoMobifone.png"
import { useAppSelector } from "../app/hooks"; 
import { Navigate, useLocation } from "react-router";
import { selectAuth } from "../features/authSlice";
import { useAppDispatch } from '../app/hooks'
import { signin } from "../features/authSlice";
import { Button, Col, Form, Image, Input, Row, Space, Spin, Typography, notification } from "antd";
import { useEffect, useState } from "react";
import { userLogin } from "../service";
import { routeList } from "./RouteList";
import { StateLocation } from "../types/router";

const defaultRoute = routeList.HOME

export function LoginPage() {
  let dispatch = useAppDispatch()
  let location = useLocation();
  console.log(location)
  let auth = useAppSelector(selectAuth)

  let state = location.state as StateLocation
  let from = state?.from.pathname || defaultRoute
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    return () => {
      setIsPending(false)
    }
  }, [])
  

  const onFinish = (values: {username: string, password: string}) => {
    const { username, password } = values;
    setIsPending(true)
    console.log("hihi")
    userLogin(username, password)
      .then((resLogin) => {
          setIsPending(false)
          dispatch(signin({
            username: resLogin.username,
            jwt: resLogin.jwt,
            fullname: resLogin.fullname
          }))
      })
      .catch((error: Error) => {
        notification.error({
          message: "Lỗi đăng nhập",
          duration: 3
        })
      })
      .finally(() => {
        setIsPending(false)
      })
  };
  const onFinishFailed = (errorInfo: any) => {
    console.error('Failed:', errorInfo);
  };

  if (!auth.username) {
    return (
    <Row>
      <Col offset={4} span={16} >
        <div style={{ textAlign: 'center', marginTop: '1em'}}>
          <Image src={logo} />
        </div>
      </Col>
      <Col offset={8} span={8} >

          <Form
            style={{ padding: '32px 0 32px 0', margin: '32px 0 32px 0', border: 'solid 1px', borderRadius: '32px'}}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 12,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
          <div style={{textAlign: 'center', marginBottom: '64px'}}>
          <Typography.Title level={1}>
            Đăng nhập
          </Typography.Title>
          </div>
            <Form.Item
              label="Email"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button 
                type="primary" 
                htmlType="submit"
                disabled={isPending}
              >
                <Space >
                  Đăng nhập
                  {isPending && <Spin />}
                </Space>
              </Button>
            </Form.Item>
          </Form>
      </Col>
    </Row>
    );
  } else {
    return <Navigate to={from} />
  }
}