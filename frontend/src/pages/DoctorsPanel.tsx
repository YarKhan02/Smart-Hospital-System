import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"
import UpcomingAppointments from './UpcomingAppointments'
import Patients from './Patients'

export default function DoctorsDashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Doctor's Dashboard</h1>
      
      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming-appointments">UpcomingAppointments</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming-appointments">
          <UpcomingAppointments />
        </TabsContent>

        <TabsContent value="patients">
          <Patients />
        </TabsContent>
      </Tabs>
    </div>
  )
}