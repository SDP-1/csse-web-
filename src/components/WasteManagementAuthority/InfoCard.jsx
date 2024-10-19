// InfoCard.jsx
// import React from 'react';
import { Card, Typography, Box } from '@mui/material';

const InfoCard = ({ icon: Icon, title, value }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#A3D9C9', // Light greenish background
        minWidth: 200,
      }}
    >
      <Icon sx={{ fontSize: 40, marginRight: 2, color: '#2E7D6F' }} />
      <Box>
        <Typography variant="h6" component="div" color="#2E7D6F">
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold" color="#00352F">
          {value}
        </Typography>
      </Box>
    </Card>
  );
};

export default InfoCard;
