import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import Map from "./Map";
import ChangeCollectorModal from "./ChangeCollectorModal";
import OptimizedRouteModal from "./OptimizedRouteModal";
import axios from "axios"; // Ensure axios is imported for API calls

const RouteDetails = ({ route }) => {
  const [collectorModalOpen, setCollectorModalOpen] = useState(false);
  const [optimizedRouteModalOpen, setOptimizedRouteModalOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const handleOpenCollectorModal = () => {
    setCollectorModalOpen(true);
  };

  const handleCloseCollectorModal = () => {
    setCollectorModalOpen(false);
  };

  const handleOpenOptimizedRouteModal = () => {
    setOptimizedRouteModalOpen(true);
  };

  const handleCloseOptimizedRouteModal = () => {
    setOptimizedRouteModalOpen(false);
  };

  const handleOpenConfirmDelete = () => {
    setConfirmDeleteOpen(true);
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDeleteOpen(false);
  };

  const handleDeleteRoute = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/croutes/${route.routeId}`
      );
      if (response.status === 200) {
        // Optionally, handle route deletion in the parent component
        alert("Route deleted successfully!");
        handleCloseConfirmDelete();
        // Redirect or refresh the route list as necessary
      }
    } catch (error) {
      console.error("Error deleting route:", error);
      setDeleteError("Failed to delete the route. Please try again.");
    }
  };

  const handleUpdateCollectors = (updatedCollectors) => {
    console.log("Updated Collectors:", updatedCollectors);
    // Optionally, you could re-fetch or update the route data here
  };

  return (
    <Box
      sx={{
        padding: "16px",
        bgcolor: "#F5F5F5",
        borderRadius: "8px",
        boxShadow: 1,
        marginTop: -7,
      }}
    >
      <Typography variant="h6">{route.routeName}</Typography>
      <Typography variant="body1">
        Description: {route.routeDescription}
      </Typography>
      <Typography variant="body1">
        Start Location: {route.startLocation}
      </Typography>
      <Typography variant="body1">End Location: {route.endLocation}</Typography>
      <Typography variant="body1">Area: {route.area}</Typography>
      <Typography variant="body1">
        Last Optimized Date:{" "}
        {route.lastOptimizedDate
          ? new Date(route.lastOptimizedDate).toLocaleDateString()
          : "N/A"}
      </Typography>
      <Typography variant="body1">
        Collector IDs:{" "}
        {route.collectors?.length > 0 ? route.collectors.join(", ") : "N/A"}
      </Typography>
      <Typography variant="body1">
        Locations:{" "}
        {route.locations?.length > 0 ? route.locations.join(", ") : "N/A"}
      </Typography>

      <Box sx={{ height: "300px", marginTop: "16px" }}>
        <Map />
      </Box>
      <Box sx={{ display: "flex", gap: "8px", marginTop: "16px" }}>
        <Button
          variant="contained"
          sx={{ flexGrow: 1 }}
          onClick={handleOpenOptimizedRouteModal}
        >
          Optimized Route
        </Button>
        <Button
          variant="outlined"
          sx={{ flexGrow: 1 }}
          onClick={handleOpenCollectorModal}
        >
          Change Collector
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={{ flexGrow: 1 }}
          onClick={handleOpenConfirmDelete}
        >
          Delete Route
        </Button>
      </Box>

      <ChangeCollectorModal
        open={collectorModalOpen}
        onClose={handleCloseCollectorModal}
        currentCollectors={route.collectors}
        routeId={route.routeId}
        routeDetails={route}
        onUpdateSuccess={handleUpdateCollectors}
      />

      <OptimizedRouteModal
        open={optimizedRouteModalOpen}
        onClose={handleCloseOptimizedRouteModal}
        route={route}
      />

      {/* Confirmation Dialog */}
      <Dialog open={confirmDeleteOpen} onClose={handleCloseConfirmDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this route?</Typography>
          {deleteError && <Alert severity="error">{deleteError}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteRoute} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RouteDetails;
