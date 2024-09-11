import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Clock } from 'lucide-react'

export default function Schedules() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedules</CardTitle>
        <CardDescription>View and manage doctor schedules</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4">
          <div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Appointments for {selectedDate?.toDateString()}</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>9:00 AM - Dr. Smith (Cardiology)</span>
              </li>
              <li className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>11:00 AM - Dr. Johnson (Pediatrics)</span>
              </li>
              <li className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>2:00 PM - Dr. Williams (Neurology)</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}