import { useState, useEffect, useMemo } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TopCard from './TopCard'; // TopCard bileşenini doğru şekilde import ediyoruz

interface Option {
  _id: string;
  type: string;
  underlyingAsset: string;
  purchaseDate: string | null;
  expiryDate: string | null;
  strikePrice: number;
  premium: number;
  createdBy: string;
  status: string;
}

const OptionManagement = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const [newOption, setNewOption] = useState<Omit<Option, '_id'>>({
    type: '',
    underlyingAsset: '',
    purchaseDate: '',
    expiryDate: '',
    strikePrice: 0,
    premium: 0,
    createdBy: '', // JWT token'dan gelen kullanıcı ID'si ile eşleşmeli
    status: 'Active',
  });

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
      console.log('Fetched options:', data); // Konsola fetched options logluyoruz
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewOption((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOption = async () => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) return;

    // JWT token'dan kullanıcı ID'sini alın (Bu, backend'de verify edildiğinden emin olunmalı)
    const decodedToken = JSON.parse(atob(storedToken.split('.')[1]));
    const createdBy = decodedToken.userId;

    try {
      const response = await fetch('http://localhost:5000/api/options', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': storedToken,
        },
        body: JSON.stringify({ ...newOption, createdBy }),
      });
      if (!response.ok) {
        throw new Error('Failed to add option');
      }
      const data = await response.json();
      setOptions((prev) => [data, ...prev]); // Yeni eklenen kaydı listenin başına ekle
      console.log('Added option:', data); // Konsola added option logluyoruz
      setNewOption({
        type: '',
        underlyingAsset: '',
        purchaseDate: '',
        expiryDate: '',
        strikePrice: 0,
        premium: 0,
        createdBy: '',
        status: 'Active',
      });
      window.location.reload(); // Sayfayı yenile
    } catch (error) {
      console.error('Error adding option:', error);
    }
  };

  const rows = useMemo(() => {
    return options.map(option => ({
      ...option,
      id: option._id // Use `_id` as `id` for each row
    }));
  }, [options]);

  const columns: GridColDef[] = [
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'underlyingAsset', headerName: 'Underlying Asset', width: 200 },
    { field: 'purchaseDate', headerName: 'Purchase Date', width: 200 },
    { field: 'expiryDate', headerName: 'Expiry Date', width: 200 },
    { field: 'strikePrice', headerName: 'Strike Price', width: 150 },
    { field: 'premium', headerName: 'Premium', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" fontWeight={400} mb={2}>
        Options Management
      </Typography>
      <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <TextField
          label="Type"
          name="type"
          value={newOption.type}
          onChange={handleInputChange}
          sx={{ flex: '1 1 200px' }}
        />
        <TextField
          label="Underlying Asset"
          name="underlyingAsset"
          value={newOption.underlyingAsset}
          onChange={handleInputChange}
          sx={{ flex: '1 1 200px' }}
        />
        <TextField
          label="Purchase Date"
          name="purchaseDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={newOption.purchaseDate ?? ''}
          onChange={handleInputChange}
          sx={{ flex: '1 1 200px' }}
        />
        <TextField
          label="Expiry Date"
          name="expiryDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={newOption.expiryDate ?? ''}
          onChange={handleInputChange}
          sx={{ flex: '1 1 200px' }}
        />
        <TextField
          label="Strike Price"
          name="strikePrice"
          type="number"
          value={newOption.strikePrice}
          onChange={handleInputChange}
          sx={{ flex: '1 1 200px' }}
        />
        <TextField
          label="Premium"
          name="premium"
          type="number"
          value={newOption.premium}
          onChange={handleInputChange}
          sx={{ flex: '1 1 200px' }}
        />
        <Button variant="contained" color="primary" onClick={handleAddOption} sx={{ flex: '1 1 200px' }}>
          Add Option
        </Button>
      </Box>
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
