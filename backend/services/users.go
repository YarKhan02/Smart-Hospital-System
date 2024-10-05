package services

// import (
// 	"context"
// 	"net/http"
// 	"github.com/labstack/echo/v4"
// 	"github.com/YarKhan02/Smart-Hospital-System/lib"
// )

// type Users struct {
// 	UUID          string    `json:"uuid"`
// 	DisplayName   string    `json:"user_name"`
// 	NIC    string    `json:"nic"`
// 	ContactInfo   int       `json:"phone_number"`
// }

// func FetchUsers(c echo.Context) error {
//     db := lib.ConnectToDB()
//     defer db.Close(context.Background())

//     rows, err := db.Query(context.Background(), "SELECT uuid, user_name, nic, phone_number FROM public.users")
//     if err != nil {
//         return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Unable to fetch data"})
//     }
//     defer rows.Close()

//     users := []Users{}
//     for rows.Next() {
//         var u Users
//         err := rows.Scan(&u.UUID, &u.DisplayName, &u.NIC, &u.ContactInfo)
//         if err != nil {
//             return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Unable to scan data"})
//         }
//         users = append(users, u)
//     }
//     return c.JSON(http.StatusOK, users)
// }