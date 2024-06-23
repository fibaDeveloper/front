import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import IconifyIcon from 'components/base/IconifyIcon';
import RateChip from 'components/chips/RateChip';
import { fontFamily } from 'theme/typography';

interface TopCardProps {
  icon: string;
  title: string;
  value: string;
  rate: string;
  isUp: boolean;
}

const TopCard: React.FC<TopCardProps> = ({ icon, title, value, rate, isUp }) => {
  return (
    <Box
      p={2.25}
      pl={2.5}
      component={Paper}
      height={116}
      width={1}
      sx={{ marginBottom: 2 }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconifyIcon icon={icon} color="primary.main" sx={{ fontSize: 'h5.fontSize', marginRight: 1 }} />
          <Typography variant="subtitle2" color="text.secondary" fontFamily={fontFamily.workSans}>
            {title}
          </Typography>
        </Box>
        <IconButton aria-label="menu" size="small" sx={{ color: 'neutral.light', fontSize: 'h5.fontSize' }}>
          <IconifyIcon icon="solar:menu-dots-bold" />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 1.5 }}>
        <Typography variant="h3" fontWeight={600} letterSpacing={1}>
          {value}
        </Typography>
        <RateChip rate={rate} isUp={isUp} />
      </Box>
    </Box>
  );
};

export default TopCard;
