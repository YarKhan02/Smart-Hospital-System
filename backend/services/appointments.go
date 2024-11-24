package services

import (
	"net/http"
	"time"

	"github.com/YarKhan02/Smart-Hospital-System/lib"
	"github.com/labstack/echo/v4"
)

type Appointments struct {
	AppointmentUUId string `json:"uuid" db:"uuid"` 
	PatientName	string	`json:"patientName" db:"patient_name"`
	DoctorName	string	`json:"doctorName" db:"doctor_name"`
	AppointmentDate  time.Time `json:"appointmentDate" db:"appointment_date"`
    AppointmentStart string `json:"appointmentStart" db:"appointment_start"`
    AppointmentEnd   string `json:"appointmentEnd" db:"appointment_end"` 
}

func FetchAppointments(c echo.Context) error {
	sql := lib.Template("appointments")
	
	var result []Appointments
	
	err := lib.QueryJson(sql, &result)
	if err != nil {
		return c.JSON(http.StatusNotFound, "")
	}

	return c.JSON(http.StatusOK, result)
}