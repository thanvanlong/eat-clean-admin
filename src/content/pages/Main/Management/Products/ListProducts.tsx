import { Card } from '@mui/material';
import ListProductsTable from './ListProductsTable';
import { subDays } from 'date-fns';

function ListProducts() {
  return (
    <Card>
      <ListProductsTable />
    </Card>
  );
}

export default ListProducts;
