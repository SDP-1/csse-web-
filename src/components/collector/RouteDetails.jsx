import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Map from "./Map"; // Assume you have a Map component
import ChangeCollectorModal from "./ChangeCollectorModal"; // Import the new modal component

const RouteDetails = ({ route }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleUpdateCollectors = (updatedCollectors) => {
    // Logic to update collectors in your state or API
    console.log("Updated Collectors:", updatedCollectors);
  };

  return (
    <Box sx={{ padding: "16px", bgcolor: "#F5F5F5", borderRadius: "8px", boxShadow: 1 }}>
      <Typography variant="h6">{route.routeName}</Typography>
      <Typography variant="body1">Description: {route.routeDescription}</Typography>
      <Typography variant="body1">Start Location: {route.startLocation}</Typography>
      <Typography variant="body1">End Location: {route.endLocation}</Typography>
      <Typography variant="body1">Area: {route.area}</Typography>
      <Typography variant="body1">
        Last Optimized Date: {route.lastOptimizedDate ? new Date(route.lastOptimizedDate).toLocaleDateString() : 'N/A'}
      </Typography>
      <Typography variant="body1">Collector IDs: {route.collectors ? route.collectors.join(", ") : 'N/A'}</Typography>

      <Box sx={{ height: "300px", marginTop: "16px" }}>
        <Map /> {/* Placeholder for Map component */}
      </Box>
      <Box sx={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <Button variant="contained" sx={{ flexGrow: 1 }}>
          Optimized Route
        </Button>
        <Button variant="outlined" sx={{ flexGrow: 1 }} onClick={handleOpenModal}>
          Change Collector
        </Button>
      </Box>

      {/* Modal for changing collectors */}
      <ChangeCollectorModal
        open={modalOpen}
        onClose={handleCloseModal}
        currentCollectors={route.collectors}
        onUpdateCollectors={handleUpdateCollectors}
      />
    </Box>
  );
};

export default RouteDetails;
