package services

import (
	"fmt"
	"net/http"

	"github.com/YarKhan02/Smart-Hospital-System/crypto"
	"github.com/YarKhan02/Smart-Hospital-System/lib"
	"github.com/YarKhan02/Smart-Hospital-System/oauth"
	"github.com/labstack/echo/v4"
)

type DoctorFields struct {
	Name        string `json:"name"`
	Email       string `json:"email"`
	PhoneNumber string `json:"phoneNumber"`
	Password    string `json:"password"`
	Speciality  string `json:"speciality"`
}

func doctorRegister(email string, password string) (string, error) {
	sql := lib.Template("doctorRegister")
	params := []interface{}{
		email,
		password,
	}
	
	uuid, err := lib.QueryCommit(sql, params, true)

	if err != nil {
		return "", fmt.Errorf("registration failed")
	}

	return uuid, nil
}

func insertDoctor(uuid string, doctor DoctorFields) error {
	sql := lib.Template("insertDoctor")
	params := []interface{}{
		uuid,
		doctor.Name,
		doctor.Speciality,
		doctor.Email,
		doctor.PhoneNumber,
	}

	_, err := lib.QueryCommit(sql, params, false)

	if err != nil {
		return fmt.Errorf("insertion failed")
	}

	return nil
}

func SignUp(c echo.Context) error {
	var doctor DoctorFields
	if err := c.Bind(&doctor); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid input"})
	}

	hashedPassword := crypto.HashPassword(doctor.Password)

	uuid, err := doctorRegister(doctor.Email, hashedPassword)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Registration failed!"})
	}

	errd := insertDoctor(uuid, doctor)
	if errd != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Doctor insertion failed"})
	}
	
	token, err := oauth.GenerateJWT(doctor.Email, uuid)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Token generation failed"})
	}

	fmt.Println(token)

	return c.JSON(http.StatusOK, echo.Map{
		"message": "Doctor account created successfully",
		"token":   token,
	})
}