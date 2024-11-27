package oauth

import (
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
)

// HTTP_HEADER is the Authorization header where the JWT is passed
const HTTP_HEADER = "Authorization"

// JWT secret key (you should load this securely in a real application)
var jwtSecret = []byte(os.Getenv("JWT_SECRET_KEY"))

// Claims struct for JWT claims
type Claims struct {
	Email      string `json:"email"`
	DoctorUUID string `json:"doctor_uuid"`
	jwt.StandardClaims
}

// GenerateJWT generates a JWT token
func GenerateJWT(email string, doctorUUID string) (string, error) {
	// Define JWT claims
	claims := &Claims{
		Email: email,
		DoctorUUID: doctorUUID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(45 * time.Minute).Unix(), // Token expires in 15 minutes
			Issuer:    "wali-amna",                            // You can modify the issuer
		},
	}

	// Create the token with claims and signing method
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Sign the token with the secret key
	return token.SignedString(jwtSecret)
}

// ValidateToken verifies the JWT token
func ValidateToken(tokenStr string) (*Claims, error) {
	// Parse and validate the token
	token, err := jwt.ParseWithClaims(tokenStr, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		// Ensure the signing method is correct
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return jwtSecret, nil
	})

	if err != nil {
		return nil, fmt.Errorf("error parsing token: %v", err)
	}

	// Check if the token is valid and extract the claims
	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		// Check expiration
		if err := CheckExpiration(claims, time.Now()); err != nil {
			return nil, err
		}

		// Check claims (optional, e.g., verifying the email)
		if err := CheckClaims(claims); err != nil {
			return nil, err
		}

		return claims, nil
	}

	return nil, fmt.Errorf("invalid token")
}

// CheckExpiration checks if the token is expired
func CheckExpiration(claims *Claims, currentTime time.Time) error {
	if currentTime.After(time.Unix(claims.ExpiresAt, 0)) {
		return fmt.Errorf("token is expired")
	}
	return nil
}

// CheckClaims checks if the claims match expected values (e.g., email)
func CheckClaims(claims *Claims) error {
	// You can add more validation logic here
	if claims.Email == "" {
		return fmt.Errorf("invalid email claim")
	}
	return nil
}

// ExtractAccessToken extracts the JWT token from the Authorization header
func ExtractAccessToken(c echo.Context) (string, error) {
	authHeader := c.Request().Header.Get(HTTP_HEADER)
	if authHeader == "" {
		return "", fmt.Errorf("authorization header missing")
	}

	// Split the Authorization header to get the token
	parts := strings.Split(authHeader, " ")
	if len(parts) != 2 {
		return "", fmt.Errorf("invalid authorization header format")
	}

	return parts[1], nil
}

func JWTMiddleware() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// Extract the token from the Authorization header
			tokenStr, err := ExtractAccessToken(c)
			if err != nil {
				return echo.NewHTTPError(http.StatusUnauthorized, "Missing or invalid token")
			}

			// Validate the token and extract claims
			claims, err := ValidateToken(tokenStr)
			if err != nil {
				return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
			}

			// Attach claims to the context, so you can use it in your handlers
			c.Set("claims", claims)

			return next(c)
		}
	}
}