import { Card } from '@mui/material';
import { subDays } from 'date-fns';
import ListDiscountsTable from './ListDiscountsTable';

function ListDiscounts() {
  return (
    <Card>
      <ListDiscountsTable />
    </Card>
  );
}

export default ListDiscounts;
