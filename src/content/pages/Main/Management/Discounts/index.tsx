import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Typography } from '@mui/material';
import Footer from 'src/components/Footer';
import React from 'react';
import ListDiscounts from './ListDiscounts';
// import ListDiscounts from './ListDiscounts'

function ApplicationsDiscount() {
  return (
    <>
      <Helmet>
        <title>Manage - Orders</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <ListDiscounts />
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsDiscount;
