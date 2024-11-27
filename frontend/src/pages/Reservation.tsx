import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Button } from "../components/button";
import { CalendarDays, Clock, Menu, User, Users } from 'lucide-react';

const navItems = [
  { href: "/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/schedules", label: "Schedules", icon: Clock },
  { href: "/doctors", label: "Doctors", icon: User },
]

export default function Reservation() {
  const [uuid, setUUID] = useState<string>('');
  const [doctorName, setDoctorName] = useState<string>('');
  const [speciality, setSpeciality] = useState<string>('');
  const [appointmentDate, setAppointmentDate] = useState<string>('');
  const [appointmentStart, setAppointmentStart] = useState<string>('');
  const [appointmentEnd, setAppointmentEnd] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUUID(params.get('uuid') || '');
    setDoctorName(params.get('doctor_name') || '');
    setSpeciality(params.get('speciality') || '');
    setAppointmentDate(params.get('appointment_date') || '');
    setAppointmentStart(params.get('appointment_start') || '');
    setAppointmentEnd(params.get('appointment_end') || '');
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Send data to backend
      const backend_url = `${process.env.REACT_APP_BACKEND_URL}/reservation`
      const token = localStorage.getItem('authToken');
      const response = await fetch(backend_url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patient: {
            patientName: formData.patientName,
            patientEmail: formData.patientEmail,
            patientPhone: formData.patientPhone,
          },
          reservation: {
            uuid: uuid,
          },
        }),
      });
      
      // Check if the response is okay
      if (!response.ok) {
        throw new Error('Failed to make reservation');
      }

      // Handle success response
      setSubmitMessage('Reservation Successful! Your appointment has been booked.');
      setTimeout(() => {
        window.location.href = '/schedules';
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('Reservation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Make a Reservation</CardTitle>
          <CardDescription>Book your appointment with our specialists</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="patientName">Patient Name</Label>
                    <Input
                      id="patientName"
                      name="patientName"
                      placeholder="Enter your full name"
                      value={formData.patientName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="patientEmail">Email</Label>
                    <Input
                      id="patientEmail"
                      name="patientEmail"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.patientEmail}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="patientPhone">Phone Number</Label>
                    <Input
                      id="patientPhone"
                      name="patientPhone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.patientPhone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Doctor</Label>
                    <Input value={doctorName} readOnly />
                  </div>
                  <div className="grid gap-2">
                    <Label>Speciality</Label>
                    <Input value={speciality} readOnly />
                  </div>
                </div>
              </form>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-2">Appointment Details</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4" />
                  <span>{appointmentStart} - {appointmentEnd}</span>
                </div>
                <p>Date: {appointmentDate}</p>
                <p>Doctor: {doctorName}</p>
                <p>Speciality: {speciality}</p>
              </div>
              <div>
                <Button 
                  onClick={handleSubmit}
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm Reservation'}
                </Button>
                {submitMessage && (
                  <p className="mt-4 text-center text-green-600">{submitMessage}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}