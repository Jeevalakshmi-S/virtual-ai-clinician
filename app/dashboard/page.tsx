"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  MessageSquare,
  Calendar,
  Settings,
  User,
  TrendingUp,
  FileText,
  Stethoscope,
  Shield,
  Clock,
} from "lucide-react"
import { ConsultationHistory } from "@/components/consultation-history"
import { EmergencyHelp } from "@/components/emergency-help"

export default function DashboardPage() {
  const [userName] = useState("Dr. John Doe") // This would come from auth context

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">AI Clinician</h1>
              <p className="text-sm text-muted-foreground">Virtual Healthcare Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/reports">
              <Button variant="outline" size="sm" className="bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                Reports
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" size="sm" className="bg-transparent">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border-primary/20 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center ring-4 ring-primary/20">
                    <img
                      src="/professional-women-doctor-avatar.jpg"
                      alt="AI Doctor Avatar"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back!</h2>
                  <p className="text-muted-foreground text-lg mb-4">
                    I'm Dr. AI, your virtual healthcare assistant. I'm here to help you with medical consultations,
                    health tracking, and personalized care recommendations.
                  </p>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-green-600 font-medium">HIPAA Compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-600 font-medium">24/7 Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4 text-primary" />
                      <span className="text-primary font-medium">AI-Powered Diagnosis</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Card className="text-center p-8 bg-gradient-to-br from-card to-card/50 shadow-lg border-primary/10">
            <CardContent className="space-y-6">
              <div className="w-28 h-28 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <MessageSquare className="h-14 w-14 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-card-foreground mb-3">Ready for a consultation?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Start an intelligent conversation with our AI clinician. Get personalized health advice, symptom
                  analysis, medicine recommendations, and fitness plans tailored just for you.
                </p>
                <Link href="/consultation">
                  <Button size="lg" className="text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Start Consultation
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Consultation History */}
          <div className="lg:col-span-2">
            <ConsultationHistory />
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Emergency Help */}
            <EmergencyHelp />

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Health Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Health Score</span>
                    <span className="font-medium text-primary">85%</span>
                  </div>
                  <Progress value={85} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">Based on recent consultations and health data</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-xs text-muted-foreground">Total Consultations</div>
                  </div>
                  <div className="text-center p-3 bg-accent/5 rounded-lg">
                    <div className="text-2xl font-bold text-accent">7</div>
                    <div className="text-xs text-muted-foreground">Days Active</div>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-sm font-medium mb-2">Recent Activity</div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div>• Last consultation: 2 days ago</div>
                    <div>• Health score improved by 5%</div>
                    <div>• 3 recommendations completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-primary/10">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-lg">View Reports</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Access all your consultation reports, medical history, and download detailed health summaries
              </p>
              <Link href="/reports">
                <Button
                  variant="outline"
                  className="w-full bg-transparent group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  View All Reports
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-primary/10">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-lg">Schedule Follow-up</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Book a telemedicine appointment with a real doctor or schedule a follow-up consultation
              </p>
              <Button
                variant="outline"
                className="w-full bg-transparent group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                Schedule Appointment
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-primary/10">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <User className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-lg">Update Profile</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Keep your health information, medical history, and preferences up to date for better care
              </p>
              <Link href="/profile">
                <Button
                  variant="outline"
                  className="w-full bg-transparent group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  Edit Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
