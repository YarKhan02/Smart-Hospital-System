package services

import (
	"time"
	"net/http"

	"github.com/YarKhan02/Smart-Hospital-System/lib"
	"github.com/labstack/echo/v4"
)

type Schedule struct {
    DoctorName       string `json:"doctor_name" db:"doctor_name"`
    Speciality       string `json:"speciality" db:"speciality"`
    AppointmentDate  time.Time `json:"appointment_date" db:"appointment_date"`
    AppointmentStart string `json:"appointment_start" db:"appointment_start"`
    AppointmentEnd   string `json:"appointment_end" db:"appointment_end"`
}

func FetchSchedules(c echo.Context) error {
	sql := lib.Template("schedules")
	
	var result []Schedule
	
	err := lib.QueryJson(sql, &result)
	if err != nil {
		return c.JSON(http.StatusNotFound, "")
	}

	return c.JSON(http.StatusOK, result)
}