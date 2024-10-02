package services

import (
	// "context"
	// "fmt"
	"time"
	// "net/http"

	"github.com/YarKhan02/Smart-Hospital-System/lib"
	"github.com/labstack/echo/v4"
)

type Schedule struct {
	DoctorName       string    `json:"doctor_name"`
	Speciality       string	   `json:"speciality"`
	AppointmentDate  time.Time    `json:"appoinment_date"`
	AppointmentStart string `json:"appointment_start"`
	AppointmentEnd   string `json:"appointment_end"`
}

func FetchSchedules(c echo.Context) error {
	return lib.Query(c)
}

func query_schedules() {
	sql := lib.Template("schedules")
	var schedule Schedule
	lib.Query(sql, &schedule)
}