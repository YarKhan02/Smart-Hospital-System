package services

import (
	"net/http"

	"github.com/YarKhan02/Smart-Hospital-System/lib"
	"github.com/labstack/echo/v4"
)

type ReceptionStats struct {
    TotalPatients           int `json:"totalPatients" db:"total_patients"`
    TotalDoctors            int `json:"totalDoctors" db:"total_doctors"`
    TotalFutureAppointments int `json:"totalFutureAppointments" db:"total_future_appointments"`
}

func FetchReceptionData(c echo.Context) error {
	sql := lib.Template("receptionData")

	var result ReceptionStats

	err := lib.QueryJson(sql, &result)
    if err != nil {
        return c.JSON(http.StatusNotFound, "Error fetching stats")
    }

	return c.JSON(http.StatusOK, result)
}