import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

interface Props {
  title: string;
  desc?: string;
}

function PageHeader({ title, desc }: Props) {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle2">
          {desc || 'Tạo mới mã giảm giá'}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
