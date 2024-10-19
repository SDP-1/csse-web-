import React, { useState } from 'react';
import { Box, Grid, TextField, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, TablePagination, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/material/styles';
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

const WasteCollectionRequests = () => {
  const initialRows = [
    { id: 1, requestId: 'R001', user: 'User A', location: 'Location 1', wasteTitle: 'Plastic', date: '2024-10-10', status: 'Pending' },
    { id: 2, requestId: 'R002', user: 'User B', location: 'Location 2', wasteTitle: 'Glass', date: '2024-10-11', status: 'Pending' },
    { id: 3, requestId: 'R003', user: 'User C', location: 'Location 3', wasteTitle: 'Paper', date: '2024-10-12', status: 'Pending' },
  ];

  const [rows, setRows] = useState(initialRows);
  const [filteredRows, setFilteredRows] = useState(initialRows);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    setSearchValue(search);
    const filtered = rows.filter(row =>
      row.requestId.toLowerCase().includes(search) ||
      row.user.toLowerCase().includes(search) ||
      row.status.toLowerCase().includes(search)
    );
    setFilteredRows(filtered);
  };

  const handleDrawerToggle = (open) => {
    setDrawerOpen(open);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, status: newStatus } : row
    );
    setRows(updatedRows);
    setFilteredRows(updatedRows);
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
          <Grid item xs={12}>
            <TextField
              label="Search by Request ID, User, or Status"
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

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>No.</StyledTableCell>
                    <StyledTableCell>Request ID</StyledTableCell>
                    <StyledTableCell>User</StyledTableCell>
                    <StyledTableCell>Location</StyledTableCell>
                    <StyledTableCell>Waste Title</StyledTableCell>
                    <StyledTableCell>Requested Date</StyledTableCell>
                    <StyledTableCell sx={{ width: '150px' }}>Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : filteredRows
                  ).map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell>{row.id}</StyledTableCell>
                      <StyledTableCell>{row.requestId}</StyledTableCell>
                      <StyledTableCell>{row.user}</StyledTableCell>
                      <StyledTableCell>{row.location}</StyledTableCell>
                      <StyledTableCell>{row.wasteTitle}</StyledTableCell>
                      <StyledTableCell>{row.date}</StyledTableCell>
                      <StyledTableCell sx={{ width: '150px' }}>
                        <Select
                          value={row.status}
                          onChange={(e) => handleStatusChange(row.id, e.target.value)}
                          fullWidth
                          size="small" // Reduce the dropdown height
                          sx={{
                            height: '40px', // Set the fixed height for the select dropdown
                            minWidth: '120px', // Ensure minimum width
                          }}
                        >
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Approved">Approved</MenuItem>
                          <MenuItem value="Completed">Completed</MenuItem>
                          <MenuItem value="Rejected">Rejected</MenuItem>
                        </Select>
                      </StyledTableCell>
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
        </Grid>
      </Box>
    </Box>
  );
};

export default WasteCollectionRequests;
