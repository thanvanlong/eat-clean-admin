import { Card } from '@mui/material';
import { Order } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import ListOrdersTable from "./RecentOrdersTable";

function RecentOrders() {
  const Orders: Order[] = [

  ];

  return (
    <Card>
      <ListOrdersTable />
    </Card>
  );
}

export default RecentOrders;
