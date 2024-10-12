import React from "react";

const Map = () => {
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#e0e0e0" }}>
      {/* This is where you can integrate a map */}
      {/* <p>Map Placeholder</p> */}
      <img
        src={`../src/assets/map/map.jpeg`} // Assuming the image is in the public/images directory
        alt="Default Map"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default Map;
