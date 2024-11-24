package services

import (
	"fmt"
	"net/http"
    
	"github.com/YarKhan02/Smart-Hospital-System/lib"
	"github.com/labstack/echo/v4"
)

type Reservation struct {
    UUID      string `json:"uuid" form:"uuid"`
}

type Patient struct {
    PatientName     string `json:"patientName" form:"patientName"`
    PatientEmail    string `json:"patientEmail" form:"patientEmail"`
    PatientPhone    string `json:"patientPhone" form:"patientPhone"`
}

type PatientReservation struct {
    Patient Patient `json:"patient"`
    Reservation Reservation `json:"reservation"`
}

type UUID struct {
    UUID string `json:"uuid" db:"uuid"`
}

func patientExists(email string) (string, bool) {
    sql := lib.Template("patientExists")

    var uuid UUID
    
    params := []interface{}{email}

    lib.QueryObject(sql, &uuid, params)

    if uuid.UUID != "" {
        return uuid.UUID, true
    } else {
        return "", false
    }
}

func insertPatient(patient Patient) (string, error) {
    sql := lib.Template("patient")

    params := []interface{}{
		patient.PatientName,
		patient.PatientEmail,
		patient.PatientPhone,
	}
    
    var uuid string 
    uuid, err := lib.QueryCommit(sql, params, true)

    if err != nil {
        return "", fmt.Errorf("query insetion failed!%w", err)
    }

    return uuid, nil
}

func updateScheduleBooked(s_uuid string) error {
	sql := lib.Template("updateScheduleBook")

	params := []interface{}{s_uuid}

	err := lib.QueryUpdate(sql, params)

	if err != nil {
		return fmt.Errorf("error updating query: %v", err)
	}

	return nil
}

func insertAppointment(s_uuid string, p_uuid string) error {
    sql := lib.Template("insertAppointment")

    errs := updateScheduleBooked(s_uuid)

    if errs != nil {
        return fmt.Errorf("schedule update failed! %v", errs)
    }

    params := []interface{}{
		p_uuid,
        s_uuid,
	}
 
    _, err := lib.QueryCommit(sql, params, false)

    fmt.Println(err)

    if err != nil {
        return fmt.Errorf("query insetion failed!%w", err)
    }

    return nil
}

func PostReservation(c echo.Context) error {
    var data PatientReservation
    var p_uuid string

    if err := c.Bind(&data); err != nil {
        return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid input"})
    }

    s_uuid := data.Reservation.UUID
    p_uuid, isExists := patientExists(data.Patient.PatientEmail)

    if !isExists {
        uuid, err := insertPatient(data.Patient)
        if err != nil {
            return c.JSON(http.StatusInternalServerError, echo.Map{"message": "Reservation failed!"})
        }
        p_uuid = uuid
    }

    err := insertAppointment(s_uuid, p_uuid)

    if err != nil {
        return c.JSON(http.StatusInternalServerError, echo.Map{"message": "Reservation failed!"})   
    }

    return c.JSON(http.StatusOK, echo.Map{"message": "Reservation successful!"})
}