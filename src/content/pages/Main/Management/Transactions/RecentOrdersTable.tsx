import React, {FC, ChangeEvent, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  MenuItem,
  Typography,
  useTheme,
  CardHeader, CircularProgress
} from '@mui/material';

import Label from 'src/components/Label';
import { Order, OrderStatus } from 'src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import {useAppDispatch, useAppSelector} from "../../../../../redux/hooks";
import {RootState} from "../../../../../redux/store";
import {deleteBill, getBills, getProductByPage, updateBill} from "../../../../../redux/features/productSlice";
import {IBill, IProduct} from "../../../../../interfaces/product.interface";
import {Link} from "react-router-dom";
import {Button, Form, Input, Modal, Popconfirm} from "antd";
import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';

const ListOrdersTable = () => {
  const [selectedBill, setSelectedBill] = useState<string[]>(
      []
  );
  const selectedBulkActions = selectedBill.length > 0;
  const [page, setPage] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(100);
  const [status, setStatus] = useState('');
  const [id, setId] = useState(0);


  useEffect(() => {
    dispatch(getBills())
  }, [])

  const bills = useAppSelector((root: RootState) => root.product.bills)
  const handleSelectAllCryptoOrders = (
      event: ChangeEvent<HTMLInputElement>
  ): void => {

  };


  const options: SelectProps['options'] = [{label: "PENDING", value: "PENDING"},
    {label: "CANCEL", value: "CANCEL"}, {label: "COMPLETED", value: "COMPLETED"}];

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const applyPagination = (): IBill[] => {
    return bills.slice(0, limit);
  };

  const handleSubmit = (e) => {
    let formData = new FormData();    //formdata object

    formData.append("status", e.status)
    formData.append("id", id.toString())
    dispatch(updateBill(formData)).then(() => {
      setOpen(false)
      dispatch(getBills())
    })
  }

  const handleDelete = (e) => {
    dispatch(deleteBill(e)).then(() => {
      dispatch(getBills())
    })
  }

  console.log(bills)
  return (
      <Card>
        {selectedBulkActions && (
            <Box flex={1} p={2}>
              <BulkActions />
            </Box>
        )}
        {!selectedBulkActions && (
            <CardHeader
                action={
                  <Box width={150}>

                  </Box>
                }
                title="Transactions List"
            />
        )}
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bills ? applyPagination().map((it) => {
                return (
                    <TableRow
                        hover
                        key={it.id}
                    >
                      <TableCell>
                        <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                        >
                          {it.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <div className={'flex flex-col max-h-[100px] overflow-scroll'}>
                          {it.carts.map(it =>
                              <ProductOrder data={it} />
                          )}
                          </div>
                      </TableCell>
                      <TableCell>
                        <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                        >
                          {it.username}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                        >
                          {it.phone}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        {it.address}
                      </TableCell>
                      <TableCell>
                        {it.price}
                      </TableCell>
                      <TableCell align="right">
                        {it.billStatus}
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit Product" arrow>
                          <IconButton
                              sx={{
                                '&:hover': {
                                  background: theme.colors.primary.lighter
                                },
                                color: theme.palette.primary.main
                              }}
                              color="inherit"
                              size="small"
                              onClick={() => {
                                setOpen(true)
                                setStatus(it.billStatus)
                                setId(it.id)
                              }}
                          >
                            <EditTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={() => handleDelete(it.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                          <IconButton
                              sx={{
                                '&:hover': { background: theme.colors.error.lighter },
                                color: theme.palette.error.main
                              }}
                              color="inherit"
                              size="small"
                          >
                            <DeleteTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Popconfirm>
                      </TableCell>
                    </TableRow>
                );
              }) : <TableRow><TableCell><CircularProgress /></TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
        <Box p={2}>
          <TablePagination
              component="div"
              count={bills ? bills.length : limit}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={10}
              rowsPerPageOptions={[10]}
          />
        </Box>

        <Modal
            open={open}
            title={"Edit state transaction"}
            centered={true}
            onCancel={() => setOpen(false)}
            footer={(_, { OkBtn, CancelBtn }) => (
                <>
                  <Button form={'user-form'} type="primary" htmlType="submit">
                    Submit
                  </Button>
                </>
            )}
        >
          <Form id={'user-form'} onFinish={handleSubmit} initialValues={{status: status}}>
            <Form.Item
                name={"status"}
            >
              <Select
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Please select status"
                  onChange={() => {}}
                  options={options}
              />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
  );
};

function ProductOrder(props: any) {
  console.log(props, 'ssss')
  return (
      <div className="flex h-full items-center w-[300px] max-h-[100px] justify-around">
        <div className="w-[50px]">
            <a className="product-images1  pos-relative embed-responsive embed-responsive-1by1" title="Trà Gạo Lứt Đông Trùng Wise Food 300g, 20 Gói /Hộp Giảm Stress Hiệu Quả">
              <img className="w-full" src={props?.data?.foods?.imgs[0]} />
            </a>
        </div>
        <div className="product-cart-infor flex justify-between w-7/12 border-y-green-900 ml-5">
          <div className="w-full flex items-center">
            <h3 className="product-name">
              <p className="text-gray-700 text-sm">
                {props?.data?.foods?.name}
              </p>
            </h3>
            <span className="variant-title font-semibold ml-5">{props?.data?.quantity}</span>
          </div>
        </div>
      </div>
  )
}

ListOrdersTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

ListOrdersTable.defaultProps = {
  cryptoOrders: []
};

export default ListOrdersTable;
