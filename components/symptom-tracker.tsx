"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Plus, TrendingUp, TrendingDown, Minus, Brain, Heart, Thermometer, Zap } from "lucide-react"

const recentSymptoms = [
  {
    id: 1,
    name: "Headache",
    severity: 3,
    date: "Today",
    trend: "stable",
    icon: Brain,
  },
  {
    id: 2,
    name: "Fatigue",
    severity: 2,
    date: "Yesterday",
    trend: "improving",
    icon: Zap,
  },
  {
    id: 3,
    name: "Heart Rate",
    severity: 1,
    date: "2 days ago",
    trend: "stable",
    icon: Heart,
  },
  {
    id: 4,
    name: "Body Temperature",
    severity: 1,
    date: "3 days ago",
    trend: "improving",
    icon: Thermometer,
  },
]

const getSeverityColor = (severity: number) => {
  if (severity <= 1) return "bg-green-100 text-green-800 border-green-200"
  if (severity <= 2) return "bg-yellow-100 text-yellow-800 border-yellow-200"
  if (severity <= 3) return "bg-orange-100 text-orange-800 border-orange-200"
  return "bg-red-100 text-red-800 border-red-200"
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "improving":
      return <TrendingDown className="h-4 w-4 text-green-600" />
    case "worsening":
      return <TrendingUp className="h-4 w-4 text-red-600" />
    default:
      return <Minus className="h-4 w-4 text-gray-600" />
  }
}

export function SymptomTracker() {
  const [selectedSymptom, setSelectedSymptom] = useState<number | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Symptom Tracker
        </CardTitle>
        <CardDescription>Monitor your symptoms and track changes over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Recent Symptoms */}
          <div className="grid md:grid-cols-2 gap-4">
            {recentSymptoms.map((symptom) => {
              const IconComponent = symptom.icon
              return (
                <div
                  key={symptom.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedSymptom === symptom.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedSymptom(selectedSymptom === symptom.id ? null : symptom.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{symptom.name}</h4>
                        <p className="text-sm text-muted-foreground">{symptom.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(symptom.trend)}
                      <Badge variant="outline" className={getSeverityColor(symptom.severity)}>
                        {symptom.severity}/5
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Severity</span>
                      <span>{symptom.severity}/5</span>
                    </div>
                    <Progress value={symptom.severity * 20} className="h-2" />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Add New Symptom */}
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <Plus className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <h4 className="font-medium mb-2">Log New Symptom</h4>
            <p className="text-sm text-muted-foreground mb-4">Track a new symptom or update existing ones</p>
            <Button variant="outline" className="bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Symptom
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" size="sm" className="bg-transparent">
              View Chart
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              Export Data
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              Set Reminders
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
