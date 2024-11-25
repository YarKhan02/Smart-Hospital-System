import React, { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/table";
import { Button } from "../components/button";
import { Menu, CalendarDays, Clock, User, Users, Edit, Trash2, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select";
import { Popover, PopoverContent, PopoverTrigger } from "../components/popover";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../components/dialog";
import { format } from 'date-fns';

const GlobalStyle = createGlobalStyle`
  .radix-themes {
    --layer-portal: 9999;
  }
  
  .dialog-overlay {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

interface Appointment {
  uuid: string;
  patientName: string | null;
  doctorName: string | null;
  appointmentDate: string | null;
  appointmentStart: string | null;
  appointmentEnd: string | null;
}

type Schedule = {
  uuid: string;
  doctor_name: string | null;
  speciality: string | null;
  appointment_date: string | null;
  appointment_start: string | null;
  appointment_end: string | null;
};

const navItems = [
  { href: "/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/schedules", label: "Schedules", icon: Clock },
  { href: "/doctors", label: "Doctors", icon: User },
]

const formatDate = (dateString: string | null) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

export default function Appointments() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [selectedScheduleUuid, setSelectedScheduleUuid] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<string[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [doctorSchedules, setDoctorSchedules] = useState<Schedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modifyingAppointmentId, setModifyingAppointmentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<string | null>(null);
  const [searchTerms, setSearchTerms] = useState({
    patientName: '',
    doctorName: '',
    appointmentDate: '',
    appointmentTime: '',
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const backend_url = `${process.env.REACT_APP_BACKEND_URL}/appointments`;
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
        setAppointments(resJson || []);
        setFilteredAppointments(resJson || []);
      } else {
        console.log(res);
        setAppointments([]);
        setFilteredAppointments([]);
      }
    } catch (err) {
      console.log(err);
      setAppointments([]);
      setFilteredAppointments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadDataSchedules = async () => {
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
        setDoctorSchedules(resJson || []);
        const uniqueDoctors = [...new Set((resJson || []).map((schedule: Schedule) => schedule.doctor_name).filter(Boolean))] as string[];
        setDoctors(uniqueDoctors);
      } else {
        console.log(res)
        setDoctorSchedules([]);
        setDoctors([]);
      }
    } catch (err) {
      console.log(err);
      setDoctorSchedules([]);
      setDoctors([]);
    }
  };

  useEffect(() => {
    loadData();
    loadDataSchedules();
  }, []);

  useEffect(() => {
    const filtered = appointments.filter(appointment => 
      (appointment.patientName?.toLowerCase() || '').includes(searchTerms.patientName.toLowerCase()) &&
      (appointment.doctorName?.toLowerCase() || '').includes(searchTerms.doctorName.toLowerCase()) &&
      (appointment.appointmentDate || '').includes(searchTerms.appointmentDate) &&
      (appointment.appointmentStart?.toLowerCase() || '').includes(searchTerms.appointmentTime.toLowerCase())
    );
    setFilteredAppointments(filtered);
  }, [searchTerms, appointments]);

  const handleModify = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setSelectedDate(appointment.appointmentDate);
    setModifyingAppointmentId(appointment.uuid);
    setSelectedScheduleUuid(null);
  };

  const handleCloseModify = () => {
    setEditingAppointment(null);
    setSelectedDate(null);
    setModifyingAppointmentId(null);
    setSelectedScheduleUuid(null);
  };

  const handleDelete = (id: string) => {
    setAppointmentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (appointmentToDelete) {
      await sendDeleteRequest(appointmentToDelete);
      setDeleteDialogOpen(false);
      setAppointmentToDelete(null);
    }
  };

  const sendDeleteRequest = async (id: string) => {
    try {
      const backend_url = `${process.env.REACT_APP_BACKEND_URL}/delete-appointment`;
      const token = localStorage.getItem('authToken');
      const res = await fetch(backend_url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointmentUUID: id,
        }),
      });
      if (res.status === 200) {
        setAppointments(appointments.filter(appointment => appointment.uuid !== id));
      } else {
        console.error('Failed to delete appointment');
        // You might want to show an error message to the user here
      }
    } catch (err) {
      console.error("Error deleting appointment:", err);
      // You might want to show an error message to the user here
    }
  };

  const handleSaveModification = async () => {
    if (!editingAppointment) {
      return;
    }
    if (!selectedScheduleUuid) {
      return;
    }
    try {
      const backend_url = `${process.env.REACT_APP_BACKEND_URL}/modify-appointment`;
      const token = localStorage.getItem('authToken');
      const updatedAppointment = {
        ...editingAppointment,
        scheduleUuid: selectedScheduleUuid
      };
      const res = await fetch(backend_url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointmentUUID: editingAppointment.uuid,
          scheduleUUID: selectedScheduleUuid,
        }),
      });
      if (res.status === 200) {
        setAppointments(appointments.map(appointment => 
          appointment.uuid === editingAppointment.uuid ? updatedAppointment : appointment
        ));
        handleCloseModify();
      } else {
        console.log(res);
      }
    } catch (err) {
      console.error("Error updating appointment:", err);
      // Update local state even if backend fails
      setAppointments(appointments.map(appointment => 
        appointment.uuid === editingAppointment.uuid ? editingAppointment : appointment
      ));
      handleCloseModify();
    }
  };

  const getAvailableDates = (doctorName: string) => {
    return [...new Set(doctorSchedules
      .filter(schedule => schedule.doctor_name === doctorName)
      .map(schedule => schedule.appointment_date)
      .filter(Boolean))] as string[];
  };

  const getAvailableTimes = (doctorName: string, date: string) => {
    return doctorSchedules
      .filter(s => s.doctor_name === doctorName && s.appointment_date === date)
      .map(s => ({ time: s.appointment_start, uuid: s.uuid }))
      .filter(item => item.time !== null && item.uuid !== null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GlobalStyle />
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
              <CardTitle>Appointments</CardTitle>
              <CardDescription>View and manage upcoming appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-500" />
                  <Input 
                    placeholder="Search patient" 
                    value={searchTerms.patientName}
                    onChange={(e) => setSearchTerms({...searchTerms, patientName: e.target.value})}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-500" />
                  <Input 
                    placeholder="Search doctor" 
                    value={searchTerms.doctorName}
                    onChange={(e) => setSearchTerms({...searchTerms, doctorName: e.target.value})}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-500" />
                  <Input 
                    placeholder="Search date" 
                    value={searchTerms.appointmentDate}
                    onChange={(e) => setSearchTerms({...searchTerms, appointmentDate: e.target.value})}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-500" />
                  <Input 
                    placeholder="Search time" 
                    value={searchTerms.appointmentTime}
                    onChange={(e) => setSearchTerms({...searchTerms, appointmentTime: e.target.value})}
                  />
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.uuid}>
                      <TableCell>{appointment.patientName || 'N/A'}</TableCell>
                      <TableCell>{appointment.doctorName || 'N/A'}</TableCell>
                      <TableCell>{formatDate(appointment.appointmentDate)}</TableCell>
                      <TableCell>{appointment.appointmentStart || 'N/A'}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Popover open={modifyingAppointmentId === appointment.uuid} onOpenChange={(open) => {
                            if (!open) handleCloseModify();
                          }}>
                            <PopoverTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleModify(appointment)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Modify
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent 
                              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 bg-white border shadow-lg p-4 z-50 max-h-[80vh] overflow-y-auto" 
                              onInteractOutside={(e) => {
                                e.preventDefault();
                              }}
                            >
                              <div className="grid gap-4">
                                <h4 className="font-medium leading-none">Modify Appointment</h4>
                                <div className="grid gap-2">
                                  <Label htmlFor="doctor">Doctor</Label>
                                  <Select
                                    onValueChange={(value) => {
                                      setEditingAppointment({...editingAppointment!, doctorName: value, appointmentDate: null, appointmentStart: null});
                                      setSelectedDate(null);
                                      setSelectedScheduleUuid(null);
                                    }}
                                    value={editingAppointment?.doctorName || undefined}
                                  >
                                    <SelectTrigger id="doctor" className="bg-white">
                                      <SelectValue placeholder="Select doctor" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white z-50 max-h-[200px] overflow-y-auto">
                                      {doctors.map((doctor) => (
                                        <SelectItem key={doctor} value={doctor}>{doctor}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="date">Date</Label>
                                  <Select
                                    onValueChange={(value) => {
                                      setSelectedDate(value);
                                      setEditingAppointment({...editingAppointment!, appointmentDate: value, appointmentStart: null});
                                      setSelectedScheduleUuid(null);
                                    }}
                                    value={selectedDate || undefined}
                                  >
                                    <SelectTrigger id="date" className="bg-white">
                                      <SelectValue placeholder="Select date" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white z-50 max-h-[200px] overflow-y-auto">
                                      {editingAppointment?.doctorName && getAvailableDates(editingAppointment.doctorName).map((date) => (
                                        <SelectItem key={date} value={date}>
                                          {format(new Date(date), 'MMMM d, yyyy')}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="time">Time</Label>
                                  <Select
                                    onValueChange={(value) => {
                                      const [time, uuid] = value.split('|');
                                      setEditingAppointment({...editingAppointment!, appointmentStart: time});
                                      setSelectedScheduleUuid(uuid);
                                    }}
                                    value={editingAppointment?.appointmentStart && selectedScheduleUuid ? `${editingAppointment.appointmentStart}|${selectedScheduleUuid}` : undefined}
                                  >
                                    <SelectTrigger id="time" className="bg-white">
                                      <SelectValue placeholder="Select time" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white z-50 max-h-[200px] overflow-y-auto">
                                      {editingAppointment?.doctorName && selectedDate && 
                                        getAvailableTimes(editingAppointment.doctorName, selectedDate).map(({ time, uuid }) => (
                                          <SelectItem key={uuid} value={`${time}|${uuid}`}>{time}</SelectItem>
                                        ))
                                      }
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Button onClick={() => {
                                  handleSaveModification();
                                }}>Save Changes</Button>
                                <Button variant="outline" onClick={handleCloseModify}>Close</Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(appointment.uuid)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
      <div className="dialog-overlay">
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this appointment? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}