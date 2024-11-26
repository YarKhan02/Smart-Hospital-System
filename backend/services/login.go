package services

import (
	"fmt"
	"net/http"

	"github.com/YarKhan02/Smart-Hospital-System/crypto"
	"github.com/YarKhan02/Smart-Hospital-System/lib"
	"github.com/YarKhan02/Smart-Hospital-System/oauth"
	"github.com/labstack/echo/v4"
)

type LoginFields struct {
	Email       string `json:"email"`
	Password    string `json:"password"`
}

type VerifyFields struct {
	UUID    	   string `json:"uuid" db:"uuid"`
	Password       string `json:"password" db:"password"`
}

func verifyLogin(email string, password string) (string, error) {
	sql := lib.Template("loginPassword")
	var output VerifyFields
	params := []interface{}{email}

	err := lib.QueryObject(sql, &output, params)
	if err != nil {
		return "", fmt.Errorf("invalid email")
	}

	yes := crypto.VerifyPasswords(output.Password, password)
	if !yes {
		return "", fmt.Errorf("incorrect password")
	}

	return output.UUID, nil
}

func Login(c echo.Context) error {
	var login LoginFields
	if err := c.Bind(&login); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid input"})
	}

	d_uuid, err := verifyLogin(login.Email, login.Password)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Login failed"})
	}
	
	token, err := oauth.GenerateJWT(login.Email, d_uuid)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Token generation failed"})
	}

	return c.JSON(http.StatusOK, echo.Map{
		"message": "Doctor account created successfully",
		"token":   token,
	})
}