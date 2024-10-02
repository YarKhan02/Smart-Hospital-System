package lib

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/YarKhan02/Smart-Hospital-System/projectPath"
	"github.com/jackc/pgx/v4"
	"github.com/labstack/echo/v4"
)

var db dbConnection

type dbConnection struct {
	pool *pgx.Conn
}

func (db *dbConnection) ConnectToDB() {
	connString := "postgresql://postgres:password@db:5432/smart_hospital_system"

	// Establish a connection to the database
	pool, err := pgx.Connect(context.Background(), connString)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}

	fmt.Println("Connected to PostgreSQL!")

	db.pool = pool
}

func dbInit() {
	db.ConnectToDB()
}

func Template(args string) string {
	pathing := []string{projectpath.Root, "/", args, ".sql"}
	template_path := strings.Join(pathing, "")

	content, err := os.ReadFile(template_path)
	if err != nil {
		log.Fatal(err)
	}

	return string(content)
}

func (db *dbConnection) query(sql string) error {
	dbInit()

	db.pool.Close(context.Background())


	rows, err := db.pool.Query(context.Background(), sql)
	if err != nil {
		fmt.Println(err)
		// return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Unable to fetch data"})
	}
	defer rows.Close()

	schedule := []Schedule{}
	for rows.Next() {
		var s Schedule

		err := rows.Scan(&s.DoctorName, &s.Speciality, &s.AppointmentDate, &s.AppointmentStart, &s.AppointmentEnd)
		if err != nil {
			fmt.Println(err)
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Unable to scan data"})
		}

		schedule = append(schedule, s)
	}

	return c.JSON(http.StatusOK, schedule)
}

func Query(sql string, schedule *Schedule) error {
	return db.query(sql)
}
