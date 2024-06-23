import { useMemo } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

interface Option {
  _id: string;
  type: string;
  product: string;
  purchaseDate: string | null;
  expiryDate: string | null;
  strikePrice: number;
  currentPrice: number;
}

interface OrdersStatusTableProps {
  options: Option[];
}

const OrdersStatusTable = ({ options }: OrdersStatusTableProps) => {
  const rows = useMemo(() => {
    return options.map(option => ({
      ...option,
      id: option._id // Her bir satır için `_id`yi `id` olarak kullan
    }));
  }, [options]);

  const columns: GridColDef[] = [
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'product', headerName: 'Product', width: 150 },
    { field: 'purchaseDate', headerName: 'Purchase Date', width: 150 },
    { field: 'expiryDate', headerName: 'Expiry Date', width: 150 },
    { field: 'strikePrice', headerName: 'Strike Price', width: 150 },
    { field: 'currentPrice', headerName: 'Current Price', width: 150 },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default OrdersStatusTable;
