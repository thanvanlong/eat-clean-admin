import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';

import AccountBalance from './AccountBalance';
import Wallets from './Wallets';
import AccountSecurity from './AccountSecurity';
import WatchList from './WatchList';
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {RootState} from "../../../redux/store";
import React, {useEffect, useState} from "react";
import { getCategoryRevenue, getDaysRevenue, getTotalRevenue} from "../../../redux/features/productSlice";
import {Button, Form, Modal, Select} from "antd";
import { DatePicker, Space } from 'antd';
import dayjs from "dayjs";
import statsApi from "../../../api/statsApi";

const { RangePicker } = DatePicker;

function DashboardCrypto() {
    const dispatch = useAppDispatch()
    const totalRevenue = useAppSelector((root: RootState) => root.product.totalRevenue)
    const monthRevenue = useAppSelector((root: RootState) => root.product.monthRevenue)
    const categoryRevenue = useAppSelector((root: RootState) => root.product.categoryRevenue)
    const daysRevenue = useAppSelector((root: RootState) => root.product.daysRevenue)
    const [open, setOpen] = useState(false)
    useEffect(() => {
        dispatch(getTotalRevenue())
        dispatch(getCategoryRevenue())
        dispatch(getDaysRevenue())
    }, []);
  return (
    <>
      <Helmet>
        <title>Eat Clean Dashboard</title>
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
          spacing={4}
        >
          <Grid item xs={12}>
            <AccountBalance totalRevenue={totalRevenue} monthRevenue={monthRevenue?.[new Date().getMonth()]} categoryRevenue={categoryRevenue} />
          </Grid>
          <Grid item xs={12}>
            <WatchList monthRevenue={monthRevenue} totalRevenue={totalRevenue} daysRevenue={daysRevenue} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardCrypto;
