package services

import (
	"fmt"
	"net/http"

	"github.com/YarKhan02/Smart-Hospital-System/lib"
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

type Description struct {
	Notes string `json:"notes"`
	Diagnosis string `json:"diagnosis"`
}

type AppointmentRequest struct {
	Medication  MedicationRequest `json:"medication"`
	Appointment Appointment       `json:"reservation"`
	Description Description 	  `json:"description"`
}

func postDescription(description Description) (string, error) {
	sql := lib.Template("description")

	fmt.Println(sql)

	params := []interface{}{
		description.Diagnosis,
		description.Notes,
	}

	uuid, err := lib.QueryCommit(sql, params, true)

	fmt.Println(err)

    if err != nil {
        return "", fmt.Errorf("query insetion failed!%w", err)
    }

    return uuid, nil
}

func postMedicine(a_uuid string, d_uuid string, meds []Medication) error {
	sql := lib.Template("medicine")

	for _, med := range meds {
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
			return fmt.Errorf("failed! %w", err)
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

	err = postMedicine(req.Appointment.UUID, d_uuid, req.Medication.Medications)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Data failed to store!"})
	}

	return c.JSON(http.StatusOK, map[string]string{"message": "Data saved successfully"})
}