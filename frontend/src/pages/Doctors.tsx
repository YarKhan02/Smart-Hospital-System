import React, { useEffect, useState } from 'react';
import { Button } from "../components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/card";
import { CalendarDays, Clock, Menu, User, Users } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

const navItems = [
  { href: "/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/schedules", label: "Schedules", icon: Clock },
  { href: "/doctors", label: "Doctors", icon: User },
  { href: "/records", label: "User Records", icon: Users },
  { href: "/reservations", label: "Make Reservation", icon: CalendarDays },
]

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Simulated data for demonstration
    const sampleData: Doctor[] = [
      { id: 1, name: 'Dr. Smith', specialty: 'Cardiology' },
      { id: 2, name: 'Dr. Johnson', specialty: 'Pediatrics' },
      { id: 3, name: 'Dr. Williams', specialty: 'Neurology' },
      { id: 4, name: 'Dr. Lee', specialty: 'Orthopedics' },
    ];

    setDoctors(sampleData);
  }, []);

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
            <CardTitle>Available Doctors</CardTitle>
            <CardDescription>View information about our doctors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {doctors.map((doctor) => (
                <Card key={doctor.id}>
                  <CardHeader>
                    <CardTitle>{doctor.name}</CardTitle>
                    <CardDescription>{doctor.specialty}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Available for appointments</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>View Schedule</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}