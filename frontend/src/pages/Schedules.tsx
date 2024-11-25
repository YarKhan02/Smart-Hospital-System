'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card"
import { Calendar } from "../components/calendar"
import { Button } from "../components/button"
import { Clock, Menu, CalendarDays, User, Users, Search } from 'lucide-react'
import { format, isSameDay } from 'date-fns'
import { Input } from '../components/input'

const navItems = [
  { href: "/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/schedules", label: "Schedules", icon: Clock },
  { href: "/doctors", label: "Doctors", icon: User },
]

type Appointment = {
  uuid: string
  doctor_name: string;
  speciality: string;
  appointment_date: string;
  appointment_start: string;
  appointment_end: string;
};

export default function Schedules() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const loadData = async () => {
    try {
      const backend_url = `${process.env.REACT_APP_BACKEND_URL}/schedules`
      const token = localStorage.getItem('authToken');
      const res = await fetch(backend_url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
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
    selectedDate && 
    isSameDay(new Date(appointment.appointment_date), selectedDate) &&
    (appointment.doctor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     appointment.speciality.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const normalizedAppointments = filteredAppointments.map((appointment) => {
    return {
      uuid: appointment.uuid,
      doctor_name: appointment.doctor_name,
      speciality: appointment.speciality,
      appointment_date: format(new Date(appointment.appointment_date), 'dd-MM-yyyy'),
      appointment_start: appointment.appointment_start,
      appointment_end: appointment.appointment_end,
    };
  });

  const handleReserve = (appointment: Appointment) => {
    const query = new URLSearchParams({
      uuid: appointment.uuid,
      doctor_name: appointment.doctor_name,
      speciality: appointment.speciality,
      appointment_date: appointment.appointment_date,
      appointment_start: appointment.appointment_start,
      appointment_end: appointment.appointment_end,
    }).toString();

    window.location.href = `/reservation?${query}`;
  };

  useEffect(() => {
    loadData();
  }, [])

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-md transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex justify-between items-center">
          {isSidebarOpen && (
            <a href="/dashboard" className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors">
              Hospital
            </a>
          )}
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`block py-2 px-4 ${isSidebarOpen ? 'text-gray-700 hover:bg-gray-200' : ''}`}
              title={item.label}
            >
              {isSidebarOpen ? (
                <span className="flex items-center">
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.label}
                </span>
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
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow"
                />
              </div>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Schedules for {selectedDate?.toDateString()}</h3>
                  {normalizedAppointments.length > 0 ? (
                    <ul className="space-y-4">
                      {normalizedAppointments.map((appointment, index) => (
                        <li key={index} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                          <div>
                            <p className="font-semibold">{appointment.doctor_name} ({appointment.speciality})</p>
                            <p className="text-sm text-gray-600">
                              <span>Date: {appointment.appointment_date}</span>
                              <span className="block">
                                <Clock className="inline-block mr-1 h-4 w-4" />
                                {appointment.appointment_start} to {appointment.appointment_end}
                              </span>
                            </p>
                          </div>
                          <Button onClick={() => handleReserve(appointment)}>
                            Reserve
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No appointments scheduled for this date.</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}