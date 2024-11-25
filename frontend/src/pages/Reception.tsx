import React, { useState, useEffect } from 'react';
import { Button } from "../components/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/card";
import { CalendarDays, Clock, User, Users, Menu, Stethoscope } from 'lucide-react';

// Define an interface for the dashboard data
interface ReceptionData {
  totalPatients: number;
  totalDoctors: number;
  totalFutureAppointments: number;
}

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [receptionData, setReceptionData] = useState<ReceptionData | null>(null);

  // Fetch Reception data from the backend
  useEffect(() => {
    const fetchReceptionData = async () => {
      try {
        const backend_url = `${process.env.REACT_APP_BACKEND_URL}/reception`
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
          setReceptionData(resJson)
        } else {
          console.log(res)
        }
      } catch (error) {
        console.error("Error fetching Reception data:", error);
      }
    };

    fetchReceptionData();
  }, []);

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
              <a href="/appointments" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200">Appointments</a>
              <a href="/schedules" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200">Schedules</a>
              <a href="/doctors" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200">Doctors</a>
            </>
          ) : (
            <>
              <a href="/appointments" className="flex items-center py-2 px-4 text-center" title="Appointments"><CalendarDays className="h-6 w-6 mx-auto" /></a>
              <a href="/schedules" className="flex items-center py-2 px-4 text-center" title="Schedules"><Clock className="h-6 w-6 mx-auto" /></a>
              <a href="/doctors" className="flex items-center py-2 px-4 text-center" title="Doctors"><User className="h-6 w-6 mx-auto" /></a>
            </>
          )}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Reception</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{receptionData?.totalPatients || 0}</div>
              <p className="text-xs text-muted-foreground">Registered patients</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{receptionData?.totalFutureAppointments || 0}</div>
              <p className="text-xs text-muted-foreground">Scheduled for today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Doctors</CardTitle>
              <Stethoscope className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{receptionData?.totalDoctors || 0}</div>
              <p className="text-xs text-muted-foreground">On duty today</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};