package services

import (
	"fmt"
    "net/http"
    "github.com/labstack/echo/v4"
    "github.com/YarKhan02/Smart-Hospital-System/lib"
)

type Reservation struct {
 	AppointmentDate string `json:"appointmentDate" form:"appointmentDate"`
    DoctorName      string `json:"doctorName" form:"doctorName"`
    Speciality      string `json:"speciality" form:"speciality"`
    AppointmentStart string `json:"appointmentStart" form:"appointmentStart"`
    AppointmentEnd   string `json:"appointmentEnd" form:"appointmentEnd"`
}

type Patient struct {
    PatientName     string `json:"patientName" form:"patientName"`
    PatientEmail    string `json:"patientEmail" form:"patientEmail"`
    PatientPhone    string `json:"patientPhone" form:"patientPhone"`
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
    fmt.Println(sql)

    params := []interface{}{
		patient.PatientName,
		patient.PatientEmail,
		patient.PatientPhone,
	}
    
    var uuid string 
    uuid, err := lib.QueryCommit(sql, params)

    if err != nil {
        return "", fmt.Errorf("query insetion failed!\n%w", err)
    }

    return uuid, nil
}

func PostReservation(c echo.Context) error {
    var patient Patient

    if err := c.Bind(&patient); err != nil {
        return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid input"})
    }

	fmt.Printf("Received Reservation Data: %+v\n", patient)

    uuid, isExists := patientExists(patient.PatientEmail)

    if !isExists {
        uuid, err := insertPatient(patient)
        fmt.Println(uuid)
        if err != nil {
            return c.JSON(http.StatusInternalServerError, echo.Map{"message": "Reservation failed!"})
        }
    }

    fmt.Println("uuid", uuid)

    return c.JSON(http.StatusOK, echo.Map{"message": "Reservation successful!"})
}