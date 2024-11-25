package crypto

import (
    "golang.org/x/crypto/bcrypt"
)

// HashPassword hashes the password using bcrypt
func HashPassword(password string) string {
    hashedPassword, _:= bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
    
    return string(hashedPassword)
}

// VerifyPasswords compares a hashed password with a plain password
func VerifyPasswords(hashedPassword, plainPassword string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(plainPassword))
    return err == nil
}