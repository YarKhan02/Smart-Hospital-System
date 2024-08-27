package lib

import (
	"context"
	"fmt"
	"log"
	"github.com/jackc/pgx/v4"
)

func ConnectToDB() *pgx.Conn {
	connString := "postgresql://postgres:password@db:5432/smart_hospital_system"

    // Establish a connection to the database
    db, err := pgx.Connect(context.Background(), connString)
    if err != nil {
        log.Fatalf("Unable to connect to database: %v", err)
    }

    fmt.Println("Connected to PostgreSQL!")

	return db
}