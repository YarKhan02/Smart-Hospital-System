package services

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func FetchDoctorsPatient(c echo.Context) error {
	

	return c.JSON(http.StatusOK, "")
}