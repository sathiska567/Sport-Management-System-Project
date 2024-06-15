// manage_user.jsx
import React from "react";

const Email = () => {
  return (
    <div className="email-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="55"
        height="55"
        style={{ 
          marginLeft: "40%",
          marginBottom: "5%",
        }}
        viewBox="0 0 16 14"
      >
        <path
          fill="white"
          d="M14.5 13h-13C.67 13 0 12.33 0 11.5v-9C0 1.67.67 1 1.5 1h13c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5M1.5 2c-.28 0-.5.22-.5.5v9c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-9c0-.28-.22-.5-.5-.5z"
        />
        <path
          fill="white"
          d="M8 8.96c-.7 0-1.34-.28-1.82-.79L.93 2.59c-.19-.2-.18-.52.02-.71c.2-.19.52-.18.71.02l5.25 5.58c.57.61 1.61.61 2.18 0l5.25-5.57c.19-.2.51-.21.71-.02c.2.19.21.51.02.71L9.82 8.18c-.48.51-1.12.79-1.82.79Z"
        />
      </svg>
    </div>
  );
};

export default Email;
