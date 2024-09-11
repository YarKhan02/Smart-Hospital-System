import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

interface MakeReservationProps {
  doctors: Doctor[];
}

export function MakeReservation({ doctors }: MakeReservationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Make a Reservation</CardTitle>
        <CardDescription>Book an appointment with one of our doctors</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patient-name">Patient Name</Label>
              <Input id="patient-name" placeholder="Enter patient name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctor">Select Doctor</Label>
              <Select>
                <SelectTrigger id="doctor">
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.name}>
                      {doctor.name} ({doctor.specialty})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" />
            </div>
          </div>
          <Button type="submit">Book Appointment</Button>
        </form>
      </CardContent>
    </Card>
  )
}