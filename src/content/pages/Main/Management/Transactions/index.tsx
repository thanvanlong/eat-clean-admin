import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {Grid, Container, Typography} from '@mui/material';
import Footer from 'src/components/Footer';

import RecentOrders from "./RecentOrders";
import {Button, Form, Input, Modal, Select} from "antd";
import React from "react";
import type { SelectProps } from 'antd';

function ApplicationsOrders() {
    const options: SelectProps['options'] = [{label: 'Cancel', value: 'Cancel'}, {label: 'Pending', value: 'Pending'}, {label: 'Completed', value: 'Completed'}];
    return (
    <>
      <Helmet>
        <title>Manage - Orders</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrders />
          </Grid>
        </Grid>
      </Container>
        <Modal
            open={false}
            centered={true}
            confirmLoading={true}
            footer={(_, { OkBtn, CancelBtn }) => (
                <>
                    <Button form={`user-form`} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </>
            )}
        >
            <Form id={`user-form`} onFinish={(value: any) => {
                console.log(value)}}>
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
                <div className={'w-full mt-3'}>
                    <Typography fontWeight={'bold'}>Status</Typography>
                    <Form.Item
                        name="status"
                        rules={[{ required: true, message: 'Please input status!' }]}
                    >
                        <div className={'mt-1'}>
                            <Select
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Please select status"
                                onChange={() => {}}
                                options={options}
                            />
                        </div>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
      <Footer />
    </>
    );
}

export default ApplicationsOrders;
