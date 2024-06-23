import  { useState, useEffect, useMemo } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import TopCard from './TopCard'; // TopCard bileşenini doğru şekilde import ediyoruz

interface Option {
  _id: string;
  type: string;
  product: string;
  purchaseDate: string | null;
  expiryDate: string | null;
  strikePrice: number;
  currentPrice: number;
}

const OptionManagement = () => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      fetchOptions(storedToken);
    }
  }, []);

  const fetchOptions = async (authToken: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/options', {
        headers: {
          'x-auth-token': authToken
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch options');
      }
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const rows = useMemo(() => {
    return options.map(option => ({
      ...option,
      id: option._id // Use `_id` as `id` for each row
    }));
  }, [options]);

  const columns: GridColDef[] = [
    { field: 'type', headerName: 'Type', width: 200 },
    { field: 'product', headerName: 'Product', width: 200 },
    { field: 'purchaseDate', headerName: 'Purchase Date', width: 200 },
    { field: 'expiryDate', headerName: 'Expiry Date', width: 200 },
    { field: 'strikePrice', headerName: 'Strike Price', width: 200 },
    { field: 'currentPrice', headerName: 'Current Price', width: 200 },
  ];

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" fontWeight={400} mb={2}>
        Options Management
      </Typography>
      <Box sx={{ height: 'calc(100vh - 120px)', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          pageSizeOptions={[5]}
          disableColumnFilter
          disableColumnMenu
        />
      </Box>

      {/* TopCard bileşenini çağırıyoruz */}
      <TopCard
        icon="carbon:favorite-filled"
        title="Sample Title"
        value="Sample Value"
        rate="Sample Rate"
        isUp={true}
      />
    </Paper>
  );
};

export default OptionManagement;
