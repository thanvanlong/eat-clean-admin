import { Card } from '@mui/material';
import { Order } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';

function RecentOrders() {
  const Orders: Order[] = [

  ];

  return (
    <Card>
      <RecentOrdersTable Orders={Orders} />
    </Card>
  );
}

export default RecentOrders;
