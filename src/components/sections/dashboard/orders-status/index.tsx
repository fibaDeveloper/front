import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import DateSelect from 'components/dates/DateSelect';
import IconifyIcon from 'components/base/IconifyIcon';
import OrdersStatusTable from './OrdersStatusTable';

const OrdersStatus = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleOptionOperation = () => {
    navigate('/dashboard/options');
  };

  return (
    <Paper sx={{ px: 0 }}>
      <Stack
        px={3.5}
        spacing={1.5}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        justifyContent="space-between"
      >
        <Stack
          spacing={2}
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
          flexGrow={1}
        >
          <Typography variant="h6" fontWeight={400}>
            Opsiyonlar
          </Typography>
          <TextField
            variant="filled"
            size="small"
            placeholder="Search for..."
            value={searchText}
            onChange={handleInputChange}
            sx={{ width: 220 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconifyIcon icon={'mingcute:search-line'} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack
          spacing={1.5}
          direction={{ xs: 'column-reverse', sm: 'row' }}
          alignItems={{ xs: 'flex-end', sm: 'center' }}
        >
          <DateSelect />
          <Button variant="contained" size="small" onClick={handleOptionOperation}>
            Opsiyon İşlemi Yap
          </Button>
        </Stack>
      </Stack>

      <Box mt={1.5} sx={{ height: 594, width: 1 }}>
        <OrdersStatusTable searchText={searchText} />
      </Box>
    </Paper>
  );
};

export default OrdersStatus;
