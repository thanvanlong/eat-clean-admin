import {Box, Container, Card, Grid, Typography, Divider, CardContent} from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import FormInput from 'src/components/Input/FormInput';
import useUserApi from 'src/hooks/useUserApi';
import { UserLogin } from 'src/types/interfaces/User';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from 'src/contexts/GlobalContext';
import _ from 'lodash';
import { useNavigate } from 'react-router';
import { LoadingButton } from '@mui/lab';
import { UserRole } from 'src/types/enums/UserRole';
import {Form, Input, Checkbox, Button} from "antd";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from "@mui/material/TextField";

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`
);

const MuiAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const TsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #dfebf6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;`
);

function Login() {
  const { handleSubmit, control } = useForm();
  const { login } = useUserApi();
  const { setGError, setLoginUser } = useContext(GlobalContext);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const navigate = useNavigate();
  const loginLocal = localStorage.getItem('login');

  useEffect(() => {
    if (loginLocal) {
      window.location.reload();
    }
  }, [loginLocal]);

  const submit = (data: UserLogin) => {
    setLoadingBtn(true);
    login(data)
      .then((response) => {

      })
      .catch((e) => console.log(e));
  };

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
                <a href={'/'}>
                  <h4 className={'underline text-gray-700'}>Create new account</h4>
                </a>
              </div>
              <div className={'w-5/12 h-full relative'}>
                <h1 className={'font-extrabold'}>Log In</h1>
                <Form className={'w-11/12'}>
                  <Form.Item
                      name={"username"}
                      className={'mt-9'}
                      rules={[{ required: true, message: 'Please input username!' }]}
                  >
                    <div>
                      <Input placeholder={'Enter username'} prefix={<PersonOutlineOutlinedIcon />} className={'p-1'} bordered={false} allowClear />
                      <Divider />
                    </div>
                  </Form.Item>
                  <Form.Item
                      name={"pass"}
                      className={'mt-9'}
                      rules={[{ required: true, message: 'Please input password!' }]}
                  >
                    <div>
                      <Input.Password minLength={8} placeholder={'Enter password'} prefix={<LockOutlinedIcon />} className={'p-1'} bordered={false} allowClear type={'password'} />
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
