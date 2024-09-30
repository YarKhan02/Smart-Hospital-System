package services

import (
	"context"
	
	"net/http"

	"github.com/YarKhan02/Smart-Hospital-System/lib"
	"github.com/labstack/echo/v4"
)

type Schedule struct {
	DoctorName       string    `json:"doctor_name"`
	Speciality       string	   `json:"speciality"`
	AppointmentDate  string    `json:"appoinment_date"`
	AppointmentTimeStart string `json:"appointment_time_start"`
	AppointmentTimeEnd   string `json:"appointment_time_end"`
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

		err := rows.Scan(&s.DoctorName, &s.Speciality, &s.AppointmentDate, &s.AppointmentTimeStart, &s.AppointmentTimeEnd )
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Unable to scan data"})
		}

		schedule = append(schedule, s)
	}
	return c.JSON(http.StatusOK, schedule)
}

