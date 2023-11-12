import {
  Card,
  Box,
  Grid,
  Typography,
  useTheme,
  styled,
  Avatar,
  Divider,
  alpha,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar
} from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Text from 'src/components/Text';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import React, {useEffect, useState} from "react";
import {getTotalRevenue} from "../../../redux/features/productSlice";
import {RootState} from "../../../redux/store";
import {Button, DatePicker, Form, Modal} from "antd";
import statsApi from "../../../api/statsApi";

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
  background: ${
    theme.palette.mode === 'dark'
      ? theme.colors.alpha.trueWhite[30]
      : alpha(theme.colors.alpha.black[100], 0.07)
  };

  img {
    background: ${theme.colors.alpha.trueWhite[100]};
    padding: ${theme.spacing(0.5)};
    display: block;
    border-radius: inherit;
    height: ${theme.spacing(4.5)};
    width: ${theme.spacing(4.5)};
  }
`
);

function AccountBalance(props: any) {
  const theme = useTheme();
  const [open, setOpen] = useState(false)
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const { RangePicker } = DatePicker;


  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%'
        }
      }
    },
    colors: props?.categoryRevenue ? props?.categoryRevenue?.map(() => getRandomColor()) : [],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + '%';
      },
      style: {
        colors: [theme.colors.alpha.trueWhite[100]]
      },
      background: {
        enabled: true,
        foreColor: theme.colors.alpha.trueWhite[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.colors.alpha.black[70],
          opacity: 0.5
        }
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5
      }
    },
    fill: {
      opacity: 1
    },
    labels: props?.categoryRevenue ? props?.categoryRevenue?.map((it) => it?.label) : [],
    legend: {
      labels: {
        colors: theme.colors.alpha.trueWhite[100]
      },
      show: false
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    }
  };

  const chartSeries = props?.categoryRevenue ? props?.categoryRevenue?.map((it) => it?.revenue) : [];

  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 3
              }}
              variant="h4"
            >
              Total Revenue
            </Typography>
            <Box>
              <Typography variant="h1" gutterBottom>
                {props?.totalRevenue.toLocaleString('vi-Vi', { style: 'currency', currency: 'VND' })}
              </Typography>
              <Box
                display="flex"
                sx={{
                  py: 4
                }}
                alignItems="center"
              >
                <AvatarSuccess
                  sx={{
                    mr: 2
                  }}
                  variant="rounded"
                >
                  <TrendingUp fontSize="large" />
                </AvatarSuccess>
                <Box>
                  <Typography variant="h4">+ {props?.monthRevenue?.toLocaleString('vi-Vi', { style: 'currency', currency: 'VND' })}</Typography>
                  <Typography variant="subtitle2" noWrap>
                    this month
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Grid container spacing={3}>
              <Grid sm item>
                <Button >
                  View Statistics
                </Button>
              </Grid>
              <Grid sm item>
                <Button onClick={() => setOpen(true)}>
                  Create Report
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid
          sx={{
            position: 'relative'
          }}
          display="flex"
          alignItems="center"
          item
          xs={12}
          md={6}
        >
          <Box
            component="span"
            sx={{
              display: { xs: 'none', md: 'inline-block' }
            }}
          >
            <Divider absolute orientation="vertical" />
          </Box>
          <Box py={4} pr={4} flex={1}>
            <Grid container spacing={0}>
              <Grid
                xs={12}
                sm={5}
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Chart
                  height={250}
                  options={chartOptions}
                  series={chartSeries}
                  type="donut"
                />
              </Grid>
              <Grid xs={12} sm={7} item display="flex" alignItems="center">
                <List
                  disablePadding
                  sx={{
                    width: '100%',
                    overflow: 'auto',
                    marginLeft: 6
                  }}
                >
                  {
                    props?.categoryRevenue?.map(it => (
                        <ListItem disableGutters>
                          <ListItemText
                              primary={it?.label?.toUpperCase()}
                              primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                              secondary="Category"
                              secondaryTypographyProps={{
                                variant: 'subtitle2',
                                noWrap: true
                              }}
                          />
                          <Box>
                            <Typography align="right" variant="h4" noWrap>
                              {it?.revenue / props?.totalRevenue * 100} %
                            </Typography>
                          </Box>
                        </ListItem>
                    ))
                  }
                </List>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
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
        <Form id={'user-form'} onFinish={async (e) => {
          setOpen(false)
          await  statsApi.exportReport(e.range)}} initialValues={{status: status}}>
          <Form.Item
              label="Thời gian: "
              name="range"
              rules={[
                { required: true, message: 'Hãy nhập ngày bắt đầu!' }
              ]}
          >
            <RangePicker className={'w-full'} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default AccountBalance;
