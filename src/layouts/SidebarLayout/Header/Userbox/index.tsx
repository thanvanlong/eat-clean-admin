import React, { useRef, useState } from 'react';

import { NavLink } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';

import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import {Form, Input, Modal, Select} from "antd";
import {useNavigate} from "react-router";

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
  const user = {
    name: 'Tuyet Bong',
    avatar: '/static/images/avatars/1.jpg',
    jobtitle: 'Project Manager'
  };

  const navigate = useNavigate()

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar variant="rounded" alt={user.name} src={user.avatar} />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user.jobtitle}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar variant="rounded" alt={user.name} src={user.avatar} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user.jobtitle}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button color="primary"  onClick={() => {
            localStorage.clear()
            window.location.href = "http://localhost:3000/login"
          }} fullWidth>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </Button>
        </Box>
      </Popover>

      <Modal
          open={false}
          centered={true}
          confirmLoading={true}
          footer={(_, { OkBtn, CancelBtn }) => (
              <>
                <Button form={`user-form`} type="submit" variant={'contained'}>
                  Submit
                </Button>
              </>
          )}
      >
        <Form id={`user-form`} onFinish={(value: any) => {
          console.log(value)}}>
          <div className={'w-full'}>
            <Typography fontWeight={'bold'}>Older Password</Typography>
            <Form.Item
                name="oldpass"
                rules={[{ required: true, message: 'Please input old password!' }]}
            >
              <Input allowClear className={"p-2 mt-1"} placeholder={"Enter older password"} />
            </Form.Item>
          </div>
          <div className={'w-full'}>
            <Typography fontWeight={'bold'}>New Password</Typography>
            <Form.Item
                name="npassword"
                rules={[{ required: true, message: 'Please input new password!' }]}
            >
              <Input.Password allowClear className={"p-2 mt-1"} placeholder={"Enter new password"} />
            </Form.Item>
          </div>
          <div className={'w-full'}>
            <Typography fontWeight={'bold'}>Confirm Password</Typography>
            <Form.Item
                name="cpassword"
                rules={[{ required: true, message: 'Confirm password!' }]}
            >
              <Input allowClear className={"p-2 mt-1"} placeholder={"Confirm passowrd"} />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default HeaderUserbox;
