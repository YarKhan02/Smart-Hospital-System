package services

import (
	"fmt"
	"net/http"
	"time"

	"github.com/YarKhan02/Smart-Hospital-System/lib"
	"github.com/YarKhan02/Smart-Hospital-System/oauth"
	"github.com/labstack/echo/v4"
)

type Medicine struct {
	Name      string `json:"medicine" db:"medicine"`
	Frequency string `json:"frequency" db:"frequency"`
	Dosage    string `json:"dosage" db:"dosage"`
	Duration  string `json:"duration" db:"duration"`
}

// PatientHistory represents the patient's history details.
type PatientHistory struct {
	Date       time.Time  `json:"appointment_date" db:"appointment_date"`
	Diagnosis  string     `json:"diagnosis" db:"diagnosis"`
	Notes      string     `json:"notes" db:"notes"`
	Medicines  []Medicine `json:"medicines"`
}

type AppointmentUUID struct {
    UUID      string `json:"appointment_uuid" form:"appointment_uuid"`
}

type P_UUID struct {
    UUID string `json:"patient_uuid" db:"patient_uuid"`
}

func fetchPatientUUID(a_uuid string) (string, error) {
	sql := lib.Template("patientUUID")

	params := []interface{}{a_uuid}

	var p_uuid P_UUID

	err := lib.QueryObject(sql, &p_uuid, params)
	if err != nil {
		return "", fmt.Errorf("error executing query %w", err)
	}

	return p_uuid.UUID, nil
} 

func FetchPatientHistory(c echo.Context) error {
	claims, ok := c.Get("claims").(*oauth.Claims)
	if !ok {
		return c.JSON(http.StatusNotFound, "")
	}

	d_uuid := claims.DoctorUUID

	fmt.Println(d_uuid)

	var data AppointmentUUID
	
	if err := c.Bind(&data); err != nil {
        return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid input"})
    }

	p_uuid, er := fetchPatientUUID(data.UUID)

	if er != nil {
		return c.JSON(http.StatusInternalServerError, er)
	}

	sql := lib.Template("patientHistory")
	
	params := []interface{}{
		p_uuid,
		d_uuid,
	}

	var histories []PatientHistory
	err := lib.QueryObjectArray(sql, &histories, params)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, histories)
}