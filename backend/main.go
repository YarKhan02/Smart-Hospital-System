package main

import (
	"github.com/YarKhan02/Smart-Hospital-System/services"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func fetchDoctors(c echo.Context) error {
	return services.FetchDoctors(c)
}

func fetchSchedule(c echo.Context) error {
	return services.FetchSchedules(c)
}

func fetchUsers(c echo.Context) error {
	return services.FetchUsers(c)
}

func fetchAppointments(c echo.Context) error {
	return services.FetchAppointments(c)
}

func postReservation(c echo.Context) error {
	return services.PostReservation(c)
}

func main() {
	app := echo.New()

	app.Use(middleware.CORSWithConfig(middleware.CORSConfig{
        AllowOrigins: []string{"*"}, // Adjust this as needed. Use specific origins in production.
        AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
        AllowHeaders: []string{echo.HeaderContentType, echo.HeaderAccept},
    }))

	app.GET("/doctors", fetchDoctors)
	app.GET("/schedules", fetchSchedule)
	app.GET("/users", fetchUsers)
	app.GET("/appointments", fetchAppointments)
	app.POST("/reservation", postReservation)

	app.Start(":4567")
}