import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";

const OptimizedRouteModal = ({ open, onClose, route }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // Assuming route.locations is an array of IDs
        const locationIds = route.locations;

        // Create an array of fetch promises for each location ID
        const fetchPromises = locationIds.map((id) =>
          axios.get(`http://localhost:8080/api/clocations/${id}`)
        );

        // Resolve all promises
        const responses = await Promise.all(fetchPromises);
        // Map the responses to get the location data
        const fetchedLocations = responses.map((response) => response.data);
        setLocations(fetchedLocations); // Assuming response.data contains the location details
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    if (open) {
      fetchLocations();
    }
  }, [open, route.locations]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Optimized Route Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{route.routeName}</Typography>
        <Typography variant="body1">
          Number of Collectors: {route.collectors.length}
        </Typography>
        <Typography variant="body1">Locations:  {locations.length}</Typography>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Location ID</TableCell>
                <TableCell>Location Name</TableCell>
                <TableCell>Other Details</TableCell> {/* Adjust as needed */}
              </TableRow>
            </TableHead>
            <TableBody>
              {locations.map((location) => (
                <TableRow key={location.locationId}>
                  <TableCell>{location.locationId}</TableCell>
                  <TableCell>{location.address}</TableCell>
                  <TableCell>{location.description}</TableCell> {/* Adjust as needed */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OptimizedRouteModal;
