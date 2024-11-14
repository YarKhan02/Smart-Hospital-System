import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card"
import { Input } from "../components/input"
import { Label } from "../components/label"
import { Button } from "../components/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/table"
import { Plus, Check, Trash2, Loader2 } from 'lucide-react'
import { Textarea } from "../components/textarea"
import { toast } from "../components/use-toast"

interface PatientAppointment {
  appointmentUUID: string;
  patientName: string;
  appointmentDate: string;
  appointmentStart: string;
  appointmentEnd: string;
}

interface MedicationProps {
  patientAppointment: PatientAppointment;
}

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  isNew?: boolean;
}

export default function Medications({ patientAppointment }: MedicationProps) {
  const [newMedication, setNewMedication] = useState<Medication>({ id: 0, name: '', dosage: '', frequency: '', duration: '' })
  const [medications, setMedications] = useState<Medication[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [notes, setNotes] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);

  const handleAddMedication = () => {
    if (newMedication.name && newMedication.dosage && newMedication.frequency && newMedication.duration) {
      if (editingMedication) {
        setMedications(medications.map(med => 
          med.id === editingMedication.id ? { ...newMedication, id: med.id, isNew: true } : med
        ));
        setEditingMedication(null);
      } else {
        const medicationToAdd = { ...newMedication, id: Date.now(), isNew: true }
        setMedications([...medications, medicationToAdd])
      }
      setNewMedication({ id: 0, name: '', dosage: '', frequency: '', duration: '' })
    }
  }

  const handleEditMedication = (medication: Medication) => {
    setEditingMedication(medication);
    setNewMedication({ ...medication });
  }

  const handleRemoveMedication = (id: number) => {
    setMedications(medications.filter(med => med.id !== id))
  }

  const handleConfirm = async () => {
    const newMedications = medications.filter(med => med.isNew)
    if (newMedications.length === 0 && !notes && !diagnosis) {
      toast({
        title: "No changes to submit",
        description: "There are no new medications, notes, or diagnosis to confirm.",
        variant: "default",
      })
      return
    }

    setIsSubmitting(true);
    setSubmitMessage('Submitting data...');

    try {
      const backend_url = `${process.env.REACT_APP_BACKEND_URL}/medication`
      const response = await fetch(backend_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          medication: {
            medications: medications,
          },
          description: {
            notes: notes,
            diagnosis: diagnosis,
          },
          reservation: {
            uuid: patientAppointment.appointmentUUID,
          },
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      setSubmitMessage('Data submitted successfully!');
      toast({
        title: "Success",
        description: "Medications, notes, and diagnosis have been submitted successfully.",
        variant: "default",
      })

      setMedications(medications.map(med => ({ ...med, isNew: false })));
      setNotes('');
      setDiagnosis('');
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('Submission failed. Please try again.');
      toast({
        title: "Error",
        description: "Failed to submit data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 3000);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prescribe Medications</CardTitle>
        <CardDescription>Manage medications for {patientAppointment.patientName}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Appointment Details</h3>
          <p className="text-sm text-gray-600">Patient: {patientAppointment.patientName}</p>
          <p className="text-sm text-gray-600">Date: {patientAppointment.appointmentDate}</p>
          <p className="text-sm text-gray-600">Time: {patientAppointment.appointmentStart} - {patientAppointment.appointmentEnd}</p>
        </div>
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2">Medications</h4>
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
              {medications.map((med) => (
                <TableRow key={med.id}>
                  <TableCell className="font-medium">{med.name}</TableCell>
                  <TableCell>{med.dosage}</TableCell>
                  <TableCell>{med.frequency}</TableCell>
                  <TableCell>{med.duration}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditMedication(med)}>
                        Edit
                      </Button>
                      {med.isNew && (
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveMedication(med.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2">Diagnosis</h4>
          <Textarea
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Enter diagnosis"
            className="w-full"
          />
        </div>
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2">Notes</h4>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter additional notes"
            className="w-full"
          />
        </div>
        <div>
          <h4 className="text-md font-semibold mb-2">{editingMedication ? 'Edit Medication' : 'Add New Medication'}</h4>
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
          <div className="flex justify-between items-center mt-4">
            <Button onClick={handleAddMedication}>
              <Plus className="mr-2 h-4 w-4" /> {editingMedication ? 'Update Medication' : 'Add Medication'}
            </Button>
            <div className="flex items-center">
              {submitMessage && <p className="text-sm text-gray-600 mr-4">{submitMessage}</p>}
              <Button onClick={handleConfirm} disabled={isSubmitting || (!medications.some(med => med.isNew) && !notes && !diagnosis)}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Confirm Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}