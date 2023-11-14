import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from "./Editor";
import {Helmet} from "react-helmet-async";
import PageTitleWrapper from "../../../../../../components/PageTitleWrapper";
import PageHeader from "./PageHeader";
import {Backdrop, Card, CircularProgress, Typography} from "@mui/material";
import type { UploadProps } from 'antd';
import {message, Upload, Form, Input, Modal, Button} from 'antd';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ImgCrop from "antd-img-crop";
import {UploadFile} from "antd/es/upload/interface";
import {RcFile} from "antd/es/upload";
import TextArea from "antd/es/input/TextArea";
import {createBlog, createProduct} from "../../../../../../redux/features/productSlice";
import {useAppDispatch} from "../../../../../../redux/hooks";
import {useNavigate} from "react-router";

function BlogDetail() {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [content, setContent] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [open, setOpen] = useState(false);
    const handleCancel = () => setPreviewOpen(false);
    const navigate = useNavigate()

    const handle = (e) => {
        setContent(e)
    }

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
    }
    const getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });


    const uploadButton = (
        <div className={'w-full'}>
            <CloudUploadOutlinedIcon />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const dispatch = useAppDispatch()
    const handleSubmit = (e) => {
        let formData = new FormData();    //formdata object

        for (const key of Object.keys(e)) {
            console.log(key)
            if (key !== "file") {
                formData.append(key, e[key]);
            }
            else {
                e[key]?.fileList.forEach((item) => {
                    formData.append(key, item.originFileObj)
                });
            }
        }
        formData.append("content", content)
        console.log(e)
        console.log(content)
        setOpen(true)
        dispatch(createBlog(formData)).then(() => {
            setOpen(false)
            navigate("/management/blog")
        })
    }

    return (
        <div>
            <Helmet>Create - Blogs</Helmet>
            <PageTitleWrapper>
                <PageHeader />
            </PageTitleWrapper>

            <Card sx={{padding: 2}}>
                <Form onFinish={handleSubmit}>
                    <div className={'w-full'}>
                        <Typography fontWeight={'bold'}>Post Title</Typography>
                        <Form.Item
                            name="title"
                            rules={[{ required: true, message: 'Please input product title!' }]}
                        >
                            <Input className={"p-2 mt-1"} placeholder={"Enter title"} />
                        </Form.Item>
                    </div>
                    <div className={'w-full mt-3'}>
                        <Typography fontWeight={'bold'}>Description</Typography>
                        <Form.Item
                            name="description"
                            rules={[{ required: true, message: 'Please input description!' }]}
                        >
                            <TextArea rows={4} className={'rounded w-full border p-3 mt-1'} placeholder={'Enter description'} />
                        </Form.Item>
                    </div>
                    <div className={'w-full mt-3'}>
                        <p className={'font-semibold text-gray-700 mb-1'}>Image</p>
                        <Form.Item
                            name="file"
                            rules={[{ required: true, message: 'Please input image!' }]}
                        >
                            <Upload
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                            >
                                {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                        </Form.Item>
                        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </div>
                    <div>
                        <Typography fontWeight={'bold'} sx={{mb: 1}}>Blogs</Typography>
                        <Editor handle={(e) => handle(e)}/>
                    </div>
                    <div className={'w-full flex justify-center'}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </Card>
            <Backdrop open={open}>
                <CircularProgress />
            </Backdrop>
        </div>
    );
}

export default BlogDetail;
