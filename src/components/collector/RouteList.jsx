import React, { useState } from "react";
import { Box, List, ListItem, ListItemText, TextField } from "@mui/material";

const RouteList = ({ routes, selectedRoute, onSelectRoute }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter routes based on the search term
  const filteredRoutes = routes.filter(route =>
    route.routeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: '16px', bgcolor: 'white', borderRadius: '8px', boxShadow: 1 }}>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
      />
      <List>
        {filteredRoutes.map((route) => (
          <ListItem
            button
            onClick={() => onSelectRoute(route)}
            key={route.routeId} // Use routeId instead of id
            sx={{
              backgroundColor: selectedRoute?.routeId === route.routeId ? "#e3f2fd" : "transparent", // Highlight the selected route
              '&:hover': {
                backgroundColor: selectedRoute?.routeId === route.routeId ? "#bbdefb" : "#f5f5f5", // Change hover color for the selected route
              }
            }}
          >
            <ListItemText primary={route.routeName} /> {/* Use routeName instead of name */}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RouteList;
