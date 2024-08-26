package main

import (
	// "encoding/json"
	// "context"
	// "fmt"
	// "log"
	"time"
	// "net/http"
	// "github.com/jackc/pgx/v4"
	"github.com/labstack/echo/v4"
	"github.com/YarKhan02/Smart-Hospital-System/backend/lib"
)

type Schedule struct {
	UUID                string    `json:"uuid"`
	DoctorUUID          string    `json:"doctor_uuid"`
	AppointmentStart    time.Time `json:"appointment_start"`
	AppointmentEnd      time.Time `json:"appointment_end"`
	CreatedAt           time.Time `json:"created_at"`
}

func fetchDoctors(c echo.Context) error {
	return lib.fetchDoctors(c)
}

// func fetchSchedule(c echo.Context) error {
// 	db := connect_to_db()

// 	rows, err := db.Query(context.Background(), "SELECT uuid, doctor_uuid, appointment_start, appointment_end, created_at FROM public.schedule")
// 	if err != nil {
// 		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Unable to fetch data"})
// 	}
// 	defer rows.Close()

// 	schedule := []Schedule{}
// 	for rows.Next() {
// 		var s Schedule
// 		err := rows.Scan(&s.UUID, &s.DoctorUUID, &s.AppointmentStart, &s.AppointmentEnd, &s.CreatedAt)
// 		if err != nil {
//             return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Unable to scan data"})
//         }
// 		schedule = append(schedule, s)
// 	}
// 	return c.JSON(http.StatusOK, schedule)
// }

func main() {
	app := echo.New()

	app.GET("/doctors", fetchDoctors)
	// app.GET("/schedule", fetchSchedule)

	app.Start(":4567")
}