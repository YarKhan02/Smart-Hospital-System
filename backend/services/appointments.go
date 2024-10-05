package services

// import (
// 	"context"
// 	"net/http"
// 	"github.com/labstack/echo/v4"
// 	"github.com/YarKhan02/Smart-Hospital-System/lib"
// )

// type Appointment struct {
// 	UUID          string    `json:"uuid"`
// 	UserUUID   string    `json:"user_uuid"`
// 	ScheduleUUID    string    `json:"schedule_uuid"`
// }

// func FetchAppointments(c echo.Context) error {
//     db := lib.ConnectToDB()
//     defer db.Close(context.Background())

//     rows, err := db.Query(context.Background(), "SELECT appointment_uuid, user_uuid, schedule_uuid FROM public.appointments")
//     if err != nil {
//         return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Unable to fetch data"})
//     }
//     defer rows.Close()

//     appointments := []Appointment{}
//     for rows.Next() {
//         var a Appointment
//         err := rows.Scan(&a.UUID, &a.UserUUID, &a.ScheduleUUID)
//         if err != nil {
//             return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Unable to scan data"})
//         }
//         appointments = append(appointments, a)
//     }
//     return c.JSON(http.StatusOK, appointments)
// }