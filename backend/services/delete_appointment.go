package services

import (
	"fmt"
	"net/http"

	"github.com/YarKhan02/Smart-Hospital-System/lib"
	"github.com/labstack/echo/v4"
)

type DeleteAppointmentUUID struct {
	UUID      string `json:"appointmentUUID"`
}

func deleteScheduleAvailable(s_uuid string) error {
	sql := lib.Template("updateScheduleAvailable")

	params := []interface{}{s_uuid}

	err := lib.QueryUpdate(sql, params)

	if err != nil {
		return fmt.Errorf("error updating query: %v", err)
	}

	return nil
}


func deleteSchuduleUUID(a_uuid string) error {
	sql := lib.Template("scheduleStatus")

	params := []interface{}{a_uuid}

	var s_uuid ScheduleUUID

	errs := lib.QueryObject(sql, &s_uuid, params)

	if errs != nil {
		return fmt.Errorf("error fetching schedule uuid: %v", errs)
	}
	
	errm := deleteScheduleAvailable(s_uuid.UUID)

	if errm != nil {
		return fmt.Errorf("error updating query: %v", errm)
	}

	return nil
}

func deleteAppointment(a_uuid string) error {
	sql := lib.Template("deleteAppointment")

	errs := deleteSchuduleUUID(a_uuid)

	if errs != nil {
		return fmt.Errorf("error deleting appointment: %v", errs)
	}

	params := []interface{}{a_uuid}
	
	err := lib.QueryDelete(sql, params)

	if err != nil {
		return fmt.Errorf("error deleting appointment: %v", err)
	}
	
	return nil
}

func DeleteAppointment(c echo.Context) error {
	var data DeleteAppointmentUUID

	if err := c.Bind(&data); err != nil {
        return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid input"})
    }

	err := deleteAppointment(data.UUID)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"message": "Error deleting appointment"})
	}

	fmt.Println(data)

	return c.JSON(http.StatusOK, echo.Map{"message": "Delete successful!"}) 
}