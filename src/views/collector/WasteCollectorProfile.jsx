import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
} from "@mui/material"; 
import Map from "../../components/collector/Map";
import ProfileCard from "../../components/collector/ProfileCard"; 


const WasteCollectorProfile = () => {
  return (
    <Container>
      <Box 
      sx={{
        backgroundColor: '#F5F5F5', // Gray background
        borderRadius: '16px', // Rounded corners
        padding: '10px', // Padding around the text
        width: '100%', // Full width
        marginBottom: '20px', // Bottom margin
        marginTop : '20px',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Waste Collectors
      </Typography>
    </Box>
      <Grid container spacing={3}>
        {/* Use ProfileCard component */}
        <ProfileCard
          name="Sehan Devinda"
          id="IW 002"
          status="Working"
          imageSrc="../src/assets/user/defaultUser.jpg" // Pass the image source
          routesCompleted={4}
          avgTimeOnRoute="1h 30m"
          complaints="N/A"
        />

        {/* Assigned Route Section */}
        <Grid item xs={12} sm={6} md={8}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6">Assigned Route</Typography>
            <Typography>Route Assigned: Route D01</Typography>
            <Typography>Region: Colombo Suburbs</Typography>
            <Typography>From: Kadawela</Typography>
            <Typography>To: Malibbe</Typography>
            <div style={{ height: "300px", marginTop: "16px" }}>
              <Map /> {/* Placeholder for Map component */}
            </div>
            <Button variant="contained" style={{ marginTop: "16px" }}>
              View Assigned Route History
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WasteCollectorProfile;
