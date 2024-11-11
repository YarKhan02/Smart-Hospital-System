package main

import (
	"github.com/YarKhan02/Smart-Hospital-System/services"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func fetchSchedule(c echo.Context) error {
	return services.FetchSchedules(c)
}

func postReservation(c echo.Context) error {
	return services.PostReservation(c)
}

func fetchPateints(c echo.Context) error {
	return services.FetchPatients(c)
}

func fetchUpcomingAppointments(c echo.Context) error {
	return services.FetchUpcomingAppointments(c)
}

func postMedication(c echo.Context) error {
	return services.PostMedication(c)
}

func main() {
	app := echo.New()

	app.Use(middleware.CORSWithConfig(middleware.CORSConfig{
        AllowOrigins: []string{"*"}, // Adjust this as needed. Use specific origins in production.
        AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
        AllowHeaders: []string{echo.HeaderContentType, echo.HeaderAccept},
    }))

	app.GET("/schedules", fetchSchedule)
	app.GET("/patients", fetchPateints)
	app.POST("/reservation", postReservation)
	app.GET("/upcoming-appointment", fetchUpcomingAppointments)
	app.POST("/medication", postMedication)

	app.Start(":4567")
}