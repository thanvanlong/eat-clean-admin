import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {Container, Card, CardContent, Typography, Backdrop} from '@mui/material';
import Footer from 'src/components/Footer';
import React, {useEffect, useMemo, useState} from 'react';
import {Input, Modal, Upload, InputNumber, Button, Form, DatePicker, message} from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import TextArea from "antd/es/input/TextArea";
import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';
import {useAppDispatch, useAppSelector} from "../../../../../../redux/hooks";
import {createProduct, getCategory, getProductById} from "../../../../../../redux/features/productSlice";
import {RootState} from "../../../../../../redux/store";
import Editor from "../../Blogs/BlogDetail/Editor";
import 'react-quill/dist/quill.snow.css';
import { CircularProgress } from "@mui/material";
import {useLocation, useNavigate} from "react-router";
import {IProduct} from "../../../../../../interfaces/product.interface";
function EditProduct() {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const navigate = useNavigate()
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

    const dispatch = useAppDispatch()
    const location = useLocation()
    const id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
    console.log(id)
    const getCategories = () => {
        dispatch(getCategory())
    }
    const category = useAppSelector((root: RootState) => root.product.categories)
    const product = useAppSelector((root: RootState) => root.product.product)
    let options: SelectProps['options'] = category?.map(it => ({label: it.label, value: it.id}))
    console.log(product)
    const initialValues: any = useMemo(() => {
        return {
            name: product?.name ?? "sss",
            price: product?.price ?? 0,
            description: product?.description ?? "<p>long van than</p>",
            slug: product?.slug ?? "",
            categories: product?.categories?.[0].key ?? "",
            imgs: product?.imgs ?? [],
            quantity: product?.quantity ?? 0,
            shortDescription: product?.shortDescription ?? "",
        };
    }, [product]);

    useEffect(() => {
        getCategories()
        dispatch(getProductById(Number(id)))
    }, [])

    useEffect(() => {
        getCategories()
        dispatch(getProductById(Number(id)))
    }, [])

    const handleSubmit = (e) => {
        let formData = new FormData();    //formdata object

        for (const key of Object.keys(e)) {
            if (key !== "files") {
                formData.append(key, e[key]);
            }
            else {
                e[key].fileList.forEach((item) => {
                    formData.append(key, item.originFileObj)
                });
            }
        }
        formData.append("description", description)
        setOpen(true)
        dispatch(createProduct(formData)).then(() => {
            setOpen(false)
            navigate("/management/product")
        })
    }

    const handle = (e) => {
        setDescription(e)
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
                        {product ? <Form onFinish={handleSubmit} initialValues={initialValues}>
                            <div className={'w-full'}>
                                <Typography fontWeight={'bold'}>Product Title</Typography>
                                <Form.Item
                                    name="name"
                                    rules={[{ required: true, message: 'Please input product title!' }]}
                                >
                                    <Input name={"name"} className={"p-2 mt-1"} placeholder={"Enter product name"} />
                                </Form.Item>
                            </div>
                            <div className={'w-full mt-3'}>
                                <Typography fontWeight={'bold'}>Description</Typography>
                                <Form.Item
                                    name={"shortDescription"}
                                >
                                    <TextArea rows={4} className={'rounded w-full border p-3 mt-1'} placeholder={'Enter description'} />
                                </Form.Item>
                            </div>
                            <div className={'w-full mt-3'}>
                                <p className={'font-semibold text-gray-700 mb-1'}>Image</p>
                                <Form.Item
                                    name="files"
                                >
                                    <Upload
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
                                </Form.Item>
                                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                                <div className={'border-red-700'}>
                                    <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1BG9bXE8Gzv0ViwAlny9vGx4538zhgG17JeJECXAdgQ&s"} />
                                </div>
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
                                    name="categories"
                                    rules={[{ required: false, message: 'Please input category!' }]}
                                >
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Please select category"
                                        onChange={() => {}}
                                        options={options}
                                    />
                                </Form.Item>
                            </div>

                            <div className={'mt-3 w-full flex'}>
                                <div className={'w-1/2'}>
                                    <Typography fontWeight={'bold'}>Price</Typography>
                                    <Form.Item
                                        name="price"
                                        rules={[{ required: false, message: 'Please input price!' }]}
                                    >
                                        <InputNumber min={1000} step={1000} className={'mt-1 w-11/12'}/>
                                    </Form.Item>
                                </div>
                                <div className={'w-1/2'}>
                                    <Typography fontWeight={'bold'}>Quantity</Typography>
                                    <Form.Item
                                        name="quantity"
                                        rules={[{ required: false, message: 'Please input quantity!' }]}
                                    >
                                        <InputNumber min={1} step={1} className={'mt-1 w-11/12'}/>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className={'w-full mt-3'}>
                                <Typography fontWeight={'bold'} sx={{mb: 1}}>Blogs</Typography>
                                <Editor handle={(e) => handle(e)} data={initialValues.description} />
                            </div>
                            <div className={'w-full flex justify-center mt-9'}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form> : <></>}
                    </CardContent>
                </Card>
            </Container>
            <Backdrop open={open}>
                <CircularProgress />
            </Backdrop>
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


export default EditProduct;