import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/table";
import { Button } from "../components/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/dialog";
import { globalCss } from '@stitches/react';

const globalStyles = globalCss({
  '.dialog-overlay': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  '.dialog-content': {
    backgroundColor: 'white',
    color: 'black',
  },
});

// Types for the data structure
type PatientHistory = {
  appointment_date: string;
  diagnosis: string;
  notes: string;
  medicines: {
    medicine: string;
    frequency: string;
    dosage: string;
    duration: string;
  }[];
};

type PatientProps = {
  patientAppointment: {
    appointmentUUID: string;
    patientName: string;
  };
};

// Function to format the date to "YYYY-MM-DD" format
const formatDate = (dateString: string) => {
  const date = new Date(dateString); // Convert the string to a Date object
  return date.toISOString().split('T')[0]; // Extract only the date part (YYYY-MM-DD)
};

// Function to fetch patient history from backend
const fetchPatientHistory = async (appointmentUUID: string): Promise<PatientHistory[]> => {
  try {
    const backend_url = `${process.env.REACT_APP_BACKEND_URL}/patient-history`;
    const token = localStorage.getItem('authToken');
    const response = await fetch(backend_url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ appointment_uuid: appointmentUUID }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch patient history');
    }

    const data = await response.json();

    const transformedData: PatientHistory[] = data.map((entry: any) => ({
      appointment_date: entry.appointment_date, // Map 'appointment_date' to 'appointment_date'
      diagnosis: entry.diagnosis,
      notes: entry.notes,
      medicines: entry.medicines.map((med: any) => ({
        medicine: med.medicine,
        frequency: med.frequency,
        dosage: med.dosage,
        duration: med.duration,
      })),
    }));

    return transformedData;
  } catch (error) {
    console.error('Error fetching patient history:', error);
    return [];
  }
};

export default function PatientHistoryComponent({ patientAppointment }: PatientProps) {
  globalStyles();

  const [patientHistory, setPatientHistory] = useState<PatientHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch patient history when component mounts
  useEffect(() => {
    const loadPatientHistory = async () => {
      setLoading(true);
      const history = await fetchPatientHistory(patientAppointment.appointmentUUID);
      setPatientHistory(history);
      setLoading(false);
    };

    loadPatientHistory();
  }, [patientAppointment.appointmentUUID]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient History</CardTitle>
        <CardDescription>View detailed medical history for {patientAppointment.patientName}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <h3 className="text-lg font-semibold mb-2">Medical History</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patientHistory.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{formatDate(entry.appointment_date)}</TableCell> {/* Apply date formatting */}
                  <TableCell>{entry.diagnosis}</TableCell>
                  <TableCell>{entry.notes}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">View Details</Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white dark:bg-gray-800 text-black dark:text-white">
                        <DialogHeader>
                          <DialogTitle className="text-lg font-semibold">{entry.diagnosis} - {formatDate(entry.appointment_date)}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <h4 className="font-semibold mb-2">Prescribed Medicines</h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="font-medium">Medicine</TableHead>
                                <TableHead className="font-medium">Frequency</TableHead>
                                <TableHead className="font-medium">Dosage</TableHead>
                                <TableHead className="font-medium">Duration</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {entry.medicines.map((medicine, medIndex) => (
                                <TableRow key={medIndex}>
                                  <TableCell>{medicine.medicine}</TableCell>
                                  <TableCell>{medicine.frequency}</TableCell>
                                  <TableCell>{medicine.dosage}</TableCell>
                                  <TableCell>{medicine.duration}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}