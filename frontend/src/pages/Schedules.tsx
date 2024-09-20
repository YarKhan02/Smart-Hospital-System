import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card"
import { Calendar } from "../components/calendar"
import { Button } from "../components/button"
import { Clock, Menu, CalendarDays, User, Users } from 'lucide-react'

const navItems = [
  { href: "/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/schedules", label: "Schedules", icon: Clock },
  { href: "/doctors", label: "Doctors", icon: User },
  { href: "/records", label: "User Records", icon: Users },
  { href: "/reservations", label: "Make Reservation", icon: CalendarDays },
]

const appointments = [
  { time: "9:00 AM", doctor: "Dr. Smith", specialty: "Cardiology" },
  { time: "11:00 AM", doctor: "Dr. Johnson", specialty: "Pediatrics" },
  { time: "2:00 PM", doctor: "Dr. Williams", specialty: "Neurology" },
]

export default function Schedules() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

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
                <ul className="space-y-2">
                  {appointments.map((appointment, index) => (
                    <li key={index} className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{appointment.time} - {appointment.doctor} ({appointment.specialty})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}