import {FC, ChangeEvent, useState, useEffect} from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
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
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import { Order, OrderStatus } from 'src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import {useAppDispatch, useAppSelector} from "../../../../../redux/hooks";
import {RootState} from "../../../../../redux/store";
import {getProductByPage} from "../../../../../redux/features/productSlice";
import {IProduct} from "../../../../../interfaces/product.interface";
import {Link} from "react-router-dom";





const ListProductsTable = () => {
  const [selectedProduct, setSelectedProduct] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedProduct.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);


  useEffect(() => {
    dispatch(getProductByPage({page: 0, limit: 100}))
  }, [])

  const products = useAppSelector((root: RootState) => root.product.products)
  const handleSelectAllCryptoOrders = (
      event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedProduct(
        event.target.checked
            ? products.map((cryptoOrder) => cryptoOrder.id)
            : []
    );
  };

  const handleSelectOneCryptoOrder = (
      event: ChangeEvent<HTMLInputElement>,
      cryptoOrderId: string
  ): void => {
    if (!selectedProduct.includes(cryptoOrderId)) {
      setSelectedProduct((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedProduct((prevSelected) =>
          prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const applyPagination = (): IProduct[] => {
    return products.slice(page * limit, page * limit + limit);
  };


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
          title="Products List"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  onChange={handleSelectAllCryptoOrders}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Ảnh</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell align="right">Số lượng</TableCell>
              <TableCell align="right">Giá</TableCell>
              <TableCell align="right">Mô tả</TableCell>
              <TableCell align="right">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products ? applyPagination().map((it) => {
              const isSelected = selectedProduct.includes(
                it.id
              );
              return (
                <TableRow
                  hover
                  key={it.id}
                  selected={isSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, it.id)
                      }
                      value={isSelected}
                    />
                  </TableCell>
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
                    <img className={'w-[50px]'} src={it.imgs[0]}/>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {it.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {it.quantity}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {it.price}
                  </TableCell>
                  <TableCell align="right">
                    {it.shortDescription}
                  </TableCell>
                  <TableCell align="right">
                    <Link to={`/management/product/edit/${it.id}`}>
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
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Link>
                    <Tooltip title="Delete Order" arrow>
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
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            }) : <></>}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={products ? products.length : limit}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

ListProductsTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

ListProductsTable.defaultProps = {
  cryptoOrders: []
};

export default ListProductsTable;
