import { useState } from 'react';
import { Box, Grid, Button, TextField, MenuItem, InputAdornment, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, TablePagination } from '@mui/material';
import { CSVLink } from 'react-csv';
import { styled } from '@mui/material/styles';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import SearchIcon from '@mui/icons-material/Search';
import NavBar from '../../components/WasteManagementAuthority/WMANavBar';

// Styled components for TableCell and TableRow
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.MuiTableCell-head`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.MuiTableCell-body`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const WasteDataTable = () => {
  const rows = [
    { id: 1, collectorId: 'C001', date: '2024-10-12', wasteType: 'Plastic', zone: 'R001' },
    { id: 2, collectorId: 'C002', date: '2024-10-13', wasteType: 'Glass', zone: 'R002' },
    { id: 3, collectorId: 'C002', date: '2024-10-14', wasteType: 'Paper', zone: 'R002' },
    { id: 4, collectorId: 'C003', date: '2024-10-15', wasteType: 'Plastic', zone: 'R003' },
    { id: 5, collectorId: 'C005', date: '2024-10-13', wasteType: 'Glass', zone: 'R001' },
    { id: 6, collectorId: 'C001', date: '2024-10-12', wasteType: 'Paper', zone: 'R004' },
    { id: 7, collectorId: 'C004', date: '2024-10-14', wasteType: 'Plastic', zone: 'R002' },
    { id: 8, collectorId: 'C003', date: '2024-10-16', wasteType: 'Glass', zone: 'R003' },
    { id: 9, collectorId: 'C001', date: '2024-10-12', wasteType: 'Plastic', zone: 'R001' },
    { id: 10, collectorId: 'C002', date: '2024-10-13', wasteType: 'Glass', zone: 'R002' },
    { id: 11, collectorId: 'C002', date: '2024-10-14', wasteType: 'Paper', zone: 'R002' },
    { id: 12, collectorId: 'C003', date: '2024-10-15', wasteType: 'Plastic', zone: 'R003' },
    { id: 13, collectorId: 'C005', date: '2024-10-13', wasteType: 'Glass', zone: 'R001' },
    { id: 14, collectorId: 'C001', date: '2024-10-12', wasteType: 'Paper', zone: 'R004' },
    { id: 15, collectorId: 'C004', date: '2024-10-14', wasteType: 'Plastic', zone: 'R002' },
    { id: 16, collectorId: 'C003', date: '2024-10-16', wasteType: 'Glass', zone: 'R003' },
  ];

  const [filteredRows, setFilteredRows] = useState(rows);
  const [searchValue, setSearchValue] = useState('');
  const [collectorId, setCollectorId] = useState('');
  const [date, setDate] = useState('');
  const [wasteType, setWasteType] = useState('');
  const [zone, setZone] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleDrawerToggle = (open) => {
    setDrawerOpen(open);
  };

  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    setSearchValue(search);
    const filtered = rows.filter(row =>
      row.collectorId.toLowerCase().includes(search) ||
      row.wasteType.toLowerCase().includes(search)
    );
    setFilteredRows(filtered);
  };

  const handleFilter = () => {
    let filtered = rows;

    if (collectorId) {
      filtered = filtered.filter(row => row.collectorId === collectorId);
    }
    if (date) {
      filtered = filtered.filter(row => row.date === date);
    }
    if (wasteType) {
      filtered = filtered.filter(row => row.wasteType === wasteType);
    }
    if (zone) {
      filtered = filtered.filter(row => row.zone === zone);
    }

    setFilteredRows(filtered);
    setPage(0); // Reset page to 0 when applying filters
  };

  const exportAsPDF = () => {
    const doc = new jsPDF();
    doc.text('Waste Collection Data', 20, 10);
    doc.autoTable({
      head: [['No.', 'Collector ID', 'Collection Date', 'Waste Type', 'Collection Zone']],
      body: filteredRows.map((row) => [row.id, row.collectorId, row.date, row.wasteType, row.zone]),
    });
    doc.save('waste_data.pdf');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to page 0 when changing rows per page
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
        <Grid container spacing={2}>
          {/* Table Section (Right) */}
          <Grid item xs={12} sm={9}>
            {/* Search Bar at the top */}
            <TextField
              label="Search by Collector ID or Waste Type"
              variant="outlined"
              value={searchValue}
              onChange={handleSearch}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            {/* Customized MUI Table */}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>No.</StyledTableCell>
                    <StyledTableCell>Collector ID</StyledTableCell>
                    <StyledTableCell>Collection Date</StyledTableCell>
                    <StyledTableCell>Waste Type</StyledTableCell>
                    <StyledTableCell>Collection Zone</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : filteredRows
                  ).map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell>{row.id}</StyledTableCell>
                      <StyledTableCell>{row.collectorId}</StyledTableCell>
                      <StyledTableCell>{row.date}</StyledTableCell>
                      <StyledTableCell>{row.wasteType}</StyledTableCell>
                      <StyledTableCell>{row.zone}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[8, 50, 100]}
                      count={filteredRows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Grid>

          {/* Filter Section (Left) */}
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" sx={{ mb: 2 }}>Filter</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Filter by Collector ID */}
              <TextField
                select
                label="Collector ID"
                value={collectorId}
                onChange={(e) => setCollectorId(e.target.value)}
                variant="outlined"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="C001">C001</MenuItem>
                <MenuItem value="C002">C002</MenuItem>
              </TextField>

              {/* Filter by Date */}
              <TextField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              {/* Filter by Waste Type */}
              <TextField
                select
                label="Waste Type"
                value={wasteType}
                onChange={(e) => setWasteType(e.target.value)}
                variant="outlined"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Plastic">Plastic</MenuItem>
                <MenuItem value="Glass">Glass</MenuItem>
                <MenuItem value="Paper">Paper</MenuItem>
              </TextField>

              {/* Filter by Zone */}
              <TextField
                select
                label="Zone"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                variant="outlined"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="R001">R001</MenuItem>
                <MenuItem value="R002">R002</MenuItem>
              </TextField>

              {/* Filter Buttons */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" onClick={handleFilter}>Apply Filters</Button>
                <Button variant="contained" onClick={() => { setFilteredRows(rows); setPage(0); }}>Reset Filters</Button>
              </Box>

              {/* Export Buttons */}
              <Typography variant="h6" sx={{ mt: 3}}>Export Data</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" onClick={exportAsPDF}>Export as PDF</Button>
                <CSVLink data={filteredRows} filename={"waste_data.csv"}>
                  <Button variant="contained">Export as CSV</Button>
                </CSVLink>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default WasteDataTable;
