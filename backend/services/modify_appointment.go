package services

import (
	"fmt"
	"net/http"

	"github.com/YarKhan02/Smart-Hospital-System/lib"
	"github.com/labstack/echo/v4"
)

// RequestPayload represents the structure of the incoming JSON
type RequestPayload struct {
	AppointmentUUID string `json:"appointmentUUID"`
	ScheduleUUID    string `json:"scheduleUUID"`
}

type ScheduleUUID struct {
    UUID string `json:"uuid" db:"schedule_uuid"`
}

func updateScheduleAvailable(s_uuid string) error {
	sql := lib.Template("updateScheduleAvailable")

	params := []interface{}{s_uuid}

	err := lib.QueryUpdate(sql, params)

	if err != nil {
		return fmt.Errorf("error updating query: %v", err)
	}

	return nil
}

func currentSchuduleUUID(a_uuid string) error {
	sql := lib.Template("scheduleStatus")

	params := []interface{}{a_uuid}

	var s_uuid ScheduleUUID

	errs := lib.QueryObject(sql, &s_uuid, params)

	if errs != nil {
		return fmt.Errorf("error fetching schedule uuid: %v", errs)
	}
	
	errm := updateScheduleAvailable(s_uuid.UUID)

	if errm != nil {
		return fmt.Errorf("error updating query: %v", errm)
	}

	return nil
}

func updateScheduleBook(s_uuid string) error {
	sql := lib.Template("updateScheduleBook")

	params := []interface{}{s_uuid}

	err := lib.QueryUpdate(sql, params)

	if err != nil {
		return fmt.Errorf("error updating query: %v", err)
	}

	return nil
}

func updateAppointment(a_uuid string, s_uuid string) error {
	sql := lib.Template("updateAppointment")

	errb := updateScheduleBook(s_uuid)

	if errb != nil {
		return fmt.Errorf("error updating schedule: %v", errb)
	}

	params := []interface{}{
		a_uuid,
		s_uuid,
	}

	err := lib.QueryUpdate(sql, params)

	if err != nil {
		return fmt.Errorf("error updating appointment: %v", err)
	}

	return nil
}

func ModifyAppointment(c echo.Context) error {
	var payload RequestPayload
	if err := c.Bind(&payload); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid input"})
	}

	errs := currentSchuduleUUID(payload.AppointmentUUID)

	if errs != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"message": "Error updating query"})
	}

	erra := updateAppointment(payload.AppointmentUUID, payload.ScheduleUUID)

	if erra != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"message": "Error updating appointment"})
	}

	return c.JSON(http.StatusOK, echo.Map{"message": "Modify successful!"})
}