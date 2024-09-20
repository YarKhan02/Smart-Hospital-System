import React, { useState, useEffect } from 'react'
import { Button } from "../components/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/card"
import { CalendarDays, Clock, User, Users, Menu, Activity, Clipboard, Stethoscope } from 'lucide-react'

// Simulated API call for fetching dashboard data
const fetchDashboardData = () => {
  return new Promise<{
    totalPatients: number;
    appointmentsToday: number;
    availableDoctors: number;
  }>(resolve => {
    setTimeout(() => {
      resolve({
        totalPatients: 1250,
        appointmentsToday: 45,
        availableDoctors: 12,
      })
    }, 500)
  })
}

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [dashboardData, setDashboardData] = useState<{
    totalPatients: number;
    appointmentsToday: number;
    availableDoctors: number;
  } | null>(null)

  useEffect(() => {
    fetchDashboardData().then(setDashboardData)
  }, [])

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
              <a href="/appointments" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Appointments</a>
              <a href="/schedules" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Schedules</a>
              <a href="/doctors" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Doctors</a>
              <a href="/records" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">User Records</a>
              <a href="/reservations" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Make Reservation</a>
            </>
          ) : (
            <>
              <a href="/appointments" className="block py-2 px-4 text-center" title="Appointments"><CalendarDays className="h-6 w-6 mx-auto" /></a>
              <a href="/schedules" className="block py-2 px-4 text-center" title="Schedules"><Clock className="h-6 w-6 mx-auto" /></a>
              <a href="/doctors" className="block py-2 px-4 text-center" title="Doctors"><User className="h-6 w-6 mx-auto" /></a>
              <a href="/records" className="block py-2 px-4 text-center" title="User Records"><Users className="h-6 w-6 mx-auto" /></a>
              <a href="/reservations" className="block py-2 px-4 text-center" title="Make Reservation"><CalendarDays className="h-6 w-6 mx-auto" /></a>
            </>
          )}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.totalPatients || 0}</div>
              <p className="text-xs text-muted-foreground">Registered patients</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.appointmentsToday || 0}</div>
              <p className="text-xs text-muted-foreground">Scheduled for today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Doctors</CardTitle>
              <Stethoscope className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.availableDoctors || 0}</div>
              <p className="text-xs text-muted-foreground">On duty today</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="w-full">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  New Appointment
                </Button>
                <Button className="w-full">
                  <Clipboard className="mr-2 h-4 w-4" />
                  Patient Intake
                </Button>
                <Button className="w-full">
                  <Activity className="mr-2 h-4 w-4" />
                  Emergency Cases
                </Button>
                <Button className="w-full">
                  <User className="mr-2 h-4 w-4" />
                  Staff Directory
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}