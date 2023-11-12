import React, { useState } from 'react';
import { Card, CardContent, Avatar, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Button, Form, Input, Modal } from 'antd';
import { User } from '../../../../../../models/user';
import { IUser } from 'src/interfaces';
import {useAppDispatch} from "../../../../../../redux/hooks";
import {deleteUser, listUser, updateUser} from "../../../../../../redux/features/authSlice";

interface Props {
  user: IUser;
}

function UserCard({ user }: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  console.log(user)
  const dispatch = useAppDispatch()
  const handleSubmit = (e) => {
    dispatch(updateUser(e )).then(() => {
      setOpenModal(false)
      dispatch(
          listUser({
            page: 0,
            limit: 100
          })
      );
    })
  }

  const handleDelete = () => {
    dispatch(deleteUser(user.email)).then(() => {
      setOpenModal(false)
      dispatch(
          listUser({
            page: 0,
            limit: 100
          })
      );
    })
  }

  return (
    <div>
      <Card>
        <div className={'flex flex-col items-center p-3 relative pb-20'}>
          <div className={'absolute top-1 right-0 p-2'}>
            <Button
              onClick={() => {
                setOpenModal(true);
              }}
              shape={'circle'}
              icon={<EditOutlinedIcon />}
              type={'primary'}
              className={'bg-white text-gray-700'}
            />
          </div>
          <Avatar {...stringAvatar('Kent Dodds')} />
          <span className={'mt-3'}>Tuyet Bong</span>
          <span
            className={
              'text-xs bg-[#0b850b] p-1 pl-2 pr-2 text-white rounded-xl'
            }
          >
            {user?.roles.length == 0 ? "User Role" : user?.roles}
          </span>
          <div className={'w-full mt-2 p-1 pl-5 text-xs'}>
            <div className={'mt-1'}>
              <span className={'font-bold'}>Email:</span>{' '}
              <span>{user.email}</span>
            </div>
            <div className={'mt-1'}>
              <span className={'font-bold'}>Password:</span>{' '}
              <span>***********</span>
            </div>
            <div className={'mt-1'}>
              <span className={'font-bold'}>Phone:</span>{' '}
              <span>{user?.phone}</span>
            </div>
            <div className={'mt-1'}>
              <span className={'font-bold'}>Address:</span>{' '}
              <span>{user?.address ?? ''}</span>
            </div>
          </div>
        </div>
      </Card>

      <Modal
        open={openModal}
        centered={true}
        confirmLoading={true}
        onCancel={() => setOpenModal(false)}
        footer={(_, { OkBtn, CancelBtn }) => (
          <div className={'justify-end'}>
            <Button danger={true} onClick={handleDelete}>Delete</Button>
            <Button
              form={`user-form-${user.id}`}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </div>
        )}
      >
        <Form
          id={`user-form-${user.id}`}
          onFinish={handleSubmit}
          initialValues={{...user, password: ""}}
        >
          <div className={'w-full'}>
            <Typography fontWeight={'bold'}>Email</Typography>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'email không được để trống!' }
              ]}
            >
              <Input
                allowClear
                type={'email'}
                disabled={true}
                className={'p-2 mt-1'}
                placeholder={'Nhập email'}
              />
            </Form.Item>
          </div>
          <div className={'w-full'}>
            <Typography fontWeight={'bold'}>Họ và tên</Typography>
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input username!' }]}
            >
              <Input
                allowClear
                className={'p-2 mt-1'}
                placeholder={'Nhập tên người dùng'}
              />
            </Form.Item>
          </div>
          <div className={'w-full'}>
            <Typography fontWeight={'bold'}>Mật khẩu</Typography>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input password!' }]}
            >
              <Input.Password
                minLength={8}
                allowClear
                className={'p-2 mt-1'}
                placeholder={'Nhập mật khẩu'}
              />
            </Form.Item>
          </div>
          <div className={'w-full'}>
            <Typography fontWeight={'bold'}>Địa chỉ</Typography>
            <Form.Item
              name="address"
              rules={[{ required: false, message: 'Please input address!' }]}
            >
              <Input
                allowClear
                className={'p-2 mt-1'}
                placeholder={'Nhập địa chỉ'}
              />
            </Form.Item>
          </div>
          <div className={'w-full'}>
            <Typography fontWeight={'bold'}>Số điện thoại</Typography>
            <Form.Item
              name="phone"
              rules={[{ required: false, message: 'Please input phone!' }]}
            >
              <Input
                allowClear
                className={'p-2 mt-1'}
                placeholder={'Nhập số điện thoại'}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 70,
      height: 70,
      mt: 2
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  };
}

export default UserCard;
