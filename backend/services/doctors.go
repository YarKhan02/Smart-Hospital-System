package services

import (
	"context"
	"net/http"
	"time"
	"github.com/labstack/echo/v4"
	"github.com/YarKhan02/Smart-Hospital-System/lib"
)

type Doctor struct {
	UUID          string    `json:"uuid"`
	DisplayName   string    `json:"display_name"`
	Speciality    string    `json:"speciality"`
	ContactInfo   int       `json:"contact_info"`
	JoinedAt      time.Time `json:"joined_at"`
}

func FetchDoctors(c echo.Context) error {
	db := lib.ConnectToDB()
    defer db.Close(context.Background())

    rows, err := db.Query(context.Background(), "SELECT uuid, display_name, speciality, contact_info, joined_at FROM public.doctors")
    if err != nil {
        return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Unable to fetch data"})
    }
    defer rows.Close()

    doctors := []Doctor{}
    for rows.Next() {
        var d Doctor
        err := rows.Scan(&d.UUID, &d.DisplayName, &d.Speciality, &d.ContactInfo, &d.JoinedAt)
        if err != nil {
            return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Unable to scan data"})
        }
        doctors = append(doctors, d)
    }
    return c.JSON(http.StatusOK, doctors)
}