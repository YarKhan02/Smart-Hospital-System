package services

import (
	"fmt"
	"net/http"

	"github.com/YarKhan02/Smart-Hospital-System/lib"
	"github.com/labstack/echo/v4"
)

type Patients struct {
    PatientName     string `json:"patient_name" db:"patient_name"`
    PatientEmail    string `json:"patient_email" db:"patient_email"`
    PatientPhone    string `json:"patient_phone" db:"patient_phone"`
}

func FetchPatients(c echo.Context) error {
	sql := lib.Template("fetchPatients")

	var result []Patients
	
	err := lib.QueryJsonArray(sql, &result)
	if err != nil {
		fmt.Println(result)
		return c.JSON(http.StatusNotFound, "")
	}

	return c.JSON(http.StatusOK, result)
}