import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card"
import { Calendar } from "../components/calendar"
import { Button } from "../components/button"
import { Clock, Menu, CalendarDays, User, Users } from 'lucide-react'
import { format, isSameDay } from 'date-fns'

const navItems = [
  { href: "/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/schedules", label: "Schedules", icon: Clock },
  { href: "/doctors", label: "Doctors", icon: User },
  { href: "/records", label: "User Records", icon: Users },
  { href: "/reservations", label: "Make Reservation", icon: CalendarDays },
]

type Appointment = {
  doctor_uuid: string;
  speciality: string
  appointment_start: string;
  appointment_end: string;
};

export default function Schedules() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
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

  useEffect(() => {
    loadData();
  }, [])

  const filteredAppointments = appointments.filter(appointment => 
    selectedDate && isSameDay(new Date(appointment.appointment_start), selectedDate)
  );

  const normalizedAppointments = filteredAppointments.map((appointment) => ({
    doctor_uuid: appointment.doctor_uuid,
    speciality: appointment.speciality,
    appointment_start: format(new Date(appointment.appointment_start), 'Pp'),
    appointment_end: format(new Date(appointment.appointment_end), 'Pp')
  }));

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-md transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex justify-between items-center">
          {isSidebarOpen && <h1 className="text-2xl font-bold text-gray-800">Hospital</h1>}
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`block py-2 px-4 ${isSidebarOpen ? 'text-gray-700 hover:bg-gray-200' : 'text-center'}`}
              title={item.label}
            >
              {isSidebarOpen ? (
                item.label
              ) : (
                <item.icon className="h-6 w-6 mx-auto" />
              )}
            </a>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <Card>
          <CardHeader>
            <CardTitle>Schedules</CardTitle>
            <CardDescription>View and manage doctor schedules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Appointments for {selectedDate?.toDateString()}</h3>
                {normalizedAppointments.length > 0 ? (
                  <ul className="space-y-2">
                    {normalizedAppointments.map((appointment, index) => (
                      <li key={index} className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>{appointment.doctor_uuid} ({appointment.speciality}) - {appointment.appointment_start} to {appointment.appointment_end}</span>
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
      </main>
    </div>
  )
}