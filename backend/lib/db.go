package lib

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/YarKhan02/Smart-Hospital-System/projectPath"
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

func Template(args string) string {
	pathing := []string{projectpath.Root, "/", args, ".sql"}
	template_path := strings.Join(pathing, "")

	content, err := os.ReadFile(template_path)
	if err != nil {
		log.Fatal(err)
	} 

	return string(content)
}