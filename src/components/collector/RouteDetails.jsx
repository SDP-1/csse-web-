import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Map from "./Map";
import ChangeCollectorModal from "./ChangeCollectorModal";

const RouteDetails = ({ route }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleUpdateCollectors = (updatedCollectors) => {
    console.log("Updated Collectors:", updatedCollectors);
  };

  return (
    <Box
      sx={{
        padding: "16px",
        bgcolor: "#F5F5F5",
        borderRadius: "8px",
        boxShadow: 1,
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
        <Button variant="contained" sx={{ flexGrow: 1 }}>
          Optimized Route
        </Button>
        <Button
          variant="outlined"
          sx={{ flexGrow: 1 }}
          onClick={handleOpenModal}
        >
          Change Collector
        </Button>
      </Box>

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
