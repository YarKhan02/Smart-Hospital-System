package lib

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"
	"github.com/jackc/pgx/v4"
	"github.com/labstack/echo/v4"
)

type Doctor struct {
	UUID          string    `json:"uuid"`
	DisplayName   string    `json:"display_name"`
	Speciality    string    `json:"speciality"`
	ContactInfo   int       `json:"contact_info"`
	JoinedAt      time.Time `json:"joined_at"`
}

func connect_to_db() *pgx.Conn {
	connString := "postgresql://postgres:password@db:5432/smart_hospital_system"

    // Establish a connection to the database
    db, err := pgx.Connect(context.Background(), connString)
    if err != nil {
        log.Fatalf("Unable to connect to database: %v", err)
    }

    fmt.Println("Connected to PostgreSQL!")

	return db
}

func fetchDoctors(c echo.Context) error {
	db := connect_to_db()

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