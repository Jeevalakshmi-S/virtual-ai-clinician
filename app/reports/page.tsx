"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  ArrowLeft,
  Search,
  Filter,
  Download,
  Share2,
  Eye,
  Calendar,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"

interface Report {
  id: string
  date: string
  time: string
  title: string
  diagnosis: string
  severity: "none" | "mild" | "moderate" | "severe"
  status: "completed" | "pending" | "follow-up-needed"
  symptoms: string[]
  recommendations: number
  duration: string
}

const reports: Report[] = [
  {
    id: "RPT-2024-001",
    date: "2024-01-15",
    time: "10:30 AM",
    title: "Headache and Fatigue Assessment",
    diagnosis: "Tension Headache",
    severity: "mild",
    status: "completed",
    symptoms: ["Headache", "Fatigue", "Stress"],
    recommendations: 4,
    duration: "15 min",
  },
  {
    id: "RPT-2024-002",
    date: "2024-01-10",
    time: "2:15 PM",
    title: "Respiratory Symptoms Evaluation",
    diagnosis: "Upper Respiratory Infection",
    severity: "moderate",
    status: "follow-up-needed",
    symptoms: ["Cough", "Sore Throat", "Congestion"],
    recommendations: 6,
    duration: "22 min",
  },
  {
    id: "RPT-2024-003",
    date: "2024-01-05",
    time: "9:45 AM",
    title: "Digestive Issues Consultation",
    diagnosis: "Possible Gastritis",
    severity: "mild",
    status: "completed",
    symptoms: ["Stomach Pain", "Nausea", "Bloating"],
    recommendations: 5,
    duration: "18 min",
  },
  {
    id: "RPT-2024-004",
    date: "2024-01-02",
    time: "4:20 PM",
    title: "General Health Check-up",
    diagnosis: "Overall Good Health",
    severity: "none",
    status: "completed",
    symptoms: ["Routine Check"],
    recommendations: 3,
    duration: "12 min",
  },
  {
    id: "RPT-2023-015",
    date: "2023-12-28",
    time: "11:00 AM",
    title: "Sleep Disorder Assessment",
    diagnosis: "Insomnia",
    severity: "moderate",
    status: "completed",
    symptoms: ["Insomnia", "Anxiety", "Fatigue"],
    recommendations: 7,
    duration: "25 min",
  },
  {
    id: "RPT-2023-014",
    date: "2023-12-20",
    time: "3:30 PM",
    title: "Skin Condition Evaluation",
    diagnosis: "Eczema Flare-up",
    severity: "mild",
    status: "completed",
    symptoms: ["Itching", "Rash", "Dry Skin"],
    recommendations: 4,
    duration: "16 min",
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

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200"
    case "pending":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "follow-up-needed":
      return "bg-orange-100 text-orange-800 border-orange-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4" />
    case "pending":
      return <Clock className="h-4 w-4" />
    case "follow-up-needed":
      return <AlertTriangle className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSeverity, setFilterSeverity] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("date-desc")

  const filteredReports = reports
    .filter((report) => {
      const matchesSearch =
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.symptoms.some((symptom) => symptom.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesSeverity = filterSeverity === "all" || report.severity === filterSeverity
      const matchesStatus = filterStatus === "all" || report.status === filterStatus

      return matchesSearch && matchesSeverity && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "severity":
          const severityOrder = { severe: 4, moderate: 3, mild: 2, none: 1 }
          return severityOrder[b.severity] - severityOrder[a.severity]
        default:
          return 0
      }
    })

  const handleDownloadReport = (reportId: string) => {
    // Simulate PDF download
    const element = document.createElement("a")
    const file = new Blob([`Report ${reportId} - AI Clinician`], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `report-${reportId}.pdf`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleShareReport = (reportId: string) => {
    if (navigator.share) {
      navigator.share({
        title: `AI Clinician Report ${reportId}`,
        text: `Medical consultation report from AI Clinician`,
        url: `${window.location.origin}/reports/${reportId}`,
      })
    }
  }

  const handleBulkDownload = () => {
    // Simulate bulk download
    const element = document.createElement("a")
    const file = new Blob(["All Reports - AI Clinician"], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "all-reports.zip"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-foreground">Medical Reports</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleBulkDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{reports.length}</div>
              <div className="text-sm text-muted-foreground">Total Reports</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {reports.filter((r) => r.status === "completed").length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {reports.filter((r) => r.status === "follow-up-needed").length}
              </div>
              <div className="text-sm text-muted-foreground">Need Follow-up</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">30</div>
              <div className="text-sm text-muted-foreground">Days Tracked</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter & Search Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="none">Normal</SelectItem>
                  <SelectItem value="mild">Mild</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="severe">Severe</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="follow-up-needed">Follow-up Needed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Newest First</SelectItem>
                  <SelectItem value="date-asc">Oldest First</SelectItem>
                  <SelectItem value="severity">By Severity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No reports found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters to find the reports you're looking for.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setFilterSeverity("all")
                    setFilterStatus("all")
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-foreground">{report.title}</h3>
                        <Badge variant="outline" className={getSeverityColor(report.severity)}>
                          {report.severity === "none" ? "Normal" : report.severity}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(report.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(report.status)}
                            {report.status.replace("-", " ")}
                          </div>
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Calendar className="h-4 w-4" />
                            {report.date} at {report.time}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Diagnosis:</span> {report.diagnosis}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Duration:</span> {report.duration}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm mb-2">
                            <span className="font-medium">Symptoms:</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {report.symptoms.map((symptom, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {symptom}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-sm mt-2">
                            <span className="font-medium">Recommendations:</span> {report.recommendations}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Link href={`/reports/${report.id}`}>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadReport(report.id)}
                        className="bg-transparent"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShareReport(report.id)}
                        className="bg-transparent"
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Pagination would go here if needed */}
        {filteredReports.length > 0 && (
          <div className="flex justify-center mt-8">
            <p className="text-sm text-muted-foreground">
              Showing {filteredReports.length} of {reports.length} reports
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
