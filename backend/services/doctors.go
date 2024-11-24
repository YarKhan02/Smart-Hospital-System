package services

import (
	"fmt"
	"net/http"

	"github.com/YarKhan02/Smart-Hospital-System/lib"
	"github.com/labstack/echo/v4"
)

type Doctor struct {
	DoctorName   string    `json:"doctorName" db:"doctor_name"`
	Speciality   string    `json:"speciality" db:"speciality"`
}

func FetchDoctors(c echo.Context) error {
	sql := lib.Template("doctors")

	var doctors []Doctor

	err := lib.QueryJson(sql, &doctors)
	
	if err != nil {
		return c.JSON(http.StatusNotFound, "Error fetching doctors")
	}

	fmt.Println(doctors)

	return c.JSON(http.StatusOK, doctors)
}