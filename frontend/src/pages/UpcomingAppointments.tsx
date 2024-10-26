import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card"
import { Calendar } from "../components/calendar"
import { Button } from "../components/button"
import { format } from 'date-fns'

const appointments = [
  { id: 1, patientName: "John Doe", date: "2024-10-27", time: "09:00 AM", reason: "Follow-up" },
  { id: 2, patientName: "Jane Smith", date: "2024-10-27", time: "10:30 AM", reason: "Annual checkup" },
  { id: 3, patientName: "Bob Johnson", date: "2024-10-28", time: "02:00 PM", reason: "New patient consultation" },
]

type Appointment = {
  date: string;
  id: string,
  patientName: string,
  time: string,
  reason: string,
}

export default function Appointments() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const loadData = async () => {
    try {
      const backend_url = `${process.env.REACT_APP_BACKEND_URL}/schedules`
      const res = await fetch(backend_url);
      let resJson = await res.json();
      if (res.status === 200) {
        setAppointments(resJson)
      } else {
        console.log(res)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filteredAppointments = appointments.filter(appointment => 
    format(new Date(appointment.date), 'yyyy-MM-dd') === format(selectedDate || new Date(), 'yyyy-MM-dd')
  )

  useEffect(() => {
    loadData();
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>Manage your schedule and patient appointments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Appointments for {selectedDate?.toDateString()}</h3>
            {filteredAppointments.length > 0 ? (
              <ul className="space-y-2">
                {filteredAppointments.map((appointment) => (
                  <li key={appointment.id} className="bg-white p-3 rounded-lg shadow">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{appointment.patientName}</p>
                        <p className="text-sm text-gray-600">{appointment.time} - {appointment.reason}</p>
                      </div>
                      <Button size="sm">View Details</Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No appointments scheduled for this date.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}