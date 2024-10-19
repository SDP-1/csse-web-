import { useState } from 'react';
import NavBar from '../../components/WasteManagementAuthority/WMANavBar';
import InfoCard from '../../components/WasteManagementAuthority/InfoCard';
import { Grid, Box } from '@mui/material';
import {
  People as PeopleIcon,
  Delete as DeleteIcon,
  AttachMoney as MoneyIcon,
  Business as BusinessIcon,
  LocalShipping as TruckIcon,
  RestoreFromTrash as RecycleIcon,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const earningsData = [
  { name: 'Plastic', value: 88 },
  { name: 'Glass', value: 76 },
  { name: 'Rubber', value: 110 },
  { name: 'Paper', value: 90 },
  { name: 'e-waste', value: 80 },
  { name: 'others', value: 85 },
];

const revenueData = [
  { name: 'Direct', value: 400, color: '#ff4c4c' },
  { name: 'Social', value: 300, color: '#4c6fff' },
  { name: 'Referral', value: 200, color: '#ffca4c' },
];

export default function WMADashboardPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = (open) => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar onDrawerToggle={handleDrawerToggle} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: 'margin 0.3s ease',
          marginLeft: drawerOpen ? '-70px' : '-240px',
          marginTop: '70px',
        }}
      >
        <Grid container spacing={2} justifyContent="flex-start">
          <Grid item xs={12} sm={6} md={4}>
            <InfoCard
              icon={PeopleIcon}
              title="Total Customers"
              value="88"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InfoCard
              icon={RecycleIcon}
              title="Total Garbage (Kg)"
              value="548"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InfoCard
              icon={DeleteIcon}
              title="Total Bins"
              value="88"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InfoCard
              icon={MoneyIcon}
              title="Total Revenue ($)"
              value="145,000"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InfoCard
              icon={BusinessIcon}
              title="Total Employees"
              value="10"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InfoCard
              icon={TruckIcon}
              title="Total Vehicles"
              value="4"
            />
          </Grid>

          {/* Earnings Overview Chart */}
          <Grid item xs={12} md={6}>
            <h3>Earnings Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={earningsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>

          {/* Revenue Source Pie Chart */}
          <Grid item xs={12} md={6}>
            <h3>Revenue Source</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
