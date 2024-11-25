package main

import (
	"github.com/YarKhan02/Smart-Hospital-System/oauth"
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

func fetchPatientHistory(c echo.Context) error {
	return services.FetchPatientHistory(c)
}

func fetchAppointments(c echo.Context) error {
	return services.FetchAppointments(c)
}

func modifyAppointment(c echo.Context) error {
	return services.ModifyAppointment(c)
}

func deleteAppointment(c echo.Context) error {
	return services.DeleteAppointment(c)
}

func fetchDoctors(c echo.Context) error {
	return services.FetchDoctors(c)
}

func fetchDoctorsPatient(c echo.Context) error {
	return services.FetchDoctorsPatient(c)
}

func fetchReceptionData(c echo.Context) error {
	return services.FetchReceptionData(c)
}

func signUp(c echo.Context) error {
	return services.SignUp(c)
}

func main() {
	app := echo.New()

	// Middleware setup
	app.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"}, // Adjust this as needed. Use specific origins in production.
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
		AllowHeaders: []string{echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))

	// Public routes (no JWT middleware)
	app.POST("/signup", signUp)

	// Routes requiring JWT authentication
	protected := app.Group("") // Create a group for protected routes
	protected.Use(oauth.JWTMiddleware()) // Use the JWT middleware here

	// Define protected routes
	protected.GET("/schedules", fetchSchedule)
	protected.GET("/patients", fetchPateints)
	protected.POST("/reservation", postReservation)
	protected.GET("/upcoming-appointment", fetchUpcomingAppointments)
	protected.POST("/medication", postMedication)
	protected.POST("/patient-history", fetchPatientHistory)
	protected.GET("/appointments", fetchAppointments)
	protected.PUT("/modify-appointment", modifyAppointment)
	protected.DELETE("/delete-appointment", deleteAppointment)
	protected.GET("/doctors", fetchDoctors)
	protected.GET("/doctor-patient", fetchDoctorsPatient)
	protected.GET("/reception", fetchReceptionData)

	// Start the server
	app.Start(":4567")
}
