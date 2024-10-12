import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import the close icon

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const AddRouteModal = ({ open, handleClose, handleAddRoute }) => {
  const [routeName, setRouteName] = useState("");
  const [routeDescription, setRouteDescription] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [area, setArea] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newRoute = {
      routeName,
      routeDescription,
      startLocation,
      endLocation,
      area,
      lastOptimizedDate: new Date().toISOString(),
    };

    handleAddRoute(newRoute);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Add New Route
          </Typography>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Route Name"
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Route Description"
            value={routeDescription}
            onChange={(e) => setRouteDescription(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Start Location"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="End Location"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
            margin="normal"
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="outlined" onClick={handleClose} sx={{ marginRight: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Add Route
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddRouteModal;
