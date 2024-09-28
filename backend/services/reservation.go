package services

import (
	"fmt"
    "net/http"
    "github.com/labstack/echo/v4"
)

type Reservation struct {
    PatientName     string `json:"patientName" form:"patientName"`
    PatientEmail    string `json:"patientEmail" form:"patientEmail"`
    PatientPhone    string `json:"patientPhone" form:"patientPhone"`
    AppointmentDate string `json:"appointmentDate" form:"appointmentDate"`
    DoctorName      string `json:"doctor_name" form:"doctor_name"`
    Speciality      string `json:"speciality" form:"speciality"`
    AppointmentStart string `json:"appointment_start" form:"appointment_start"`
    AppointmentEnd   string `json:"appointment_end" form:"appointment_end"`
}

func PostReservation(c echo.Context) error {
    var reservation Reservation

    if err := c.Bind(&reservation); err != nil {
        return c.JSON(http.StatusBadRequest, echo.Map{"error": err.Error()})
    }

    fmt.Printf("Received reservation: %+v\n", reservation)

    return c.JSON(http.StatusOK, echo.Map{"message": "Reservation successful!"})
}