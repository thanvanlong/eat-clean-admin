import { Typography, Button, Grid } from '@mui/material';

function PageHeader() {
  const user = {
    name: 'Tuyet Bong',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Mã giảm giá
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, Đây là màn mã giảm giá!
        </Typography>
      </Grid>
      <Button variant={'contained'} href={'/management/discount/create'}>
        Tạo mã giảm giá
      </Button>
    </Grid>
  );
}

export default PageHeader;
