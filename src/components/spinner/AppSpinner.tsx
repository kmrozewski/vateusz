import React from 'react';
import {Box, CircularProgress} from '@mui/material';

const AppSpinner: React.FC = () => {
  return (
    <Box sx={{padding: '8px', display: 'flex', justifyContent: 'center'}}>
      <CircularProgress />
    </Box>
  );
};

export default AppSpinner;
