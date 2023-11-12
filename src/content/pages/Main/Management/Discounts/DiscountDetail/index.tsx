import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Card, CardContent, Typography } from '@mui/material';
import Footer from 'src/components/Footer';
import React, { useEffect, useState } from 'react';
import {
  Input,
  Modal,
  Upload,
  InputNumber,
  Button,
  Form,
  DatePicker,
  message
} from 'antd';
import dayjs from 'dayjs';

import TextArea from 'antd/es/input/TextArea';
import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch } from 'src/redux/hooks';
import { toast } from 'react-toastify';
import { toastOption } from 'src/configs/notification.config';
import { IDiscounts } from 'src/interfaces/discounts.interface';
import discountsApi from 'src/api/discountsApi';
import { create, update } from 'src/redux/features/discountSlice';

function DiscountDetail() {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState<string>('Thêm nội dung');
  const [discounts, setDiscounts] = useState<IDiscounts>(null);
  const [loading, setLoading] = useState<boolean | undefined>(false);
  const [isHide, setIsHide] = useState<boolean>(true);
  const dateFormat = 'YYYY-MM-DD';

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      if (Number(id)) {
        setTitle('Sửa nội dung');
        setComponentDisabled(true);
        fetchData(Number(id));
      } else navigate('/404');
    } else {
      setIsHide(false)
      setError(null);
    }
  }, [id]);

  const fetchData = async (id: number) => {
    setLoading(true);
    const resp: any = await discountsApi.getOne(id);
    if (resp.success) {
      setDiscounts(resp.data);
      setIsHide(false);
    } else {
      toast.error(resp.message, toastOption);
      setLoading(false);
      setIsHide(false);
      setError(resp.message);
    }
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    if (title == 'Sửa nội dung') {
      dispatch(update({ id: +id, ...values }))
        .unwrap()
        .then((originalPromiseResult) => {
          console.log(originalPromiseResult);
          navigate('/management/discount');
        })
        .catch((rejectedValueOrSerializedError) => {
          setLoading(false);
          toast.error(rejectedValueOrSerializedError.message, toastOption);
        });
    } else {
      dispatch(create({ ...values }))
        .unwrap()
        .then((originalPromiseResult) => {
          console.log(originalPromiseResult);
          navigate('/management/discount');
        })
        .catch((rejectedValueOrSerializedError) => {
          setLoading(false);
          // handle error here
          toast.error(rejectedValueOrSerializedError.message, toastOption);
        });
    }
  };

  const handleBtnSubmit = (e: any) => {
    const text = e.target.innerText;
    if (text == 'Sửa') {
      e.preventDefault();
      setComponentDisabled(false);
    } else if (text == 'Lưu') {
    } else if (text == 'Cập nhật') {
    }
  };

  return (
    <>
      <Helmet>
        <title>Thêm mới mã giảm giá</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader title="Mã giảm giá" />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Card style={{ background: 'white' }}>
          <CardContent>
            {!isHide ? (
              <Form
                layout="vertical"
                onFinish={onFinish}
                disabled={componentDisabled}
                initialValues={{
                  ...discounts,
                  startAt: dayjs('2015-06-06', dateFormat),
                  endAt: dayjs('2015-06-06', dateFormat)
                }}
              >
                <div className={'w-full'}>
                  <Form.Item
                    label="Tên mã giảm giá"
                    name="name"
                    rules={[
                      { required: true, message: 'Hãy nhập tên mã giảm giá' }
                    ]}
                  >
                    <Input
                      className={'p-2 mt-1'}
                      placeholder={'Nhập tên mã giảm giá'}
                    />
                  </Form.Item>
                </div>
                <div className={'w-full mt-3'}>
                  <Form.Item name="description" label="Mô tả">
                    <TextArea
                      rows={4}
                      className={'rounded w-full border p-3 mt-1'}
                      placeholder={'Nhập mô tả'}
                    />
                  </Form.Item>
                </div>
                <div className={'mt-3 w-full flex'}>
                  <div className={'w-1/2 pr-3'}>
                    <Form.Item
                      label="Mã code"
                      name="code"
                      rules={[{ required: true, message: 'Hãy nhập mã code!' }]}
                    >
                      <Input
                        className={'mt-1 p-2 w-full'}
                        placeholder="Nhập code"
                      />
                    </Form.Item>
                  </div>
                  <div className={'w-1/2 pr-3'}>
                    <Form.Item
                      label="Số lượng"
                      name="quantity"
                      rules={[{ required: true, message: 'Hãy nhập mã code!' }]}
                    >
                      <InputNumber
                        min={0}
                        max={100}
                        className={'mt-1 p-1 w-full'}
                        placeholder="Nhập số lượng"
                      />
                    </Form.Item>
                  </div>
                  <div className={'w-1/2 pr-3'}>
                    <Form.Item
                      label="Giảm (%)"
                      name="discount"
                      rules={[
                        { required: true, message: 'Hãy nhập % giảm giá!' }
                      ]}
                    >
                      <InputNumber
                        min={0}
                        max={100}
                        className={'mt-1 p-1 w-full'}
                        placeholder="Nhập % giảm giá"
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className={'mt-3 w-full flex'}>
                  <div className={'w-1/2 pr-3'}>
                    <Form.Item
                      label="Ngày bắt đầu"
                      name="startAt"
                      rules={[
                        { required: true, message: 'Hãy nhập ngày bắt đầu!' }
                      ]}
                    >
                      <DatePicker
                        onChange={() => {}}
                        className={'p-1 mt-1 w-full'}
                      />
                    </Form.Item>
                  </div>
                  <div className={'w-1/2'}>
                    <Form.Item
                      label="Ngày kết thúc"
                      name="endAt"
                      rules={[
                        {
                          required: true,
                          message: 'Hãy nhập thời gian hết hạn!'
                        }
                      ]}
                    >
                      <DatePicker
                        onChange={() => {}}
                        className={'p-1 mt-1 w-full'}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className={'w-full flex justify-center mt-9'}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={handleBtnSubmit}
                      disabled={
                        title == 'Thêm nội dung'
                          ? false
                          : discounts == null
                          ? true
                          : false
                      }
                    >
                      {title == 'Thêm nội dung'
                        ? 'Lưu'
                        : componentDisabled
                        ? 'Sửa'
                        : 'Cập nhật'}
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            ) : (
              <></>
            )}
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

export default DiscountDetail;
