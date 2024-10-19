import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas'; // For capturing charts as images
import jsPDF from 'jspdf'; // For PDF download
import NavBar from '../../components/WasteManagementAuthority/WMANavBar';
import InfoCard from '../../components/WasteManagementAuthority/InfoCard';
import { Grid, Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { Delete as DeleteIcon, People as PeopleIcon } from '@mui/icons-material';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

const wasteData = [
  { date: '01', waste: 50 },
  { date: '02', waste: 60 },
  { date: '03', waste: 70 },
  { date: '04', waste: 80 },
];

const wasteTypeData = [
  { name: 'Plastic', value: 150 },
  { name: 'Glass', value: 100 },
  { name: 'Organic', value: 200 },
  { name: 'Others', value: 80 },
];

export default function WasteCollectionHistoryPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // References for chart containers
  const areaChartRef = useRef(null);
  const pieChartRef = useRef(null);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleDrawerToggle = (open) => {
    setDrawerOpen(open);
  };

  // For PDF download
  const handlePdfDownload = async () => {
    const doc = new jsPDF();
    doc.text(`Waste Collection History for ${month}/${year}`, 10, 10);
    
    doc.text(`Total Customers: 100`, 10, 20);
    doc.text(`Total Waste Collection (kg): 500`, 10, 30);
    doc.text(`Total Waste Collection Trips: 30`, 10, 40);

    // Capture Area Chart as Image
    const areaChartCanvas = await html2canvas(areaChartRef.current);
    const areaChartImg = areaChartCanvas.toDataURL('image/png');
    doc.addImage(areaChartImg, 'PNG', 10, 50, 180, 80);

    // Capture Pie Chart as Image
    const pieChartCanvas = await html2canvas(pieChartRef.current);
    const pieChartImg = pieChartCanvas.toDataURL('image/png');
    doc.addImage(pieChartImg, 'PNG', 10, 140, 180, 80);

    doc.save(`waste_collection_history_${month}_${year}.pdf`);
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
          marginTop: '50px',
        }}
      >
        {/* Page Title - Centered */}
        <Grid container justifyContent="center">
          <h1 style={{ textAlign: 'center' }}>Waste Collection History</h1>
        </Grid>

        {/* Year and Month Selectors */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={6} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Year</InputLabel>
              <Select value={year} onChange={handleYearChange}>
                {[2022, 2023, 2024].map((y) => (
                  <MenuItem key={y} value={y}>{y}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Month</InputLabel>
              <Select value={month} onChange={handleMonthChange}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Info Cards */}
        <Grid container spacing={2} justifyContent="flex-start" sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={4}>
            <InfoCard icon={PeopleIcon} title="Total Customers" value="100" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InfoCard icon={DeleteIcon} title="Total Waste Collection (kg)" value="500" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InfoCard icon={DeleteIcon} title="Total Waste Collection" value="30 trips" />
          </Grid>
        </Grid>

        {/* Charts - 2 Columns in the Same Row */}
        <Grid container spacing={2} sx={{ marginTop: 4 }}>
          <Grid item xs={12} md={6}>
            <h3>Total Waste Collection for {month}/{year}</h3>
            <div ref={areaChartRef}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={wasteData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="waste" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <h3>Waste Types for {month}/{year}</h3>
            <div ref={pieChartRef}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={wasteTypeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {wasteTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658', '#ff8042'][index]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Grid>
        </Grid>

        {/* Download Buttons */}
        <Grid container spacing={2} sx={{ marginTop: 4 }} justifyContent="center">
          <Grid item xs={6} sm={3}>
            <Button variant="contained" color="primary" onClick={handlePdfDownload}>
              Download the Report
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
