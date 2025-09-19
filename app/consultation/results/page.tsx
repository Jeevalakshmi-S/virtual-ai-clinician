"use client"

import { useState, useEffect } from "react"
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
  AlertTriangle,
  CheckCircle,
  Info,
  FileText,
  Clock,
  User,
  Pill,
  Activity,
  Apple,
} from "lucide-react"

const diagnosisResults = [
  {
    condition: "Tension Headache",
    probability: 85,
    severity: "mild",
    description: "Most likely cause based on your symptoms of headache and fatigue without fever.",
  },
  {
    condition: "Stress-related Fatigue",
    probability: 70,
    severity: "mild",
    description: "Secondary consideration given the combination of symptoms and timing.",
  },
  {
    condition: "Dehydration",
    probability: 45,
    severity: "mild",
    description: "Possible contributing factor that could worsen existing symptoms.",
  },
]

const medicineRecommendations = [
  {
    name: "Acetaminophen (Tylenol)",
    dosage: "500mg every 6-8 hours as needed",
    duration: "3-5 days maximum",
    instructions: "Take with food to prevent stomach upset. Do not exceed 3000mg per day.",
    type: "Over-the-counter",
    priority: "high",
  },
  {
    name: "Ibuprofen (Advil/Motrin)",
    dosage: "200-400mg every 6-8 hours as needed",
    duration: "3-5 days maximum",
    instructions: "Take with food. Avoid if you have stomach ulcers or kidney problems.",
    type: "Over-the-counter",
    priority: "medium",
  },
  {
    name: "Magnesium Supplement",
    dosage: "200-400mg daily",
    duration: "2-4 weeks",
    instructions: "Take with dinner to prevent digestive upset. May help prevent tension headaches.",
    type: "Supplement",
    priority: "low",
  },
]

const fitnessRecommendations = [
  {
    category: "Cardiovascular Exercise",
    activities: ["Brisk walking 30 minutes daily", "Swimming 2-3 times per week", "Cycling 20-30 minutes"],
    frequency: "5 days per week",
    intensity: "Moderate (able to hold conversation)",
    benefits: "Improves circulation, reduces stress, prevents tension headaches",
  },
  {
    category: "Stress Relief & Flexibility",
    activities: ["Yoga or gentle stretching", "Deep breathing exercises", "Progressive muscle relaxation"],
    frequency: "Daily, 10-15 minutes",
    intensity: "Low to moderate",
    benefits: "Reduces muscle tension, improves sleep quality, manages stress",
  },
  {
    category: "Strength Training",
    activities: ["Light resistance exercises", "Neck and shoulder stretches", "Core strengthening"],
    frequency: "2-3 times per week",
    intensity: "Light to moderate",
    benefits: "Improves posture, reduces neck tension, prevents future headaches",
  },
]

const nutritionRecommendations = [
  {
    category: "Hydration",
    recommendation: "Drink 8-10 glasses of water daily",
    details: "Dehydration is a common headache trigger. Keep a water bottle nearby.",
  },
  {
    category: "Regular Meals",
    recommendation: "Eat balanced meals every 3-4 hours",
    details: "Skipping meals can trigger headaches. Include protein, complex carbs, and healthy fats.",
  },
  {
    category: "Limit Triggers",
    recommendation: "Reduce caffeine, alcohol, and processed foods",
    details: "These can trigger headaches in sensitive individuals. Monitor your response.",
  },
  {
    category: "Sleep Hygiene",
    recommendation: "Maintain 7-9 hours of quality sleep",
    details: "Poor sleep is a major headache trigger. Keep consistent sleep and wake times.",
  },
]

const recommendations = [
  {
    type: "immediate",
    icon: CheckCircle,
    title: "Rest and Hydration",
    description: "Get adequate sleep (7-9 hours) and drink plenty of water throughout the day.",
    priority: "high",
  },
  {
    type: "medication",
    icon: Info,
    title: "Over-the-counter Pain Relief",
    description: "Consider acetaminophen or ibuprofen as directed on packaging for headache relief.",
    priority: "medium",
  },
  {
    type: "lifestyle",
    icon: Heart,
    title: "Stress Management",
    description: "Practice relaxation techniques, regular exercise, and maintain a consistent sleep schedule.",
    priority: "medium",
  },
  {
    type: "followup",
    icon: Calendar,
    title: "Monitor Symptoms",
    description: "Track your symptoms for the next 3-5 days. Seek medical attention if they worsen.",
    priority: "low",
  },
]

const warningSignsData = [
  "Severe headache that worsens rapidly",
  "High fever (over 101°F/38.3°C)",
  "Persistent vomiting",
  "Confusion or difficulty speaking",
  "Vision changes or sensitivity to light",
]

export default function ConsultationResultsPage() {
  const [activeTab, setActiveTab] = useState<"diagnosis" | "recommendations" | "medicines" | "fitness" | "report">(
    "diagnosis",
  )

  useEffect(() => {
    const speakResults = () => {
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(
          `Your consultation is complete. Based on your symptoms, the most likely diagnosis is ${diagnosisResults[0].condition} with ${diagnosisResults[0].probability}% probability. I recommend rest, hydration, and over-the-counter pain relief as needed. Please review your detailed recommendations and medicine suggestions.`,
        )
        utterance.rate = 0.8
        utterance.pitch = 1
        utterance.volume = 0.8
        speechSynthesis.speak(utterance)
      }
    }

    // Auto-speak after 2 seconds
    const timer = setTimeout(speakResults, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleDownloadReport = () => {
    const reportContent = `
AI CLINICIAN CONSULTATION REPORT
================================

Patient: John Doe
Date: ${new Date().toLocaleDateString()}
Consultation ID: #CON-2024-001

DIAGNOSIS:
- ${diagnosisResults[0].condition} (${diagnosisResults[0].probability}% probability)
- ${diagnosisResults[1].condition} (${diagnosisResults[1].probability}% probability)

MEDICINE RECOMMENDATIONS:
${medicineRecommendations.map((med) => `- ${med.name}: ${med.dosage} for ${med.duration}`).join("\n")}

FITNESS PLAN:
${fitnessRecommendations.map((fit) => `- ${fit.category}: ${fit.frequency}`).join("\n")}

NUTRITION GUIDELINES:
${nutritionRecommendations.map((nut) => `- ${nut.category}: ${nut.recommendation}`).join("\n")}

FOLLOW-UP:
Monitor symptoms for 3-5 days. Seek medical attention if symptoms worsen.
    `

    const element = document.createElement("a")
    const file = new Blob([reportContent], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `consultation-report-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleShareReport = async () => {
    const shareData = {
      title: "AI Clinician Consultation Report",
      text: `My consultation results: ${diagnosisResults[0].condition} with personalized treatment plan`,
      url: window.location.href,
    }

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`)
        alert("Report details copied to clipboard!")
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`)
      alert("Report details copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/consultation">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Consultation
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-foreground">Consultation Results</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShareReport}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Summary Card */}
        <Card className="mb-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-2">Consultation Complete</h2>
                <p className="text-muted-foreground mb-4">
                  Based on your symptoms and medical history, I've analyzed your condition and prepared personalized
                  recommendations including medicine and fitness plans.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Completed: {new Date().toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    Consultation ID: #CON-2024-001
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex gap-1 mb-6 bg-muted p-1 rounded-lg overflow-x-auto">
          {[
            { id: "diagnosis", label: "Diagnosis", icon: FileText },
            { id: "recommendations", label: "Recommendations", icon: Heart },
            { id: "medicines", label: "Medicines", icon: Pill },
            { id: "fitness", label: "Fitness Plan", icon: Activity },
            { id: "report", label: "Full Report", icon: Download },
          ].map((tab) => {
            const IconComponent = tab.icon
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                className={`flex-1 min-w-fit ${activeTab === tab.id ? "" : "bg-transparent"}`}
                onClick={() => setActiveTab(tab.id as any)}
              >
                <IconComponent className="h-4 w-4 mr-2" />
                {tab.label}
              </Button>
            )
          })}
        </div>

        {/* Content based on active tab */}
        {activeTab === "diagnosis" && (
          <div className="space-y-6">
            {/* Diagnosis Results */}
            <Card>
              <CardHeader>
                <CardTitle>Possible Diagnoses</CardTitle>
                <CardDescription>
                  Based on your symptoms, here are the most likely conditions ranked by probability
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {diagnosisResults.map((diagnosis, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{diagnosis.condition}</h3>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            diagnosis.severity === "mild"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : diagnosis.severity === "moderate"
                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                : "bg-red-50 text-red-700 border-red-200"
                          }
                        >
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
                  When to Seek Immediate Medical Attention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {warningSignsData.map((sign, index) => (
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

        {activeTab === "recommendations" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>
                  Follow these recommendations to help manage your symptoms and improve your health
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.map((rec, index) => {
                  const IconComponent = rec.icon
                  return (
                    <div key={index} className="flex gap-4 p-4 border rounded-lg">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          rec.priority === "high"
                            ? "bg-red-100 text-red-600"
                            : rec.priority === "medium"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-green-100 text-green-600"
                        }`}
                      >
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{rec.title}</h3>
                          <Badge
                            variant="outline"
                            size="sm"
                            className={
                              rec.priority === "high"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : rec.priority === "medium"
                                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                  : "bg-green-50 text-green-700 border-green-200"
                            }
                          >
                            {rec.priority} priority
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "medicines" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-primary" />
                  Medicine Recommendations
                </CardTitle>
                <CardDescription>
                  Recommended medications to help manage your symptoms. Always consult a pharmacist or doctor before
                  taking new medications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {medicineRecommendations.map((medicine, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{medicine.name}</h3>
                        <Badge variant="outline" className="mt-1">
                          {medicine.type}
                        </Badge>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          medicine.priority === "high"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : medicine.priority === "medium"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                              : "bg-green-50 text-green-700 border-green-200"
                        }
                      >
                        {medicine.priority} priority
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Dosage:</strong> {medicine.dosage}
                      </div>
                      <div>
                        <strong>Duration:</strong> {medicine.duration}
                      </div>
                      <div>
                        <strong>Instructions:</strong> {medicine.instructions}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Info className="h-5 w-5" />
                  Important Medicine Safety Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    Always read medication labels and follow dosage instructions carefully
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    Consult a pharmacist about potential drug interactions
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    Stop taking and seek medical attention if you experience severe side effects
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    Keep medications in original containers and store as directed
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "fitness" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Personalized Fitness Plan
                </CardTitle>
                <CardDescription>
                  Exercise recommendations tailored to help manage your symptoms and improve overall health
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {fitnessRecommendations.map((fitness, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">{fitness.category}</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <strong className="text-sm">Frequency:</strong>
                        <p className="text-sm text-muted-foreground">{fitness.frequency}</p>
                      </div>
                      <div>
                        <strong className="text-sm">Intensity:</strong>
                        <p className="text-sm text-muted-foreground">{fitness.intensity}</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <strong className="text-sm">Recommended Activities:</strong>
                      <ul className="text-sm text-muted-foreground mt-1">
                        {fitness.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <strong className="text-sm">Benefits:</strong>
                      <p className="text-sm text-muted-foreground">{fitness.benefits}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Apple className="h-5 w-5 text-primary" />
                  Nutrition Guidelines
                </CardTitle>
                <CardDescription>
                  Dietary recommendations to support your recovery and prevent future symptoms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {nutritionRecommendations.map((nutrition, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">{nutrition.category}</h3>
                    <p className="text-sm font-medium text-primary mb-1">{nutrition.recommendation}</p>
                    <p className="text-sm text-muted-foreground">{nutrition.details}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "report" && (
          <Card>
            <CardHeader>
              <CardTitle>Full Consultation Report</CardTitle>
              <CardDescription>Complete summary of your consultation session with all recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-sm max-w-none">
                <h3>Patient Information</h3>
                <p>Consultation Date: {new Date().toLocaleDateString()}</p>
                <p>Session Duration: 15 minutes</p>

                <Separator className="my-4" />

                <h3>Chief Complaint</h3>
                <p>Patient reported experiencing headaches and fatigue for the past few days.</p>

                <Separator className="my-4" />

                <h3>Assessment</h3>
                <p>
                  Based on the symptoms described, the most likely diagnosis is tension headache (85% probability) with
                  associated stress-related fatigue (70% probability).
                </p>

                <Separator className="my-4" />

                <h3>Medicine Recommendations</h3>
                <ul>
                  {medicineRecommendations.map((med, index) => (
                    <li key={index}>
                      {med.name}: {med.dosage} for {med.duration}
                    </li>
                  ))}
                </ul>

                <Separator className="my-4" />

                <h3>Fitness & Lifestyle Plan</h3>
                <ul>
                  <li>Cardiovascular exercise 5 days per week (30 minutes)</li>
                  <li>Daily stress relief activities (yoga, stretching)</li>
                  <li>Strength training 2-3 times per week</li>
                  <li>Maintain proper hydration (8-10 glasses daily)</li>
                  <li>Regular sleep schedule (7-9 hours nightly)</li>
                </ul>

                <Separator className="my-4" />

                <h3>Follow-up</h3>
                <p>
                  Patient advised to monitor symptoms for 3-5 days and seek medical attention if symptoms worsen or if
                  any warning signs develop.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={handleDownloadReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Full Report
                </Button>
                <Button variant="outline" onClick={handleShareReport} className="bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Report
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bottom Actions */}
        <div className="flex justify-center gap-4 mt-8">
          <Link href="/dashboard">
            <Button variant="outline" className="bg-transparent">
              Return to Dashboard
            </Button>
          </Link>
          <Link href="/consultation">
            <Button>Start New Consultation</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
