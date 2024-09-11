import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from 'lucide-react'

interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

interface DoctorsProps {
  doctors: Doctor[];
}

export function Doctors({ doctors }: DoctorsProps) {
  return (
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
  )
}