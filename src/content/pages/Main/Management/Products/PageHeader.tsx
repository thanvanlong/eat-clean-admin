import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';



function PageHeader() {
  const user = {
    name: 'Tuyet Bong',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Products
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are list products
        </Typography>
      </Grid>
      <Button variant={'contained'} href={'/management/product/create'}>Create product</Button>
    </Grid>
  );
}

export default PageHeader;
