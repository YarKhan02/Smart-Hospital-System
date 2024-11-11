package services

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

// Medication structure
type Medication struct {
	Name      string `json:"name"`
	Dosage    string `json:"dosage"`
	Frequency string `json:"frequency"`
	Duration  string `json:"duration"`
}

// Reservation structure
type Appointment struct {
	UUID string `json:"uuid"`
}

// MedicationRequest structure
type MedicationRequest struct {
	Medications []Medication `json:"medications"`
}

// ReservationRequest structure
type AppointmentRequest struct {
	Medication  MedicationRequest `json:"medication"`
	Appointment Appointment       `json:"reservation"`
}

// Handler function for processing reservations
func PostMedication(c echo.Context) error {
	var req AppointmentRequest

	// Bind the incoming JSON body to the struct
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}

	// Access the medications array
	medications := req.Medication.Medications
	for _, med := range medications {
		fmt.Printf("Medication: %s, Dosage: %s, Frequency: %s, Duration: %s\n",
			med.Name, med.Dosage, med.Frequency, med.Duration)
	}

	// Save reservation and medications to the database (if needed)
	// ...

	// Respond with a success message
	return c.JSON(http.StatusOK, map[string]string{"message": "Data saved successfully"})
}