import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";



export default function ProtectedRoute({ children }) {

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}