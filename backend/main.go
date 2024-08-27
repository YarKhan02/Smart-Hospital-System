package main

import (
	"github.com/labstack/echo/v4"
	"github.com/YarKhan02/Smart-Hospital-System/services"
)

func fetchDoctors(c echo.Context) error {
	return services.FetchDoctors(c)
}

func fetchSchedule(c echo.Context) error {
	return services.FetchSchedule(c)
}

func fetchUsers(c echo.Context) error {
	return services.FetchUsers(c)
}

func fetchAppointments(c echo.Context) error {
	return services.FetchAppointments(c)
}

func main() {
	app := echo.New()

	app.GET("/doctors", fetchDoctors)
	app.GET("/schedule", fetchSchedule)
	app.GET("/users", fetchUsers)
	app.GET("/appointments", fetchAppointments)

	app.Start(":4567")
}