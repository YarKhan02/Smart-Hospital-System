package lib

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/YarKhan02/Smart-Hospital-System/projectPath"
	"github.com/georgysavva/scany/pgxscan"
	"github.com/jackc/pgx/v4"
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

	// fmt.Println("Connected to PostgreSQL!")

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

// returns multiple rows based on sql query (no parameters)
func (db *dbConnection) query_json_array(sql string, result interface{}) error {
	dbInit()
	defer db.pool.Close(context.Background())

	err := pgxscan.Select(context.Background(), db.pool, result, sql)
	// fmt.Println(err)
	if err != nil {
		return fmt.Errorf("error executing query: %v", err)
	}

	return nil
}

// returns single row based on sql query (no parameters)
func (db *dbConnection) query_json(sql string, result interface{}) error {
	dbInit()
	defer db.pool.Close(context.Background())

	err := pgxscan.Get(context.Background(), db.pool, result, sql)
	// fmt.Println(err)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil
		}
		return fmt.Errorf("error executing query: %v", err)
	}
	return nil
}


// returns multiple rows based on sql query (parameter)
func (db *dbConnection) query_object_array(sql string, result interface{}, params []interface{}) error {
	dbInit()
	defer db.pool.Close(context.Background())

	err := pgxscan.Select(context.Background(), db.pool, result, sql, params...)
	// fmt.Println(err)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil // No rows found, but not necessarily an error
		}
		return fmt.Errorf("error executing query: %w", err)
	}
	return nil
}


// returns single row based on sql query (parameters)
func (db *dbConnection) query_object(sql string, result interface{}, params []interface{}) error {
	dbInit()
	defer db.pool.Close(context.Background())

	err := pgxscan.Get(context.Background(), db.pool, result, sql, params...)
	// fmt.Println(err)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil
		}
		return fmt.Errorf("error executing query: %v", err)
	}
	return nil
}

// updates row based on sql query (parameters)
func (db *dbConnection) query_update(sql string, params []interface{}) error {
	dbInit()
	defer db.pool.Close(context.Background())

	_, err := db.pool.Exec(context.Background(), sql, params...)
	if err != nil {
		return fmt.Errorf("error executing update query: %v", err)
	}
	return nil
}

// deletes rows based on SQL query (parameters)
func (db *dbConnection) query_delete(sql string, params []interface{}) error {
	dbInit()
	defer db.pool.Close(context.Background())

	_, err := db.pool.Exec(context.Background(), sql, params...)
	if err != nil {
		return fmt.Errorf("error executing delete query: %v", err)
	}
	return nil
}

// commit based on sql query (parameters) return uuid or not
func (db *dbConnection) query_commit(sql string, params []interface{}, returnUUID bool) (string, error) {
	dbInit()
	defer db.pool.Close(context.Background())

	if returnUUID {
		var uuid string
		err := db.pool.QueryRow(context.Background(), sql, params...).Scan(&uuid)
		if err != nil {
			return "", fmt.Errorf("error executing insert query: %v", err)
		}
		return uuid, nil
	} else {
		_, err := db.pool.Exec(context.Background(), sql, params...)
		if err != nil {
			return "", fmt.Errorf("error executing insert query: %v", err)
		}
		return "", nil
	}
}

func QueryJsonArray(sql string, result interface{}) error {
	return db.query_json_array(sql, result)
}

func QueryJson(sql string, result interface{}) error {
	return db.query_json(sql, result)
}

func QueryObject(sql string, result interface{}, params []interface{}) error {
	return db.query_object(sql, result, params)
}

func QueryObjectArray(sql string, result interface{}, params []interface{}) error {
	return db.query_object_array(sql, result, params)
}

func QueryUpdate(sql string, params []interface{}) error {
	return db.query_update(sql, params)
}

func QueryDelete(sql string, params []interface{}) error {
	return db.query_delete(sql, params)
}

func QueryCommit(sql string, params []interface{}, returnUUID bool) (string, error) {
	return db.query_commit(sql, params, returnUUID)
}