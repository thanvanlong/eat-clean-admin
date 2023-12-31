import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Footer from 'src/components/Footer';

import RecentOrders from '../Transactions/RecentOrders';
import UserCard from './UserCard';
import {
  Form,
  Input,
  Modal,
  Button,
  Upload,
  message,
  Select,
  InputNumber,
  DatePicker
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import TextArea from 'antd/es/input/TextArea';
import ImgCrop from 'antd-img-crop';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { listUser } from 'src/redux/features/authSlice';
import { RootState } from 'src/redux/store';
import { IUser } from 'src/interfaces';

function ApplicationsUsers() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      listUser({
        page: 0,
        limit: 100
      })
    );
  }, []);

  const data = useAppSelector((root: RootState) => root.auth);
  return (
    <>
      <Helmet>
        <title>Manage - Users</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <div className={'w-full grid grid-cols-4 gap-4'}>
        {data.users?.length > 0 ? (
          data.users.map((user: IUser) => {
            return <UserCard user={user}></UserCard>;
          })
        ) : (
          <></>
        )}
      </div>

      <Modal
        open={false}
        centered={true}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <Button form={'user-form'} type="primary" htmlType="submit">
              Submit
            </Button>
          </>
        )}
      >
        <Form
          id={'user-form'}
          onFinish={(value: any) => {
            console.log(value);
          }}
        >
          <div className={'w-full'}>
            <Typography fontWeight={'bold'}>Email</Typography>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input email!' }]}
            >
              <Input
                allowClear
                type={'email'}
                className={'p-2 mt-1'}
                placeholder={'Enter email'}
              />
            </Form.Item>
          </div>
          <div className={'w-full'}>
            <Typography fontWeight={'bold'}>Username</Typography>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input username!' }]}
            >
              <Input
                allowClear
                className={'p-2 mt-1'}
                placeholder={'Enter username'}
              />
            </Form.Item>
          </div>
          <div className={'w-full'}>
            <Typography fontWeight={'bold'}>Password</Typography>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input password!' }]}
            >
              <Input.Password
                allowClear
                className={'p-2 mt-1'}
                placeholder={'Enter password'}
              />
            </Form.Item>
          </div>
          <div className={'w-full'}>
            <Typography fontWeight={'bold'}>Address</Typography>
            <Form.Item
              name="address"
              rules={[{ required: false, message: 'Please input address!' }]}
            >
              <Input
                allowClear
                className={'p-2 mt-1'}
                placeholder={'Enter address'}
              />
            </Form.Item>
          </div>
          <div className={'w-full'}>
            <Typography fontWeight={'bold'}>Phone</Typography>
            <Form.Item
              name="phone"
              rules={[{ required: false, message: 'Please input phone!' }]}
            >
              <Input
                allowClear
                className={'p-2 mt-1'}
                placeholder={'Enter phone'}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
      <Footer />
    </>
  );
}

export default ApplicationsUsers;
