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
  TextField,
} from "@mui/material";
import axios from "axios";

const OptimizedRouteModal = ({ open, onClose, route, updateRouteLocations }) => {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({ address: "", description: "" });
  const [addingLocation, setAddingLocation] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationIds = route.locations;

        const fetchPromises = locationIds.map((id) =>
          axios.get(`http://localhost:8080/api/clocations/${id}`)
        );

        const responses = await Promise.all(fetchPromises);
        const fetchedLocations = responses.map((response) => response.data);
        setLocations(fetchedLocations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    if (open) {
      fetchLocations();
    }
  }, [open, route.locations]);

  const handleAddLocation = async () => {
    try {
      // Create the new location first
      const response = await axios.post("http://localhost:8080/api/clocations", newLocation);
      const addedLocation = response.data;

      // Add the new location ID to the route
      await axios.post(`http://localhost:8080/api/croutes/${route.routeId}/clocations/${addedLocation.locationId}`);

      // Update the locations in the state
      setLocations([...locations, addedLocation]);
      updateRouteLocations([...route.locations, addedLocation.locationId]);

      // Show success alert and close the modal
      alert("Location added successfully!");
      setNewLocation({ address: "", description: "" });
      setAddingLocation(false);
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  const handleDeleteLocation = async (locationId) => {
    // Confirm deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this location?");
    if (!confirmDelete) return; // Exit if the user cancels

    try {
      // Delete the location first
      await axios.delete(`http://localhost:8080/api/clocations/${locationId}`);
      // Remove the location from the route
      await axios.delete(`http://localhost:8080/api/croutes/${route.routeId}/clocations/${locationId}`);

      // Update the locations state
      setLocations(locations.filter((loc) => loc.locationId !== locationId));
      updateRouteLocations(route.locations.filter((id) => id !== locationId)); // Remove location ID from the route
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Optimized Route Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{route.routeName}</Typography>
        <Typography variant="body1">Number of Collectors: {route.collectors.length}</Typography>
        <Typography variant="body1">Locations:</Typography>
        <Button variant="contained" onClick={() => setAddingLocation(true)}>
          Add Location
        </Button>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Location ID</TableCell>
                <TableCell>Location Name</TableCell>
                <TableCell>Other Details</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locations.map((location) => (
                <TableRow key={location.locationId}>
                  <TableCell>{location.locationId}</TableCell>
                  <TableCell>{location.address}</TableCell>
                  <TableCell>{location.description}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDeleteLocation(location.locationId)}
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add Location Modal */}
        <Dialog open={addingLocation} onClose={() => setAddingLocation(false)}>
          <DialogTitle>Add New Location</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Address"
              fullWidth
              variant="outlined"
              value={newLocation.address}
              onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              variant="outlined"
              value={newLocation.description}
              onChange={(e) => setNewLocation({ ...newLocation, description: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddingLocation(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleAddLocation} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
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
