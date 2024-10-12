import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Divider, Button } from "@mui/material"; 
import RouteList from "../../components/collector/RouteList";
import RouteDetails from "../../components/collector/RouteDetails";
import AddRouteModal from "../../components/collector/AddRouteModal"; // Adjust the path as needed

const CollectingRoute = () => {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // State for modal open/close

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/croutes");
        if (!response.ok) {
          throw new Error("Failed to fetch routes");
        }
        const data = await response.json();
        setRoutes(data);
        if (data.length > 0) {
          setSelectedRoute(data[0]);
        }
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, []);

  // Function to handle adding a new route
  const handleAddRoute = (newRoute) => {
    setRoutes((prevRoutes) => [...prevRoutes, newRoute]);
    // Optionally, you can also handle any API calls to save the new route here.
  };

  // Function to open the modal
  const handleOpen = () => setModalOpen(true);

  // Function to close the modal
  const handleClose = () => setModalOpen(false);

  return (
    <Box display="flex" sx={{ minHeight: '100vh', bgcolor: '#EDEDED' }}>
      <Container>
        <Box sx={{ padding: "32px" }}>
          <Typography variant="h4" gutterBottom>
            Waste Collection Routes
          </Typography>
          <Divider sx={{ marginBottom: "16px" }} />
          <Button variant="contained" onClick={handleOpen} sx={{ marginBottom: '16px' }}>
            Add New Route
          </Button>
          <Box display="flex">
            <Box sx={{ width: "30%", marginRight: "16px" }}>
              <RouteList routes={routes} selectedRoute={selectedRoute} onSelectRoute={setSelectedRoute} />
            </Box>
            <Box sx={{ width: "70%" }}>
              {selectedRoute && <RouteDetails route={selectedRoute} />}
            </Box>
          </Box>
        </Box>
      </Container>
      <AddRouteModal open={modalOpen} handleClose={handleClose} handleAddRoute={handleAddRoute} />
    </Box>
  );
};

export default CollectingRoute;
