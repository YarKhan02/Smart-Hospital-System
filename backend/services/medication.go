package services

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

type Medication struct {
	Name      string `json:"name"`
	Dosage    string `json:"dosage"`
	Frequency string `json:"frequency"`
	Duration  string `json:"duration"`
}

type Appointment struct {
	UUID string `json:"uuid"`
}

type MedicationRequest struct {
	Medications []Medication `json:"medications"`
}

type Descripton struct {
	Notes string `json:"notes"`
	Diagnosis string `json:"diagnosis"`
}

type AppointmentRequest struct {
	Medication  MedicationRequest `json:"medication"`
	Appointment Appointment       `json:"reservation"`
	Description Descripton 		  `json:"description"`
}

func postDescription(description Description) (string, error) {
	sql := lib.Template("description")

	params := []interface{}{
		description.Diagnosis,
		description.Notes,
	}

	uuid, err := lib.QueryCommit(sql, params, true)

    if err != nil {
        return "", fmt.Errorf("query insetion failed!%w", err)
    }

    return uuid, nil
}

func postMedicine(a_uuid string, d_uuid string, meds MedicationRequest) error {
	sql := lib.Template("medicine")

	for _, med := range med {
		params := []interface{}{
			a_uuid,
			med.Name,
			med.Dosage,
			med.Frequency,
			med.Duration,
			d_uuid,
		}
		_, err := lib.QueryCommit(sql, params, false)

		if err != nil {
			return c.JSON(http.StatusInternalServerError, echo.Map{"message": "Failed!"})
		}
	}
	return nil
}

func PostMedication(c echo.Context) error {
	var req AppointmentRequest

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}

	fmt.Println(req)

	d_uuid, err := postDescription(req.Description)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"message": "Failed!"})
	}

	fmt.Println(d_uuid)

	return c.JSON(http.StatusOK, map[string]string{"message": "Data saved successfully"})
}