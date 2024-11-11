import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"
import { Button } from "../components/button"
import { Card, CardContent } from "../components/card"
import { ScrollArea } from "../components/scroll-area"
import Medications from './Medication'
import AIDiagnosisAssistant from './AIDiagnosisAssistant'
import PatientHistory from './PatientHistory'
import { ChevronLeft, ChevronRight, Pill, Stethoscope, ClipboardList } from 'lucide-react'

interface PatientAppointment {
  appointmentUUID: string;
  patientName: string;
  appointmentDate: string;
  appointmentStart: string;
  appointmentEnd: string;
}

export default function PatientPanel() {
  const [patientAppointment, setPatientAppointment] = useState<PatientAppointment>({
    appointmentUUID: '',
    patientName: '',
    appointmentDate: '',
    appointmentStart: '',
    appointmentEnd: '',
  });
  const [activeTab, setActiveTab] = useState('medications');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

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

  const handleBackToDoctorsPanel = () => {
    navigate('/doctors-panel');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-md transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-16'} flex flex-col`}>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="self-end m-2"
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
        </Button>
        <ScrollArea className="flex-grow">
          <nav className="p-2 space-y-2">
            <Button
              variant="ghost"
              className={`w-full ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}
              onClick={handleBackToDoctorsPanel}
            >
              <ChevronLeft className="h-4 w-4" />
              {isSidebarOpen && <span className="ml-2">Doctor Panel</span>}
            </Button>
          </nav>
        </ScrollArea>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Patient Panel</h1>
          <Card>
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}