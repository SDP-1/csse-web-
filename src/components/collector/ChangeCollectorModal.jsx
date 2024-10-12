import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import axios from "axios"; // Import axios for API calls

const ChangeCollectorModal = ({
  open,
  onClose,
  currentCollectors,
  routeId,
  routeDetails,
  onUpdateSuccess,
}) => {
  const [collectors, setCollectors] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize collectors state with currentCollectors
  useEffect(() => {
    setCollectors(currentCollectors.map((collector) => collector.toString())); // Ensure all collectors are strings
  }, [currentCollectors]);

  // Handle addition of a new collector field
  const handleAddCollector = () => {
    setCollectors([...collectors, ""]); // Add empty string for new collector input
  };

  // Handle removal of a collector field
  const handleRemoveCollector = (index) => {
    if (collectors.length > 1) {
      // Prevent removing all collector fields
      const updatedCollectors = collectors.filter((_, i) => i !== index);
      setCollectors(updatedCollectors);
    }
  };

  // Update the value of a collector field
  const handleChangeCollector = (index, value) => {
    const updatedCollectors = collectors.map((collector, i) =>
      i === index ? value : collector
    );
    setCollectors(updatedCollectors);
  };

  const handleSubmit = async () => {
    try {
      const updatedCollectors = collectors
        .filter(
          (collector) => collector.trim() !== "" && collector !== "undefined"
        )
        .map((collector) => Number(collector)); // Convert to numbers

      // Validate that at least one collector ID is provided
      if (updatedCollectors.length === 0) {
        setErrorMessage("At least one collector ID must be provided.");
        return;
      }

      console.log("Updated Collectors:", updatedCollectors); // Debugging line
      console.log("Rour ID : ", routeId);

      // Get collectors that need to be added and removed
      const collectorsToAdd = updatedCollectors.filter(
        (collector) => !currentCollectors.includes(collector)
      );
      const collectorsToRemove = currentCollectors.filter(
        (collector) => !updatedCollectors.includes(collector)
      );

      // Add new collectors
      for (const collectorId of collectorsToAdd) {
        await axios.post(
          `http://localhost:8080/api/croutes/${routeId}/collectors/${collectorId}`
        );
      }

      // Remove old collectors
      for (const collectorId of collectorsToRemove) {
        await axios.delete(
          `http://localhost:8080/api/croutes/${routeId}/collectors/${collectorId}`
        );
      }

      // Notify parent component of successful update
      onUpdateSuccess(updatedCollectors);
      onClose(); // Close modal
      alert("Route updated successfully!");
    } catch (error) {
      console.error("Error updating route:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to update route. Please try again."
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Change Collector IDs</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Current Collectors:
        </Typography>
        <Box>
          {collectors.map((collector, index) => (
            <Box key={index} display="flex" alignItems="center" mb={2}>
              <TextField
                fullWidth
                label={`Collector ID #${index + 1}`}
                variant="outlined"
                value={collector}
                onChange={(e) => handleChangeCollector(index, e.target.value)}
                // Input validation (optional)
                error={!collector.trim() && collectors.length > 1}
                helperText={
                  !collector.trim() && collectors.length > 1
                    ? "Collector ID is required."
                    : ""
                }
              />
              <IconButton
                onClick={() => handleRemoveCollector(index)}
                color="error"
                sx={{ ml: 1 }}
                aria-label="remove collector"
                disabled={collectors.length === 1} // Prevent removal if it's the last collector
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            variant="outlined"
            onClick={handleAddCollector}
            startIcon={<AddCircleOutlineIcon />}
            sx={{ mt: 2 }}
          >
            Add Collector
          </Button>
          {errorMessage && (
            <Typography color="error" variant="body2" mt={2}>
              {errorMessage}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeCollectorModal;
