package services

import (
	"fmt"
	"net/http"
	"time"

	"github.com/YarKhan02/Smart-Hospital-System/lib"
	"github.com/labstack/echo/v4"
)

type Reservation struct {
    DoctorName      string `json:"doctorName" form:"doctorName"`
    Speciality      string `json:"speciality" form:"speciality"`
    AppointmentDate string `json:"appointmentDate" form:"appointmentDate"`
    AppointmentStart string `json:"appointmentStart" form:"appointmentStart"`
    AppointmentEnd   string `json:"appointmentEnd" form:"appointmentEnd"`
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

func fetchSchedulesUUID(reservation Reservation) (string, bool) {
    sql := lib.Template("scheduleUUID")

    parsedDate, err := time.Parse("01/02/2006", reservation.AppointmentDate)
    if err != nil {
        fmt.Println("error parsing appointment date: ", err)
    }

    appointmentDate := parsedDate.Format("2006-02-01")

    params := []interface{}{
        reservation.DoctorName,
        reservation.Speciality,
        appointmentDate,
        reservation.AppointmentStart,
        reservation.AppointmentEnd,
    }

    var uuid UUID

    err = lib.QueryObject(sql, &uuid, params)
    if err != nil {
        fmt.Println(err)
    }
    
    if uuid.UUID != "" {
        return uuid.UUID, true
    } else {
        return "", false
    }
}

func insertAppointment(s_uuid string, p_uuid string) error {
    sql := lib.Template("insertAppointment")

    params := []interface{}{
		p_uuid,
        s_uuid,
	}
 
    _, err := lib.QueryCommit(sql, params, false)

    if err != nil {
        return fmt.Errorf("query insetion failed!%w", err)
    }

    return nil
}

func PostReservation(c echo.Context) error {
    var data PatientReservation

    if err := c.Bind(&data); err != nil {
        return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid input"})
    }

    s_uuid, _ := fetchSchedulesUUID(data.Reservation)
    p_uuid, isExists := patientExists(data.Patient.PatientEmail)

    if !isExists {
        uuid, err := insertPatient(data.Patient)
        fmt.Println(uuid)
        if err != nil {
            return c.JSON(http.StatusInternalServerError, echo.Map{"message": "Reservation failed!"})
        }
    }

    err := insertAppointment(s_uuid, p_uuid)

    if err != nil {
        return c.JSON(http.StatusInternalServerError, echo.Map{"message": "Reservation failed!"})    
    }

    return c.JSON(http.StatusOK, echo.Map{"message": "Reservation successful!"})
}