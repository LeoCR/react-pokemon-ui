import React from "react";

export const Preloader = () => {
  return (
    <div style={{ margin: "0 auto", textAlign: "center" }}>
      <div className="spinner-grow text-danger" role="status"></div>
      <div className="spinner-grow text-success" role="status"></div>
      <div className="spinner-grow text-primary" role="status"></div>
      <div className="spinner-grow text-info" role="status"></div>
      <div className="spinner-grow text-light" role="status"></div>
    </div>
  );
};
