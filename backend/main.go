package main

import (
	"encoding/json"
	// "fmt"
	"net/http"
	// "github.com/labstack/echo/v4"
)

func hello(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode("wali")
}

func main() {
	http.HandleFunc("/hello", hello)
	http.ListenAndServe(":4567", nil)
}