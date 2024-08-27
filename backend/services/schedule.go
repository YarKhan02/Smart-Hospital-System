package services

import (
	"context"
	"net/http"
	"time"
	"github.com/labstack/echo/v4"
	"github.com/YarKhan02/Smart-Hospital-System/lib"
)

type Schedule struct {
	UUID                string    `json:"uuid"`
	DoctorUUID          string    `json:"doctor_uuid"`
	AppointmentStart    time.Time `json:"appointment_start"`
	AppointmentEnd      time.Time `json:"appointment_end"`
	CreatedAt           time.Time `json:"created_at"`
}

func FetchSchedule(c echo.Context) error {
	db := lib.ConnectToDB()
    defer db.Close(context.Background())

	rows, err := db.Query(context.Background(), "SELECT uuid, doctor_uuid, appointment_start, appointment_end, created_at FROM public.schedule")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Unable to fetch data"})
	}
	defer rows.Close()

	schedule := []Schedule{}
	for rows.Next() {
		var s Schedule
		err := rows.Scan(&s.UUID, &s.DoctorUUID, &s.AppointmentStart, &s.AppointmentEnd, &s.CreatedAt)
		if err != nil {
            return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Unable to scan data"})
        }
		schedule = append(schedule, s)
	}
	return c.JSON(http.StatusOK, schedule)
}