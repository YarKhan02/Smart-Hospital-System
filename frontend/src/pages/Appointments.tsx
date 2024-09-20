import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/table";
import { Button } from "../components/button";
import { Menu, CalendarDays, Clock, User, Users } from 'lucide-react';

interface Appointment {
  id: number;
  patient: string;
  doctor: string;
  date: string;
  time: string;
}

const navItems = [
  { href: "/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/schedules", label: "Schedules", icon: Clock },
  { href: "/doctors", label: "Doctors", icon: User },
  { href: "/records", label: "User Records", icon: Users },
  { href: "/reservations", label: "Make Reservation", icon: CalendarDays },
]

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Simulated data for demonstration
    const sampleData: Appointment[] = [
      { id: 1, patient: 'Alice Johnson', doctor: 'Dr. Smith', date: '2024-09-25', time: '9:00 AM' },
      { id: 2, patient: 'Bob Brown', doctor: 'Dr. Johnson', date: '2024-09-25', time: '11:00 AM' },
      { id: 3, patient: 'Charlie Davis', doctor: 'Dr. Williams', date: '2024-09-26', time: '2:00 PM' },
      { id: 4, patient: 'Dana White', doctor: 'Dr. Lee', date: '2024-09-26', time: '3:30 PM' },
    ];

    setAppointments(sampleData);
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
            <CardTitle>Appointments</CardTitle>
            <CardDescription>View and manage upcoming appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.patient}</TableCell>
                    <TableCell>{appointment.doctor}</TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}