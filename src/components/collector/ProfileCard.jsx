// ProfileCard.jsx
import React from "react";
import { Paper, Typography, Grid, Avatar, Rating } from "@mui/material";

const ProfileCard = ({ name, id, status, imageSrc, routesCompleted, avgTimeOnRoute, complaints }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper elevation={3} style={{ padding: "16px" }}>
        <Typography variant="h6">Profile</Typography>

        {/* Image and Profile Info Section */}
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar
              alt={name}
              src={imageSrc} // Use the passed image source
              sx={{ width: 100, height: 100 }} // Adjust size and make it round
            />
          </Grid>
          <Grid item>
            <Typography>Name: {name}</Typography>
            <Typography>ID: {id}</Typography>
            <Typography>Status: {status}</Typography>
          </Grid>
        </Grid>

        <Typography variant="h6" style={{ marginTop: "16px" }}>
          Performance
        </Typography>
        <Typography>Routes Completed: {routesCompleted}</Typography>
        <Typography>Average Time on Route: {avgTimeOnRoute}</Typography>
        <Typography>No. of Complaints: {complaints}</Typography>
        <Rating name="read-only" value={4} readOnly />
      </Paper>
    </Grid>
  );
};

export default ProfileCard;
