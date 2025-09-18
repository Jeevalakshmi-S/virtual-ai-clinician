"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  ArrowLeft,
  Download,
  Share2,
  Calendar,
  Clock,
  User,
  FileText,
  AlertTriangle,
  CheckCircle,
  Printer,
} from "lucide-react"

// This would normally come from an API or database
const getReportData = (id: string) => {
  return {
    id: "RPT-2024-001",
    date: "2024-01-15",
    time: "10:30 AM",
    duration: "15 minutes",
    title: "Headache and Fatigue Assessment",
    patientName: "John Doe",
    symptoms: [
      { name: "Headache", severity: 7, duration: "3 days", location: "Frontal region" },
      { name: "Fatigue", severity: 6, duration: "3 days", description: "General tiredness" },
      { name: "Stress", severity: 5, duration: "1 week", description: "Work-related stress" },
    ],
    diagnosis: [
      {
        condition: "Tension Headache",
        probability: 85,
        severity: "mild",
        description: "Most likely cause based on symptoms and stress factors.",
      },
      {
        condition: "Stress-related Fatigue",
        probability: 70,
        severity: "mild",
        description: "Secondary condition contributing to overall symptoms.",
      },
    ],
    recommendations: [
      {
        type: "immediate",
        priority: "high",
        title: "Rest and Hydration",
        description: "Get 7-9 hours of sleep and drink 8-10 glasses of water daily.",
        completed: false,
      },
      {
        type: "medication",
        priority: "medium",
        title: "Pain Relief",
        description: "Take acetaminophen 500mg every 6 hours as needed for headache.",
        completed: false,
      },
      {
        type: "lifestyle",
        priority: "medium",
        title: "Stress Management",
        description: "Practice relaxation techniques like deep breathing or meditation.",
        completed: false,
      },
      {
        type: "followup",
        priority: "low",
        title: "Monitor Symptoms",
        description: "Track symptoms for 5 days. Return if symptoms worsen.",
        completed: false,
      },
    ],
    warningSigns: [
      "Severe headache that worsens rapidly",
      "High fever (over 101°F/38.3°C)",
      "Persistent vomiting",
      "Confusion or difficulty speaking",
      "Vision changes or sensitivity to light",
    ],
    followUpDate: "2024-01-22",
    status: "completed",
  }
}

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  const [activeSection, setActiveSection] = useState<"overview" | "symptoms" | "diagnosis" | "recommendations">(
    "overview",
  )
  const report = getReportData(params.id)

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([`Detailed Report ${report.id} - AI Clinician`], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `detailed-report-${report.id}.pdf`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Medical Report ${report.id}`,
        text: `Consultation report from AI Clinician`,
        url: window.location.href,
      })
    }
  }

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 print:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/reports">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Reports
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-foreground">Report Details</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Report Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">{report.title}</h2>
                <p className="text-muted-foreground text-lg">Medical Consultation Report</p>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="h-4 w-4 mr-1" />
                {report.status}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Patient:</span>
                  <span>{report.patientName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Date:</span>
                  <span>
                    {report.date} at {report.time}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Duration:</span>
                  <span>{report.duration}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Report ID:</span>
                  <span>{report.id}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Follow-up:</span>
                  <span>{report.followUpDate}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex gap-1 mb-6 bg-muted p-1 rounded-lg print:hidden">
          {[
            { id: "overview", label: "Overview" },
            { id: "symptoms", label: "Symptoms" },
            { id: "diagnosis", label: "Diagnosis" },
            { id: "recommendations", label: "Recommendations" },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeSection === tab.id ? "default" : "ghost"}
              className={`flex-1 ${activeSection === tab.id ? "" : "bg-transparent"}`}
              onClick={() => setActiveSection(tab.id as any)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content Sections */}
        {activeSection === "overview" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Consultation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Chief Complaint</h4>
                  <p className="text-muted-foreground">
                    Patient reported experiencing headaches and fatigue for the past 3 days, with associated
                    work-related stress.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Primary Diagnosis</h4>
                  <div className="flex items-center gap-2">
                    <span>Tension Headache</span>
                    <Badge variant="outline" className={getSeverityColor("mild")}>
                      Mild
                    </Badge>
                    <span className="text-sm text-muted-foreground">(85% confidence)</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Key Recommendations</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Adequate rest and hydration</li>
                    <li>Over-the-counter pain relief as needed</li>
                    <li>Stress management techniques</li>
                    <li>Symptom monitoring for 5 days</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "symptoms" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reported Symptoms</CardTitle>
                <CardDescription>Detailed breakdown of symptoms and their characteristics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {report.symptoms.map((symptom, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-lg">{symptom.name}</h4>
                      <Badge variant="outline" className={getSeverityColor("moderate")}>
                        Severity: {symptom.severity}/10
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Progress value={symptom.severity * 10} className="h-2" />
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Duration:</span> {symptom.duration}
                        </div>
                        {symptom.location && (
                          <div>
                            <span className="font-medium">Location:</span> {symptom.location}
                          </div>
                        )}
                      </div>
                      {symptom.description && (
                        <p className="text-sm text-muted-foreground mt-2">{symptom.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "diagnosis" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Diagnostic Assessment</CardTitle>
                <CardDescription>AI analysis of possible conditions based on reported symptoms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {report.diagnosis.map((diagnosis, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-lg">{diagnosis.condition}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getSeverityColor(diagnosis.severity)}>
                          {diagnosis.severity}
                        </Badge>
                        <span className="text-sm font-medium">{diagnosis.probability}%</span>
                      </div>
                    </div>
                    <Progress value={diagnosis.probability} className="mb-3" />
                    <p className="text-sm text-muted-foreground">{diagnosis.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Warning Signs */}
            <Card className="border-orange-200 bg-orange-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <AlertTriangle className="h-5 w-5" />
                  Warning Signs - Seek Immediate Medical Attention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {report.warningSigns.map((sign, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      {sign}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "recommendations" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Treatment Recommendations</CardTitle>
                <CardDescription>Personalized care plan based on your consultation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {report.recommendations.map((rec, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{rec.title}</h4>
                          <Badge variant="outline" className={getPriorityColor(rec.priority)}>
                            {rec.priority} priority
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                      </div>
                      <div className="ml-4">
                        {rec.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-muted-foreground rounded-full" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Print-friendly full report */}
        <div className="hidden print:block space-y-6 mt-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">AI Clinician Medical Report</h1>
            <p className="text-muted-foreground">Generated on {new Date().toLocaleDateString()}</p>
          </div>

          {/* All sections would be rendered here for printing */}
        </div>
      </main>
    </div>
  )
}
