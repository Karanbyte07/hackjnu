import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const StudentPortal = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/attendance", { replace: true });
  }, [navigate]);
  return null;
};

export default StudentPortal;
