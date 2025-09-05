// src/components/TheatreCard.jsx
import React from "react";

const TheatreCard = ({ logoUrl, theatreName, location }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-(--md-sys-color-surface-container-low) rounded-2xl shadow-md mb-4 w-full gap-4">
      {/* Left section */}
      <div className="flex items-center">
        <img
          src={logoUrl}
          alt={`${theatreName} logo`}
          className="h-12 w-12 object-contain mr-4 rounded-lg bg-(--md-sys-color-surface-variant)"
        />
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-(--md-sys-color-on-surface)">
            {theatreName}
          </h3>
          <p className="text-sm text-(--md-sys-color-on-surface-variant)">
            {location}
          </p>
        </div>
      </div>

      {/* Button */}
      <button className="bg-(--md-sys-color-primary) text-(--md-sys-color-on-primary) font-semibold py-2 px-4 rounded-full transition-transform duration-300 hover:scale-105 shadow-sm w-full sm:w-auto h-10">
        Book Seats
      </button>
    </div>
  );
};

export default TheatreCard;
