package main

import (
	// "encoding/json"
	"net/http"
	// "fmt"
	// "net/http"
	"github.com/labstack/echo/v4"
)
type Appointment struct {
	UserName         string `json:"user_name"`
	PhoneNumber      string `json:"phone_number"`
	AppointmentNumber string `json:"appointment_number"`
	DoctorName       string `json:"doctor_name"`
}

func fetch_data(c echo.Context, name string) error {
	var data []Appointment
	if name == "wali" {
		// Sample data
		data = []Appointment{
			{
				UserName:         "John Doe",
				PhoneNumber:      "+1234567890",
				AppointmentNumber: "A001",
				DoctorName:       "Dr. Emily Smith",
			},
			{
				UserName:         "Jane Smith",
				PhoneNumber:      "+1987654321",
				AppointmentNumber: "A002",
				DoctorName:       "Dr. Michael Johnson",
			},
			{
				UserName:         "Alice Johnson",
				PhoneNumber:      "+1122334455",
				AppointmentNumber: "A003",
				DoctorName:       "Dr. Sarah Brown",
			},
		}
		return c.JSON(http.StatusOK, data)
	} else {
		var response = map[string]string {
			"message": "no data found",
		}
		return c.JSON(http.StatusNotFound, response)
	}
}

func reception(c echo.Context) error {
	name := "walii"
	result := fetch_data(c, name)
	return result
}

func main() {
	app := echo.New()

	app.GET("/", reception)

	app.Start(":4567")
}