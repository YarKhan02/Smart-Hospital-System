import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/table"

type PatientAppointment = {
    appointmentUUID: string;
    patientName: string;
    appointmentDate: string;
    appointmentStart: string;
    appointmentEnd: string;
  };
  
  type PatientProps = {
    patientAppointment: PatientAppointment;
  };

const patientData = {
  id: 1,
  name: "John Doe",
  age: 45,
  gender: "Male",
  condition: "Hypertension",
  allergies: "Penicillin",
  history: [
    { date: "2024-09-15", diagnosis: "Annual checkup", notes: "Patient reported feeling well. Blood pressure slightly elevated." },
    { date: "2024-08-01", diagnosis: "Hypertension follow-up", notes: "Adjusted medication dosage. Recommended lifestyle changes." },
    { date: "2024-06-15", diagnosis: "Sprained ankle", notes: "Prescribed rest and anti-inflammatory medication." },
    { date: "2024-03-10", diagnosis: "Flu symptoms", notes: "Prescribed antiviral medication and rest." },
  ]
}

export default function PatientHistory({ patientAppointment }: PatientProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient History</CardTitle>
        <CardDescription>View detailed medical history for {patientData.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Patient Information</h3>
          <p><strong>Name:</strong> {patientData.name}</p>
          <p><strong>Age:</strong> {patientData.age}</p>
          <p><strong>Gender:</strong> {patientData.gender}</p>
          <p><strong>Current Condition:</strong> {patientData.condition}</p>
          <p><strong>Allergies:</strong> {patientData.allergies}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Medical History</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patientData.history.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.diagnosis}</TableCell>
                  <TableCell>{entry.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}