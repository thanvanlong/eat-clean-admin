import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {Container, Card, CardContent, Typography} from '@mui/material';
import Footer from 'src/components/Footer';
import React, { useState } from 'react';
import {Input, Modal, Upload, InputNumber, Button, Form, DatePicker, message} from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import TextArea from "antd/es/input/TextArea";
import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';
function ProductDetail() {
    return (
        <>
            <Helmet>
                <title>Create Promotion</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader />
            </PageTitleWrapper>
            <Container maxWidth="lg">
                <Card style={{background: "white"}}>
                    <CardContent>
                       <Form>
                           <div className={'w-full'}>
                               <Typography fontWeight={'bold'}>Product Title</Typography>
                               <Form.Item
                                   name="Promotion Title"
                                   rules={[{ required: true, message: 'Please input promotion title!' }]}
                               >
                                   <Input className={"p-2 mt-1"} placeholder={"Enter promotion title"} />
                               </Form.Item>
                           </div>
                           <div className={'w-full mt-3'}>
                               <Typography fontWeight={'bold'}>Description</Typography>
                               <TextArea rows={4} className={'rounded w-full border p-3 mt-1'} placeholder={'Enter description'} />
                           </div>
                           <div className={'w-full mt-3'}>
                               <Typography fontWeight={'bold'}>Discount Value</Typography>
                               <Form.Item
                                   name="discount"
                                   rules={[{ required: true, message: 'Please input value!' }]}
                               >
                                   <InputNumber min={0} defaultValue={0} step={1} className={'mt-1 p-2 w-full'}/>
                               </Form.Item>
                           </div>
                           <div className={'mt-3 w-full flex'}>
                               <div className={'w-1/2 pr-3'}>
                                   <Typography fontWeight={'bold'}>Start Date</Typography>
                                   <Form.Item
                                       name="price"
                                       rules={[{ required: false, message: 'Please input start date!' }]}
                                   >
                                       <DatePicker onChange={() => {}} className={'p-1 mt-1 w-full'} />
                                   </Form.Item>
                               </div>
                               <div className={'w-1/2'}>
                                   <Typography fontWeight={'bold'}>End Date</Typography>
                                   <Form.Item
                                       name="publishdate"
                                       rules={[{ required: true, message: 'Please input end date!' }]}
                                   >
                                       <DatePicker onChange={() => {}} className={'p-1 mt-1 w-full'} />
                                   </Form.Item>
                               </div>
                           </div>
                           <div className={'w-full flex justify-center mt-9'}>
                               <Button type="primary" htmlType="submit">
                                   Submit
                               </Button>
                           </div>
                       </Form>
                    </CardContent>
                </Card>
            </Container>
            <Footer />
        </>
    )
}
const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });


export default ProductDetail;