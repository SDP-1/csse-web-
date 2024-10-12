import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";

const ChangeCollectorModal = ({
  open,
  onClose,
  currentCollectors,
  onUpdateCollectors,
}) => {
  const [collectors, setCollectors] = useState(currentCollectors.join(", "));

  const handleSubmit = () => {
    const updatedCollectors = collectors.split(",").map((id) => id.trim());
    onUpdateCollectors(updatedCollectors);
    onClose(); // Close the modal after updating
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Change Collector IDs</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Current Collectors: {currentCollectors.join(", ")}
        </Typography>
        <TextField
          fullWidth
          label="Collector IDs (comma separated)"
          variant="outlined"
          value={collectors}
          onChange={(e) => setCollectors(e.target.value)}
        />
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
