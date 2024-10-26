import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../components/card"
import { Label } from "../components/label"
import { Button } from "../components/button"
import { Textarea } from "../components/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/table"
import { Brain } from 'lucide-react'

const getAISuggestions = (condition: string) => {
  const suggestions = [
    { name: "Amoxicillin", dosage: "500mg", frequency: "3x daily", duration: "7 days" },
    { name: "Ibuprofen", dosage: "400mg", frequency: "As needed", duration: "For pain" },
    { name: "Loratadine", dosage: "10mg", frequency: "1x daily", duration: "For allergies" },
  ]
  return new Promise<typeof suggestions>(resolve => {
    setTimeout(() => resolve(suggestions), 1000)
  })
}

export default function AIDiagnosisAssistant() {
  const [patientCondition, setPatientCondition] = useState('')
  const [aiSuggestions, setAiSuggestions] = useState<Array<{ name: string; dosage: string; frequency: string; duration: string }>>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleGetAISuggestions = async () => {
    setIsLoading(true)
    try {
      const suggestions = await getAISuggestions(patientCondition)
      setAiSuggestions(suggestions)
    } catch (error) {
      console.error("Error getting AI suggestions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Diagnosis Assistant</CardTitle>
        <CardDescription>Get AI-powered medication suggestions based on patient's condition</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patientCondition">Patient's Condition</Label>
            <Textarea
              id="patientCondition"
              placeholder="Describe the patient's symptoms and condition here..."
              value={patientCondition}
              onChange={(e) => setPatientCondition(e.target.value)}
              rows={4}
            />
          </div>
          <Button onClick={handleGetAISuggestions} disabled={isLoading}>
            {isLoading ? (
              <>
                <Brain className="mr-2 h-4 w-4 animate-pulse" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Get AI Suggestions
              </>
            )}
          </Button>
        </div>
        {aiSuggestions.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">AI-Suggested Medications</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medication</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aiSuggestions.map((suggestion, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{suggestion.name}</TableCell>
                    <TableCell>{suggestion.dosage}</TableCell>
                    <TableCell>{suggestion.frequency}</TableCell>
                    <TableCell>{suggestion.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Note: AI suggestions are for reference only. Always use your professional judgment and consider the patient's full medical history before prescribing.
        </p>
      </CardFooter>
    </Card>
  )
}