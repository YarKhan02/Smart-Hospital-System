'use client'

import React, { useEffect, useState } from 'react';
import { Button } from "../components/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/card";
import { Input } from "../components/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/table";
import { CalendarDays, Clock, Menu, Search, User, Users, ChevronDown, ChevronUp } from 'lucide-react';

const navItems = [
  { href: "/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/schedules", label: "Schedules", icon: Clock },
  { href: "/doctors", label: "Doctors", icon: User },
  { href: "/records", label: "User Records", icon: Users },
];

interface Doctor {
  doctorName: string;
  speciality: string;
}

interface Schedule {
  uuid: string;
  doctor_name: string;
  speciality: string;
  appointment_date: string;
  appointment_start: string;
  appointment_end: string;
}

function SimpleSidebar({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
  return (
    <aside className={`bg-white shadow-md transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="p-4 flex justify-between items-center">
        {isOpen && <h2 className="text-lg font-semibold">Hospital</h2>}
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`flex items-center py-2 px-4 ${
              isOpen ? 'text-gray-700 hover:bg-gray-100' : 'justify-center'
            } ${window.location.pathname === item.href ? 'bg-gray-100' : ''}`}
          >
            <item.icon className={`h-5 w-5 ${isOpen ? 'mr-3' : ''}`} />
            {isOpen && <span>{item.label}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
}

function DoctorCard({ doctorName, speciality, schedules, onReserve }: {
  doctorName: string;
  speciality: string;
  schedules: Schedule[];
  onReserve: (schedule: Schedule) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    const sanitizedDate = dateString.split('T')[0];
    return new Date(sanitizedDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const displayedSchedules = isExpanded ? schedules : schedules.slice(0, 2);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{doctorName}</CardTitle>
        <p className="text-xs text-muted-foreground">{speciality}</p>
      </CardHeader>
      <CardContent className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="py-1 text-xs font-medium text-gray-500">Date</TableHead>
              <TableHead className="py-1 text-xs font-medium text-gray-500">Time</TableHead>
              <TableHead className="py-1 text-xs font-medium text-gray-500">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedSchedules.map((schedule) => (
              <TableRow key={schedule.uuid} className="hover:bg-gray-50">
                <TableCell className="py-2 text-xs">{formatDate(schedule.appointment_date)}</TableCell>
                <TableCell className="py-2 text-xs">
                  {formatTime(schedule.appointment_start)}
                </TableCell>
                <TableCell className="py-2">
                  <Button 
                    size="sm" 
                    onClick={() => onReserve(schedule)}
                    className="px-3 py-1 text-xs"
                  >
                    Reserve
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {schedules.length > 2 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 w-full text-xs"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Show More ({schedules.length - 2} more)
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const doctorsRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/doctors`);
        const schedulesRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/schedules`);
        
        if (doctorsRes.ok && schedulesRes.ok) {
          const doctorsData = await doctorsRes.json();
          const schedulesData = await schedulesRes.json();
          setDoctors(doctorsData);
          setSchedules(schedulesData);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, []);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReserve = (schedule: Schedule) => {
    const query = new URLSearchParams({
      uuid: schedule.uuid,
      doctor_name: schedule.doctor_name,
      speciality: schedule.speciality,
      appointment_date: schedule.appointment_date.split('T')[0],
      appointment_start: schedule.appointment_start,
      appointment_end: schedule.appointment_end,
    }).toString();

    window.location.href = `/reservation?${query}`;
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      <SimpleSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Available Doctors</h1>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <div className="mb-6 flex items-center bg-white rounded-lg shadow-sm p-2">
            <Search className="mr-2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by doctor name or specialty"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border-none focus:ring-0"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.doctorName}
                doctorName={doctor.doctorName}
                speciality={doctor.speciality}
                schedules={schedules.filter(schedule => schedule.doctor_name === doctor.doctorName)}
                onReserve={handleReserve}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}