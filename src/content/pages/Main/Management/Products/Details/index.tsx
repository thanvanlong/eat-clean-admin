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
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        console.log(newFileList[0])
    }


    // @ts-ignore
    const uploadButton = (
        <div>
            +
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const options: SelectProps['options'] = [];

    for (let i = 10; i < 36; i++) {
        options.push({
            label: i.toString(36) + i,
            value: i.toString(36) + i,
        });
    }

    return (
        <>
            <Helmet>
                <title>Create - Product</title>
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
                                   name="productname"
                                   rules={[{ required: true, message: 'Please input product title!' }]}
                               >
                                   <Input className={"p-2 mt-1"} placeholder={"Enter product name"} />
                               </Form.Item>
                           </div>
                           <div className={'w-full mt-3'}>
                               <Typography fontWeight={'bold'}>Description</Typography>
                               <TextArea rows={4} className={'rounded w-full border p-3 mt-1'} placeholder={'Enter description'} />
                           </div>
                           <div className={'w-full mt-3'}>
                               <p className={'font-semibold text-gray-700 mb-1'}>Image</p>
                                   <Form.Item
                                       name="image"
                                       rules={[{ required: true, message: 'Please input image!' }]}
                                   >
                                       <ImgCrop showGrid rotationSlider aspectSlider showReset>
                                           <Upload
                                               action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                               listType="picture-card"
                                               fileList={fileList}
                                               onPreview={handlePreview}
                                               onChange={handleChange}
                                               beforeUpload={(file) => {
                                                   const isPNG = file.type === 'image/png';
                                                   if (!isPNG) {
                                                       message.error(`${file.name} is not a png file`);
                                                   }
                                                   return isPNG || Upload.LIST_IGNORE;
                                               }}
                                           >
                                               {fileList.length >= 8 ? null : uploadButton}
                                           </Upload>
                                       </ImgCrop>
                                   </Form.Item>
                               <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                   <img alt="example" style={{ width: '100%' }} src={previewImage} />
                               </Modal>
                           </div>
                           <div className={'w-full mt-3'}>
                               <Typography fontWeight={'bold'}>Slug</Typography>
                               <Form.Item
                                   name="slug"
                                   rules={[{ required: true, message: 'Please input slug title!' }]}
                               >
                                   <Input className={"p-2 mt-1"} placeholder={"Enter slug name"} />
                               </Form.Item>
                           </div>
                           <div className={'w-full mt-3'}>
                               <Typography fontWeight={'bold'}>Category</Typography>
                               <Form.Item
                                   name="category"
                                   rules={[{ required: true, message: 'Please input category!' }]}
                               >
                                   <div className={'mt-1'}>
                                       <Select
                                           mode="multiple"
                                           allowClear
                                           style={{ width: '100%' }}
                                           placeholder="Please select category"
                                           onChange={() => {}}
                                           options={options}
                                       />
                                   </div>
                               </Form.Item>
                           </div>

                           <div className={'mt-3 w-full flex'}>
                               <div className={'w-1/2'}>
                                   <Typography fontWeight={'bold'}>Price</Typography>
                                   <Form.Item
                                       name="price"
                                       rules={[{ required: false, message: 'Please input price!' }]}
                                   >
                                       <InputNumber min={1000} defaultValue={1000} step={1000} className={'mt-1 w-11/12'}/>
                                   </Form.Item>
                               </div>
                               <div className={'w-1/2'}>
                                   <Typography fontWeight={'bold'}>Publish Date</Typography>
                                   <Form.Item
                                       name="publishdate"
                                       rules={[{ required: true, message: 'Please input publish date!' }]}
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