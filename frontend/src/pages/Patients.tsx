import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../components/card"
import { Input } from "../components/input"
import { Button } from "../components/button"
import { ScrollArea } from "../components/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "../components/avatar"
import { Search } from 'lucide-react'

const patients = [
  { id: 1, name: "John Doe", age: 45, lastVisit: "2024-09-15", condition: "Hypertension" },
  { id: 2, name: "Jane Smith", age: 32, lastVisit: "2024-10-01", condition: "Diabetes" },
  { id: 3, name: "Bob Johnson", age: 58, lastVisit: "2024-10-10", condition: "Arthritis" },
]

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Records</CardTitle>
        <CardDescription>View and manage patient information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Search className="w-5 h-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <ScrollArea className="h-[400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPatients.map((patient) => (
              <Card key={patient.id}>
                <CardContent className="flex items-center space-x-4 p-4">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${patient.name}`} alt={patient.name} />
                    
                    <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{patient.name}</h3>
                    <p className="text-sm text-gray-500">Age: {patient.age}</p>
                    <p className="text-sm text-gray-500">Last Visit: {patient.lastVisit}</p>
                    <p className="text-sm text-gray-500">Condition: {patient.condition}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2 p-4">
                  <Button size="sm" variant="outline">View Records</Button>
                  <Button size="sm">Schedule Appointment</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}