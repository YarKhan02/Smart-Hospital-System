package services

import (
	"context"
	"net/http"
	"time"

	"github.com/YarKhan02/Smart-Hospital-System/lib"
	"github.com/labstack/echo/v4"
)

type Schedule struct {
	DoctorName       string    `json:"doctor_name"`
	Speciality       string	   `json:"speciality"`
	AppointmentDate  string    `json:"appoinment_date"`
	AppointmentStart time.Time `json:"appointment_start"`
	AppointmentEnd   time.Time `json:"appointment_end"`
}

func FetchSchedules(c echo.Context) error {
	db := lib.ConnectToDB()
	defer db.Close(context.Background())

	sql := lib.Template("schedules")

	rows, err := db.Query(context.Background(), sql)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Unable to fetch data"})
	}
	defer rows.Close()

	schedule := []Schedule{}
	for rows.Next() {
		var s Schedule
		err := rows.Scan(&s.DoctorName, &s.Speciality, &s.AppointmentStart, &s.AppointmentEnd)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Unable to scan data"})
		}

		s.AppointmentDate = AppointmentStart.Format("01/02/2006") 
		s.AppointmentStart = AppointmentStart.Format("3:04 PM") 
		s.AppointmentEND = AppointmentEnd.Format("3:04 PM") 

		schedule = append(schedule, s)
	}
	return c.JSON(http.StatusOK, schedule)
}
