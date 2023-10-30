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
          Orders
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are list transactions
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
