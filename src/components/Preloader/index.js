import "./Preloader.css";
import React from "react";
export const Preloader = () => {
  return (
    <div className="loader">
      <div className="loader__bar" />
      <div className="loader__bar" />
      <div className="loader__bar" />
      <div className="loader__bar" />
      <div className="loader__bar" />
      <div className="loader__ball" />
    </div>
  );
};
