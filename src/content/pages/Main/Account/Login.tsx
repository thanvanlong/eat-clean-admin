  import {Box, Container, Card, Grid, Typography, Divider, CardContent} from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import useUserApi from 'src/hooks/useUserApi';
import { UserLogin } from 'src/types/interfaces/User';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from 'src/contexts/GlobalContext';
import { useNavigate } from 'react-router';
import {Form, Input, Checkbox, Button} from "antd";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
  import {useAppDispatch} from "../../../../redux/hooks";
  import {requestLogin} from "../../../../redux/features/authSlice";

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;`
);

function Login() {
  const { login } = useUserApi();
  const navigate = useNavigate();
  const loginLocal = localStorage.getItem('login');
  const dispatch = useAppDispatch()
  const handleSubmit = (e) => {
    dispatch(requestLogin(e)).unwrap()
        .then((it) => {
          if (it.roles.includes("ROLE_ADMIN")) {
            localStorage.setItem("token", it.accessToken)
            navigate("/dashboards/overview")
          }
        })
  }


  return (
    <OverviewWrapper>
      <Helmet>
        <title>Eat Clean - Đăng Nhập</title>
      </Helmet>
      <div className={'w-full flex justify-center'}>
        <Card sx={{ p: 5, mt: 10, width: "75%", display: 'flex' }}>
          <CardContent>
            <div className={'w-full h-full flex justify-around'}>
              <div className={'w-7/12 flex flex-col items-center'}>
                <img className={'w-10/12'} src={'/5912.jpg'}/>
              </div>
              <div className={'w-5/12 h-full relative'}>
                <h1 className={'font-extrabold'}>Log In</h1>
                <Form className={'w-11/12'} onFinish={handleSubmit}>
                  <Form.Item
                      name={"email"}
                      className={'mt-9'}
                      rules={[{ required: true, message: 'Please input username!' }]}
                  >
                    <div>
                      <Input placeholder={'Enter username'} prefix={<PersonOutlineOutlinedIcon />} className={'p-1'} bordered={false} allowClear />
                      <Divider />
                    </div>
                  </Form.Item>
                  <Form.Item
                      name={"password"}
                      className={'mt-9'}
                      rules={[{ required: true, message: 'Please input password!' }]}
                  >
                    <div>
                      <Input.Password minLength={6} placeholder={'Enter password'} prefix={<LockOutlinedIcon />} className={'p-1'} bordered={false} allowClear type={'password'} />
                      <Divider />
                    </div>
                  </Form.Item>
                  <Form.Item
                      name="remember"
                      valuePropName="checked"
                      wrapperCol={{ offset: 0, span: 12 }}
                  >
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <Button type="primary" htmlType="submit" className={'w-1/2'}>
                    Login
                  </Button>
                </Form>

                <div className={'flex w-9/12 items-center absolute bottom-3'}>
                  Or login with
                  <img className={'w-1/12 ml-3'} src={'/facebook.png'}/>
                  <img className={'w-1/12 ml-1.5'} src={'/social.png'}/>
                  <img className={'w-1/12 ml-1.5'} src={'/twitter.png'}/>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </OverviewWrapper>
  );
}

export default Login;
