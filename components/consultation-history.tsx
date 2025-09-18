"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, Eye, Clock } from "lucide-react"

const consultations = [
  {
    id: 1,
    date: "2024-01-15",
    time: "10:30 AM",
    summary: "Headache and fatigue symptoms",
    status: "completed",
    diagnosis: "Tension headache",
    severity: "mild",
  },
  {
    id: 2,
    date: "2024-01-10",
    time: "2:15 PM",
    summary: "Persistent cough and sore throat",
    status: "completed",
    diagnosis: "Upper respiratory infection",
    severity: "moderate",
  },
  {
    id: 3,
    date: "2024-01-05",
    time: "9:45 AM",
    summary: "Stomach pain after meals",
    status: "completed",
    diagnosis: "Possible gastritis",
    severity: "mild",
  },
  {
    id: 4,
    date: "2024-01-02",
    time: "4:20 PM",
    summary: "General health check-up",
    status: "completed",
    diagnosis: "Overall good health",
    severity: "none",
  },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "mild":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "moderate":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "severe":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-green-100 text-green-800 border-green-200"
  }
}

export function ConsultationHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Consultation History
        </CardTitle>
        <CardDescription>Your recent consultations and health assessments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {consultations.map((consultation) => (
            <div
              key={consultation.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {consultation.date} at {consultation.time}
                  </div>
                  <Badge variant="outline" className={getSeverityColor(consultation.severity)}>
                    {consultation.severity === "none" ? "Normal" : consultation.severity}
                  </Badge>
                </div>
                <h4 className="font-medium text-foreground mb-1">{consultation.summary}</h4>
                <p className="text-sm text-muted-foreground">Diagnosis: {consultation.diagnosis}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button variant="outline" className="bg-transparent">
            View All Consultations
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
