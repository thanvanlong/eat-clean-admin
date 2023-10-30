import React, {useState} from "react";
import {Card, CardContent, Avatar, Typography} from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {Button, Form, Input, Modal} from "antd";
import {User} from "../../../../../../models/user";


function UserCard(props: User) {

    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <div>
            <Card>
                <div className={'flex flex-col items-center p-3 relative pb-20'}>
                    <div className={'absolute top-1 right-0 p-2'}>
                        <Button
                            onClick={() => {setOpenModal(true)}}
                            shape={'circle'}
                            icon={<EditOutlinedIcon />}
                            type={'primary'}
                            className={'bg-white text-gray-700'}/>
                    </div>
                    <Avatar {...stringAvatar('Kent Dodds')} />
                    <span className={'mt-3'}>Tuyet Bong</span>
                    <span className={'text-xs bg-[#0b850b] p-1 pl-2 pr-2 text-white rounded-xl'}>User Role</span>
                    <div className={'w-full mt-2 p-1 pl-5 text-xs'}>
                        <div className={'mt-1'}><span className={'font-bold'}>Email:</span> <span>longthan999@gmail.com</span></div>
                        <div className={'mt-1'}><span className={'font-bold'}>Password:</span> <span>***********</span></div>
                        <div className={'mt-1'}><span className={'font-bold'}>Phone:</span> <span>099xxx9999</span></div>
                        <div className={'mt-1'}><span className={'font-bold'}>Address:</span> <span>110 Tran Phu, Ha Dong, Ha Noi</span></div>
                    </div>
                </div>
            </Card>

            <Modal
                open={openModal}
                centered={true}
                confirmLoading={true}
                onCancel={() =>setOpenModal(false)}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <div className={'justify-end'}>
                        <Button danger={true}>Delete</Button>
                        <Button form={`user-form-${props.id}`} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                )}
            >
                <Form id={`user-form-${props.id}`} onFinish={(value: any) => {
                    console.log(value)}}>
                    <div className={'w-full'}>
                        <Typography fontWeight={'bold'}>Email</Typography>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input email!' }]}
                        >
                            <Input allowClear type={'email'} className={"p-2 mt-1"} placeholder={"Enter email"} />
                        </Form.Item>
                    </div>
                    <div className={'w-full'}>
                        <Typography fontWeight={'bold'}>Username</Typography>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input username!' }]}
                        >
                            <Input allowClear className={"p-2 mt-1"} placeholder={"Enter username"} />
                        </Form.Item>
                    </div>
                    <div className={'w-full'}>
                        <Typography fontWeight={'bold'}>Password</Typography>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input password!' }]}
                        >
                            <Input.Password minLength={8} allowClear className={"p-2 mt-1"} placeholder={"Enter password"} />
                        </Form.Item>
                    </div>
                    <div className={'w-full'}>
                        <Typography fontWeight={'bold'}>Address</Typography>
                        <Form.Item
                            name="address"
                            rules={[{ required: false, message: 'Please input address!' }]}
                        >
                            <Input allowClear className={"p-2 mt-1"} placeholder={"Enter address"} />
                        </Form.Item>
                    </div>
                    <div className={'w-full'}>
                        <Typography fontWeight={'bold'}>Phone</Typography>
                        <Form.Item
                            name="phone"
                            rules={[{ required: false, message: 'Please input phone!' }]}
                        >
                            <Input allowClear className={"p-2 mt-1"} placeholder={"Enter phone"} />
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
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}


export default UserCard;
