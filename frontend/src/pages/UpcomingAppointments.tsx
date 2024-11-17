import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card"
import { Calendar } from "../components/calendar"
import { Button } from "../components/button"
import { format, isSameDay } from 'date-fns'

type UpcomingAppointment = {
  uuid: string;
  patient_name: string;
  appointment_date: string;
  appointment_start: string;
  appointment_end: string;
};

export default function Appointments() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [appointments, setAppointments] = useState<UpcomingAppointment[]>([])

  const loadData = async () => {
    try {
      const backend_url = `${process.env.REACT_APP_BACKEND_URL}/upcoming-appointment`
      const res = await fetch(backend_url);
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

  const filteredDate = appointments.filter(appointment => 
    selectedDate && 
    isSameDay(new Date(appointment.appointment_date), selectedDate)
  )

  const normalizedAppointments = filteredDate.map((appointment) => {
    return {
      uuid: appointment.uuid,
      patient_name: appointment.patient_name,
      appointment_date: format(new Date(appointment.appointment_date), 'yyyy-MM-dd'),
      appointment_start: appointment.appointment_start,
      appointment_end: appointment.appointment_end,
    };
  });

  const handlePatient = (appointment: UpcomingAppointment) => {
    const query = new URLSearchParams({
      uuid: appointment.uuid,
      patient_name: appointment.patient_name,
      appointment_date: appointment.appointment_date,
      appointment_start: appointment.appointment_start,
      appointment_end: appointment.appointment_end,
    }).toString();

    window.location.href = `/patient-panel?${query}`;
  };

  useEffect(() => {
    loadData();
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>Manage your schedule and patient appointments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Appointments for {selectedDate?.toDateString()}</h3>
            {normalizedAppointments.length > 0 ? (
              <ul className="space-y-2">
                {normalizedAppointments.map((appointment, index) => (
                  <li key={index} className="bg-white p-3 rounded-lg shadow">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{appointment.patient_name}</p>
                        <p className="text-sm text-gray-600">{appointment.appointment_date} ({appointment.appointment_start} - {appointment.appointment_end})</p>
                      </div>
                      <Button size="sm" onClick={() => handlePatient(appointment)}>View Details</Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No appointments scheduled for this date.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}