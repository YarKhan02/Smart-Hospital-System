import React from "react";
import { Fab, Box, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ScheduleIcon from "@mui/icons-material/Event";
import AppointmentIcon from "@mui/icons-material/Assignment";
import DoctorIcon from "@mui/icons-material/LocalHospital";
import PatientQueryIcon from "@mui/icons-material/QuestionAnswer";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#e3f2fd",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating Button 1: Schedule */}
      <motion.div
        whileHover={{ scale: 1.2, rotate: 15 }}
        whileTap={{ scale: 0.8 }}
        style={{
          position: "absolute",
          top: "10%",
          right: "10%",
          transform: "scale(1.1)",
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10 }}
      >
        <Tooltip title="Schedule" placement="top" arrow>
          <Fab color="primary" onClick={() => navigate("/schedules")}>
            <ScheduleIcon />
          </Fab>
        </Tooltip>
      </motion.div>

      {/* Floating Button 2: Appointments */}
      <motion.div
        whileHover={{ scale: 1.2, rotate: 15 }}
        whileTap={{ scale: 0.8 }}
        style={{
          position: "absolute",
          top: "30%",
          right: "10%",
        }}
      >
        <Tooltip title="Apointments" placement="top" arrow>
          <Fab color="secondary" onClick={() => navigate("/appointments")}>
            <AppointmentIcon />
          </Fab>
        </Tooltip>
      </motion.div>

      {/* Floating Button 3: Available Doctors */}
      <motion.div
        whileHover={{ scale: 1.2, rotate: 15 }}
        whileTap={{ scale: 0.8 }}
        style={{
          position: "absolute",
          top: "30%",
          right: "30%",
        }}
      >
        <Tooltip title="Doctors" placement="top" arrow>
          <Fab color="success" onClick={() => navigate("/doctors")}>
            <DoctorIcon />
          </Fab>
        </Tooltip>
      </motion.div>

      {/* Floating Button 4: Patient Query */}
      <motion.div
        whileHover={{ scale: 1.2, rotate: 15 }}
        whileTap={{ scale: 0.8 }}
        style={{
          position: "absolute",
          top: "10%",
          right: "30%",
        }}
      >
        <Tooltip title="Pateint Qery" placement="top" arrow>
          <Fab color="error" onClick={() => navigate("/patient-query")}>
            <PatientQueryIcon />
          </Fab>
        </Tooltip>
      </motion.div>
    </Box>
  );
};

export default Dashboard;