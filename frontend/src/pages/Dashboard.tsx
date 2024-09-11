import React, { useState, useEffect } from 'react'

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Clock, User, Users, Menu, LogOut } from 'lucide-react'

import { Login } from './Login'
import { Appointments } from './Appointments'
import Schedules from './Schedules'
import { Doctors } from './Doctors'
import { UserRecords } from './UserRecords'
import { MakeReservation } from './MakeReservation'

// Simulated API calls
const fetchAppointments = () => {
  return new Promise<Array<{ id: number; patient: string; doctor: string; date: string; time: string; }>>(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, patient: "John Doe", doctor: "Dr. Smith", date: "2023-06-15", time: "10:00 AM" },
        { id: 2, patient: "Jane Smith", doctor: "Dr. Johnson", date: "2023-06-16", time: "2:00 PM" },
      ])
    }, 500)
  })
}

const fetchDoctors = () => {
  return new Promise<Array<{ id: number; name: string; specialty: string; }>>(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Dr. Smith", specialty: "Cardiology" },
        { id: 2, name: "Dr. Johnson", specialty: "Pediatrics" },
        { id: 3, name: "Dr. Williams", specialty: "Neurology" },
      ])
    }, 500)
  })
}

const fetchUserRecords = () => {
  return new Promise<Array<{ id: number; name: string; age: number; lastVisit: string; }>>(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "John Doe", age: 35, lastVisit: "2023-05-20" },
        { id: 2, name: "Jane Smith", age: 28, lastVisit: "2023-06-01" },
      ])
    }, 500)
  })
}

export default function HospitalDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [appointments, setAppointments] = useState<Array<{ id: number; patient: string; doctor: string; date: string; time: string; }>>([])
  const [doctors, setDoctors] = useState<Array<{ id: number; name: string; specialty: string; }>>([])
  const [userRecords, setUserRecords] = useState<Array<{ id: number; name: string; age: number; lastVisit: string; }>>([])

  useEffect(() => {
    if (isLoggedIn) {
      fetchAppointments().then(setAppointments)
      fetchDoctors().then(setDoctors)
      fetchUserRecords().then(setUserRecords)
    }
  }, [isLoggedIn])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-md transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex justify-between items-center">
          {isSidebarOpen && <h1 className="text-2xl font-bold text-gray-800">Hospital</h1>}
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-6">
          {isSidebarOpen ? (
            <>
              <a href="#appointments" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Appointments</a>
              <a href="#schedules" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Schedules</a>
              <a href="#doctors" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Doctors</a>
              <a href="#records" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">User Records</a>
              <a href="#reservations" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Make Reservation</a>
            </>
          ) : (
            <>
              <a href="#appointments" className="block py-2 px-4 text-center" title="Appointments"><CalendarDays className="h-6 w-6 mx-auto" /></a>
              <a href="#schedules" className="block py-2 px-4 text-center" title="Schedules"><Clock className="h-6 w-6 mx-auto" /></a>
              <a href="#doctors" className="block py-2 px-4 text-center" title="Doctors"><User className="h-6 w-6 mx-auto" /></a>
              <a href="#records" className="block py-2 px-4 text-center" title="User Records"><Users className="h-6 w-6 mx-auto" /></a>
              <a href="#reservations" className="block py-2 px-4 text-center" title="Make Reservation"><CalendarDays className="h-6 w-6 mx-auto" /></a>
            </>
          )}
        </nav>
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            {isSidebarOpen && "Logout"}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <Tabs defaultValue="appointments">
          <TabsList>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="schedules">Schedules</TabsTrigger>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="records">User Records</TabsTrigger>
            <TabsTrigger value="reservations">Make Reservation</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <Appointments appointments={appointments} />
          </TabsContent>

          <TabsContent value="schedules">
            <Schedules />
          </TabsContent>

          <TabsContent value="doctors">
            <Doctors doctors={doctors} />
          </TabsContent>

          <TabsContent value="records">
            <UserRecords userRecords={userRecords} />
          </TabsContent>

          <TabsContent value="reservations">
            <MakeReservation doctors={doctors} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}