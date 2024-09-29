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
//  AppointmentDate string `json:"appointmentDate" form:"appointmentDate"`
    DoctorName      string `json:"doctorName" form:"doctorName"`
    Speciality      string `json:"speciality" form:"speciality"`
    AppointmentStart string `json:"appointmentStart" form:"appointmentStart"`
    AppointmentEnd   string `json:"appointmentEnd" form:"appointmentEnd"`
}

func PostReservation(c echo.Context) error {
    var reservation Reservation

    if err := c.Bind(&reservation); err != nil {
        return c.JSON(http.StatusBadRequest, echo.Map{"error": err.Error()})
    }

    fmt.Printf("Received reservation: %+v\n", reservation)

    return c.JSON(http.StatusOK, echo.Map{"message": "Reservation successful!"})
}