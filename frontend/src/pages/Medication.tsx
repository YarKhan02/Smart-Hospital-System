import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card"
import { Input } from "../components/input"
import { Label } from "../components/label"
import { Button } from "../components/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/table"
import { Plus } from 'lucide-react'

const currentPatient = {
  id: 1,
  name: "John Doe",
  age: 45,
  gender: "Male",
  condition: "Hypertension",
  allergies: "Penicillin",
  medications: [
    { id: 1, name: "Lisinopril", dosage: "10mg", frequency: "1x daily", duration: "30 days" },
    { id: 2, name: "Aspirin", dosage: "81mg", frequency: "1x daily", duration: "Ongoing" },
  ]
}

export default function Medications() {
  const [newMedication, setNewMedication] = useState({ name: '', dosage: '', frequency: '', duration: '' })

  const handleAddMedication = () => {
    console.log('Adding new medication for', currentPatient.name, ':', newMedication)
    setNewMedication({ name: '', dosage: '', frequency: '', duration: '' })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prescribe Medications</CardTitle>
        <CardDescription>Manage medications for the current patient</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Current Patient: {currentPatient.name}</h3>
          <p className="text-sm text-gray-600">Age: {currentPatient.age} | Gender: {currentPatient.gender}</p>
          <p className="text-sm text-gray-600">Condition: {currentPatient.condition}</p>
          <p className="text-sm text-gray-600">Allergies: {currentPatient.allergies}</p>
        </div>
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2">Current Medications</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPatient.medications.map((med) => (
                <TableRow key={med.id}>
                  <TableCell className="font-medium">{med.name}</TableCell>
                  <TableCell>{med.dosage}</TableCell>
                  <TableCell>{med.frequency}</TableCell>
                  <TableCell>{med.duration}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-2">Prescribe New Medication</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="medication">Medication</Label>
              <Input
                id="medication"
                value={newMedication.name}
                onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                placeholder="Enter medication name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input
                id="dosage"
                value={newMedication.dosage}
                onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                placeholder="Enter dosage"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Input
                id="frequency"
                value={newMedication.frequency}
                onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})}
                placeholder="Enter frequency"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={newMedication.duration}
                onChange={(e) => setNewMedication({...newMedication, duration: e.target.value})}
                placeholder="Enter duration"
              />
            </div>
          </div>
          <Button onClick={handleAddMedication} className="mt-4">
            <Plus className="mr-2 h-4 w-4" /> Add Medication
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}