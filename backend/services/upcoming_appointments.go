package services

import (
	"net/http"
	"time"

	"github.com/YarKhan02/Smart-Hospital-System/lib"
	"github.com/labstack/echo/v4"
)

type UpcomingAppointment struct {
	AppointmentUUId string `json:"uuid" db:"uuid"` 
	PatientName	string	`json:"patient_name" db:"patient_name"`
	AppointmentDate  time.Time `json:"appointment_date" db:"appointment_date"`
    AppointmentStart string `json:"appointment_start" db:"appointment_start"`
    AppointmentEnd   string `json:"appointment_end" db:"appointment_end"` 
}

func FetchUpcomingAppointments(c echo.Context) error {
	sql := lib.Template("upcomingAppointments")
	
	var result []UpcomingAppointment
	
	err := lib.QueryJson(sql, &result)
	if err != nil {
		return c.JSON(http.StatusNotFound, "")
	}

	return c.JSON(http.StatusOK, result)
}