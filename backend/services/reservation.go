package services

import (
    "context"
	"fmt"
    "net/http"
    "github.com/labstack/echo/v4"
    "github.com/YarKhan02/Smart-Hospital-System/lib"
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

    db := lib.ConnectToDB()
    defer db.Close(context.Background())

    var reservation Reservation

    if err := c.Bind(&reservation); err != nil {
        return c.JSON(http.StatusBadRequest, echo.Map{"error": err.Error()})
    }

    sql := lib.Template("addPatientDuringReservation")

    row := db.QueryRow(context.Background(), sql, reservation.PatientName, reservation.PatientPhone, reservation.PatientEmail)
    
    var patientUUID string
    err := row.Scan(&patientUUID)
    if err != nil {
        return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Unable to process reservation"})
    }

    fmt.Printf("Received reservation: %+v\n", reservation)

    return c.JSON(http.StatusOK, echo.Map{"message": "Reservation successful!"})
}