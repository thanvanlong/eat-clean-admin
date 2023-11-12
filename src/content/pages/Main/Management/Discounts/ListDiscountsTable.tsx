import { FC, ChangeEvent, useState, useEffect } from 'react';
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
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { getAllDiscounts } from 'src/redux/features/discountSlice';
import { IDiscounts } from 'src/interfaces/discounts.interface';
import { Link } from 'react-router-dom';

const getStatusLabel = (discountstatus: any): JSX.Element => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color }: any = map[discountstatus];

  return <Label color={color}>{text}</Label>;
};

// const applyPagination = (
//   Discounts: discount[],
//   page: number,
//   limit: number
// ): discount[] => {
//   return Discounts.slice(page * limit, page * limit + limit);
// };

const ListDiscountsTable = () => {
  const [selectedDiscounts, setSelectedDiscounts] = useState<number[]>([]);
  const selectedBulkActions = selectedDiscounts.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllDiscounts({ limit: limit, page: page }));
  }, []);

  const data = useAppSelector((root: RootState) => root.discount);

  const handleSelectOneDiscount = (
    event: ChangeEvent<HTMLInputElement>,
    discountId: number
  ): void => {
    if (!selectedDiscounts.includes(discountId)) {
      setSelectedDiscounts((prevSelected) => [...prevSelected, discountId]);
    } else {
      setSelectedDiscounts((prevSelected) =>
        prevSelected.filter((id) => id !== discountId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  // const selectedSomeDiscounts =
  //   selectedDiscounts.length > 0 && selectedDiscounts.length < Discounts.length;
  // const selectedAllDiscounts = selectedDiscounts.length === Discounts.length;
  const theme = useTheme();

  return (
    <Card>
      <CardHeader action={<Box width={150}></Box>} title="Mã giảm giá" />

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Tên mã giảm giá</TableCell>
              <TableCell align="center">Mã</TableCell>
              <TableCell align="center">Giảm (%)</TableCell>
              <TableCell align="center">Số lượng</TableCell>
              <TableCell align="center">Ngày bắt đầu</TableCell>
              <TableCell align="center">Ngày kết thúc</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Boolean(data.discounts.length) ? (
              data.discounts?.map((discount: IDiscounts) => {
                const isDiscountselected = selectedDiscounts.includes(
                  discount.id
                );
                return (
                  <TableRow
                    hover
                    key={discount.id}
                    selected={isDiscountselected}
                  >
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {discount.id}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {discount.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {discount.code}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {discount.discount}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {discount.quantity}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {format(new Date(discount.startAt), 'MMMM dd yyyy')}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {format(new Date(discount.endAt), 'MMMM dd yyyy')}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Link to={`/management/discount/edit/${discount.id}`}>
                        <Tooltip title="Sửa mã giảm giá" arrow>
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
                      <Tooltip title="Xóa mã giảm giá" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.error.lighter
                            },
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
              })
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={1}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={10}
          rowsPerPageOptions={[10]}
        />
      </Box>
    </Card>
  );
};

ListDiscountsTable.propTypes = {
  Discounts: PropTypes.array.isRequired
};

ListDiscountsTable.defaultProps = {
  Discounts: []
};

export default ListDiscountsTable;
