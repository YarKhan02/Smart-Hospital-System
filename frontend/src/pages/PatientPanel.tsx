import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"
import Medications from './Medication'
import AIDiagnosisAssistant from './AIDiagnosisAssistant'
import PatientHistory from './PatientHistory'

export default function PatientPanel() {
    const [patientAppointment, setPatientAppointment] = useState({
        appointmentUUID: '',
        patientName: '',
        appointmentDate: '',
        appointmentStart: '',
        appointmentEnd: '',
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setPatientAppointment({
            appointmentUUID: params.get('appointment_uuid') || '',
            patientName: params.get('patient_name') || '',
            appointmentDate: params.get('appointment_date') || '',
            appointmentStart: params.get('appointment_start') || '',
            appointmentEnd: params.get('appointment_end') || '',
        });
    }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Patient Panel</h1>
      
      <Tabs defaultValue="patient panel" className="space-y-4">
        <TabsList>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="ai-assistant">AI Diagnosis Assistant</TabsTrigger>
          <TabsTrigger value="patient-history">Patient History</TabsTrigger>
        </TabsList>

        <TabsContent value="medications">
          <Medications patientAppointment={patientAppointment} />
        </TabsContent>

        <TabsContent value="ai-assistant">
          <AIDiagnosisAssistant patientAppointment={patientAppointment} />
        </TabsContent>

        <TabsContent value="patient-history">
          <PatientHistory patientAppointment={patientAppointment} />
        </TabsContent>
      </Tabs>
    </div>
  )
}