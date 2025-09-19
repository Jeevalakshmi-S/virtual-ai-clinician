"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, Send, Mic, MicOff, Volume2, VolumeX, User, Bot, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: number
  type: "user" | "ai"
  content: string
  timestamp: Date
}

const consultationSteps = ["Initial Symptoms", "Follow-up Questions", "Medical History", "Analysis", "Results"]

const consultationQuestions = [
  "Hello! I'm Dr. AI, your virtual healthcare assistant. I'm here to help you understand your symptoms and provide personalized health guidance. Please tell me what symptoms you're experiencing today.",
  "Thank you for that information. When did these symptoms first start? Have you noticed any patterns or triggers that make them better or worse?",
  "Do you have any known allergies or are you currently taking any medications? Also, have you experienced any fever, nausea, or changes in appetite?",
  "Have you had similar symptoms before? Do you have any chronic conditions or family history of medical conditions I should be aware of?",
  "On a scale of 1-10, how would you rate the severity of your symptoms? Are they interfering with your daily activities or sleep?",
]

const generateMedicalReport = (symptoms: string[]) => {
  const symptomsText = symptoms.join(" ").toLowerCase()

  let diagnosis = "General Health Assessment"
  let medicines: string[] = []
  let recommendations: string[] = []
  let fitnessPlans: string[] = []

  // Specific symptom-diagnosis mappings based on user requirements
  if (symptomsText.includes("runny nose") && symptomsText.includes("sore throat")) {
    diagnosis = "Common Cold"
    medicines = [
      "Paracetamol (Crocin, Dolo-650, Tylenol) – fever & body pain",
      "Cetirizine (Cetzine, Reactine) – runny nose",
      "Oxymetazoline nasal spray (Otrivin) – nasal congestion (short-term)",
    ]
    recommendations = ["Rest, warm fluids, steam inhalation"]
    fitnessPlans = ["Light walking/stretching only"]
  } else if (symptomsText.includes("itchy eyes") && symptomsText.includes("sneezing")) {
    diagnosis = "Allergic Rhinitis"
    medicines = [
      "Cetirizine (Cetzine) or Loratadine (Claritin) – antihistamine",
      "Fluticasone nasal spray (Flonase, Nasivion FX) – if persistent",
    ]
    recommendations = ["Avoid dust/pollen, keep windows closed, shower after outdoors"]
    fitnessPlans = ["Normal indoor exercise; avoid outdoor workouts on high pollen days"]
  } else if (symptomsText.includes("diarrhea") && symptomsText.includes("stomach cramps")) {
    diagnosis = "Gastroenteritis"
    medicines = [
      "ORS (Electral, Pedialyte) – rehydration",
      "Paracetamol (Dolo-650, Crocin) – if fever",
      "Ondansetron (Emeset, Zofran) – for vomiting (doctor's advice)",
    ]
    recommendations = ["Drink plenty of fluids, bland diet (banana, rice, toast)"]
    fitnessPlans = ["Rest until rehydrated; resume gradually"]
  } else if (symptomsText.includes("head pressure") || symptomsText.includes("tightness")) {
    diagnosis = "Tension Headache"
    medicines = ["Paracetamol (Dolo-650, Crocin)", "Ibuprofen (Brufen, Advil) – if not allergic/stomach issues"]
    recommendations = ["Reduce stress, correct posture, stay hydrated"]
    fitnessPlans = ["Yoga, stretching, breathing exercises"]
  } else if (symptomsText.includes("burning urination")) {
    diagnosis = "Urinary Tract Infection (UTI)"
    medicines = [
      "Nitrofurantoin (Nitrofurantoin Macrobid/Macrobid) – commonly prescribed",
      "Ciprofloxacin (Ciplox) – sometimes used (doctor's advice only)",
      "Phenazopyridine (Pyridium) – pain relief (short-term)",
    ]
    recommendations = ["Drink 2–3 liters water, avoid caffeine/alcohol"]
    fitnessPlans = ["Light activity; rest more if fever present"]
  } else if (symptomsText.includes("red") && symptomsText.includes("itchy skin")) {
    diagnosis = "Contact Dermatitis"
    medicines = [
      "Hydrocortisone 1% cream (Locoid, Cortizone-10)",
      "Cetirizine/Loratadine – if itching severe",
      "Moisturizer (Cetaphil, Vaseline)",
    ]
    recommendations = ["Avoid irritant, keep skin moisturized"]
    fitnessPlans = ["Normal exercise; avoid sweating on rash"]
  } else if (
    symptomsText.includes("red") &&
    (symptomsText.includes("sticky eye") || symptomsText.includes("watery eye"))
  ) {
    diagnosis = "Conjunctivitis"
    medicines = [
      "Chloramphenicol eye drops/ointment – for bacterial",
      "Olopatadine (Patanol) drops – for allergic type",
      "Artificial tears (Refresh Tears, Systane) – soothing",
    ]
    recommendations = ["Wash hands often, don't share towels"]
    fitnessPlans = ["Normal activity; avoid swimming until cured"]
  } else if (symptomsText.includes("swollen") && symptomsText.includes("bite")) {
    diagnosis = "Insect Bite Reaction"
    medicines = [
      "Cetirizine (Cetzine) – itching",
      "Calamine lotion (Caladryl) – soothing",
      "Hydrocortisone cream 1% – if swelling severe",
    ]
    recommendations = ["Cold compress, don't scratch"]
    fitnessPlans = ["Normal routine; avoid heavy exercise first 24 hrs"]
  } else if (symptomsText.includes("swollen ankle") && symptomsText.includes("twist")) {
    diagnosis = "Ankle Sprain"
    medicines = ["Paracetamol (Dolo-650, Crocin)", "Ibuprofen (Brufen, Advil) – for pain/swelling"]
    recommendations = ["RICE (Rest, Ice, Compression, Elevation)"]
    fitnessPlans = ["Gentle movement after 2–3 days, physiotherapy if needed"]
  } else if (symptomsText.includes("white patches") && symptomsText.includes("mouth")) {
    diagnosis = "Oral Thrush"
    medicines = ["Nystatin oral suspension – swish and swallow", "Clotrimazole lozenges (Candizole troches)"]
    recommendations = ["Maintain oral hygiene, rinse after antibiotics/inhaler use"]
    fitnessPlans = ["No restriction; focus on nutrition & hydration"]
  } else if (symptomsText.includes("headache") || symptomsText.includes("head")) {
    diagnosis = "Tension Headache"
    medicines = ["Paracetamol (Dolo-650, Crocin)", "Ibuprofen (Brufen, Advil) – if not allergic/stomach issues"]
    recommendations = ["Reduce stress, correct posture, stay hydrated"]
    fitnessPlans = ["Yoga, stretching, breathing exercises"]
  } else if (symptomsText.includes("fever") || symptomsText.includes("temperature")) {
    diagnosis = "Viral Infection / Fever"
    medicines = [
      "Paracetamol (Dolo-650, Crocin) – fever reduction",
      "Plenty of fluids – Water, herbal teas, clear broths",
      "Oral Rehydration Solution (ORS) if needed",
    ]
    recommendations = ["Complete bed rest for 2-3 days", "Monitor temperature regularly"]
    fitnessPlans = ["Complete rest - No exercise during fever", "Gradual return to activity after recovery"]
  } else if (symptomsText.includes("cough") || symptomsText.includes("cold")) {
    diagnosis = "Common Cold"
    medicines = [
      "Paracetamol (Crocin, Dolo-650, Tylenol) – fever & body pain",
      "Cetirizine (Cetzine, Reactine) – runny nose",
      "Oxymetazoline nasal spray (Otrivin) – nasal congestion (short-term)",
    ]
    recommendations = ["Rest, warm fluids, steam inhalation"]
    fitnessPlans = ["Light walking/stretching only"]
  } else if (symptomsText.includes("stomach") || symptomsText.includes("nausea") || symptomsText.includes("vomit")) {
    diagnosis = "Gastroenteritis"
    medicines = [
      "ORS (Electral, Pedialyte) – rehydration",
      "Paracetamol (Dolo-650, Crocin) – if fever",
      "Ondansetron (Emeset, Zofran) – for vomiting (doctor's advice)",
    ]
    recommendations = ["Drink plenty of fluids, bland diet (banana, rice, toast)"]
    fitnessPlans = ["Rest until rehydrated; resume gradually"]
  } else {
    // General health recommendations
    medicines = [
      "Maintain proper hydration - 8-10 glasses of water daily",
      "Multivitamin supplement if dietary intake is inadequate",
      "Adequate sleep - 7-9 hours per night",
    ]
    recommendations = [
      "Maintain a balanced diet with fruits and vegetables",
      "Regular health check-ups every 6 months",
      "Practice stress management techniques",
      "Monitor your symptoms and seek medical advice if they persist",
    ]
    fitnessPlans = [
      "Regular cardio exercise - 30 minutes, 5 days a week",
      "Strength training - 2-3 times per week",
      "Flexibility exercises - Daily stretching",
    ]
  }

  return {
    diagnosis,
    medicines,
    recommendations,
    fitnessPlans,
  }
}

export default function ConsultationPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      content: consultationQuestions[0],
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [currentStep, setCurrentStep] = useState(0)
  const [questionCount, setQuestionCount] = useState(0)
  const [consultationData, setConsultationData] = useState<string[]>([])
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [showExamples, setShowExamples] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const router = useRouter()

  const exampleSymptoms = [
    "Runny nose, sore throat",
    "Itchy eyes, sneezing",
    "Diarrhea, stomach cramps",
    "Head pressure, tightness",
    "Red, itchy skin patch",
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage && lastMessage.type === "ai" && !isSpeaking) {
      // Auto-speak AI messages after a short delay
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(lastMessage.content)
        utterance.rate = 0.9
        utterance.pitch = 1.1
        setIsSpeaking(true)
        utterance.onend = () => setIsSpeaking(false)
        window.speechSynthesis.speak(utterance)
      }, 500)
    }
  }, [messages])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value)
    // Stop current speech when user starts typing
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }

    if (showExamples) {
      setShowExamples(false)
    }

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setConsultationData((prev) => [...prev, inputMessage])
    const currentInput = inputMessage
    setInputMessage("")
    setIsTyping(true)

    setTimeout(() => {
      if (questionCount >= 4) {
        const allSymptoms = [...consultationData, currentInput]
        const report = generateMedicalReport(allSymptoms)

        const reportMessage = `
🏥 **MEDICAL CONSULTATION REPORT**

**DIAGNOSIS:** ${report.diagnosis}

**💊 RECOMMENDED MEDICINES:**
${report.medicines.map((med, index) => `${index + 1}. ${med}`).join("\n")}

**📋 HEALTH RECOMMENDATIONS:**
${report.recommendations.map((rec, index) => `${index + 1}. ${rec}`).join("\n")}

**🏃‍♂️ FITNESS & LIFESTYLE PLAN:**
${report.fitnessPlans.map((plan, index) => `${index + 1}. ${plan}`).join("\n")}

**⚠️ IMPORTANT DISCLAIMER:**
This is an AI-generated assessment for informational purposes only. Please consult with a qualified healthcare professional for proper medical diagnosis and treatment. If you experience severe symptoms or emergency conditions, seek immediate medical attention.

**📞 EMERGENCY CONTACTS:**
- Emergency Services: 911
- Poison Control: 1-800-222-1222
- Mental Health Crisis: 988

Thank you for using our AI consultation service. Take care of your health! 🌟`

        const aiMessage: Message = {
          id: messages.length + 2,
          type: "ai",
          content: reportMessage,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, aiMessage])
        setIsTyping(false)
        setCurrentStep(4) // Set to final step
        return
      }

      const nextQuestionIndex = questionCount + 1
      const aiResponse =
        consultationQuestions[nextQuestionIndex] || "Thank you for all the information. Analyzing your responses..."

      const aiMessage: Message = {
        id: messages.length + 2,
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
      setQuestionCount((prev) => prev + 1)

      if (currentStep < consultationSteps.length - 1) {
        setCurrentStep((prev) => prev + 1)
      }
    }, 2000)
  }

  const handleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true)
      toast({
        title: "Voice Input Active",
        description: "Speak now... (This is a demo - voice recognition would be implemented here)",
      })

      // Simulate voice input
      setTimeout(() => {
        setIsListening(false)
        setInputMessage("I've been having headaches and feeling tired for the past few days.")
        toast({
          title: "Voice Input Complete",
          description: "Your message has been transcribed.",
        })
      }, 3000)
    } else {
      setIsListening(false)
    }
  }

  const handleTextToSpeech = (text: string) => {
    if (isSpeaking) {
      setIsSpeaking(false)
      window.speechSynthesis.cancel()
    } else {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.onend = () => setIsSpeaking(false)
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleExampleClick = (example: string) => {
    setInputMessage(example)
    setShowExamples(false)
  }

  const progressPercentage = ((currentStep + 1) / consultationSteps.length) * 100

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
                <h1 className="text-xl font-bold text-foreground">AI Consultation</h1>
              </div>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Question {questionCount + 1} of 5
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{Math.round(((questionCount + 1) / 5) * 100)}% Complete</span>
            </div>
            <Progress value={((questionCount + 1) / 5) * 100} className="h-2" />
            <div className="flex justify-between mt-2">
              {consultationSteps.map((step, index) => (
                <div
                  key={index}
                  className={`text-xs ${index <= currentStep ? "text-primary font-medium" : "text-muted-foreground"}`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* AI Doctor Avatar */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-4 relative">
                  <img
                    src="/professional-women-doctor-avatar.jpg"
                    alt="Dr. AI Avatar"
                    className="w-28 h-28 rounded-full object-cover"
                  />
                  {isTyping && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Loader2 className="h-4 w-4 text-primary-foreground animate-spin" />
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-2">Dr. AI</h3>
                <p className="text-sm text-muted-foreground mb-4">Your Virtual Healthcare Assistant</p>
                <div className="space-y-2 w-full">
                  <div className="text-xs text-muted-foreground">
                    Current Status: {isTyping ? "Analyzing..." : isSpeaking ? "Speaking..." : "Listening"}
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Online & Speaking
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              <CardContent className="flex-1 p-0 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {showExamples && questionCount === 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <h4 className="text-sm font-medium text-blue-900 mb-3">Example symptoms you can describe:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {exampleSymptoms.map((example, index) => (
                          <button
                            key={index}
                            onClick={() => handleExampleClick(example)}
                            className="text-left text-sm text-blue-700 hover:text-blue-900 hover:bg-blue-100 p-2 rounded transition-colors"
                          >
                            {index + 1}. {example}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-blue-600 mt-2">Click on any example or describe your own symptoms</p>
                    </div>
                  )}

                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.type === "ai" && (
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-4 rounded-lg ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground ml-auto"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                          {message.type === "ai" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 opacity-70 hover:opacity-100"
                              onClick={() => handleTextToSpeech(message.content)}
                            >
                              {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                            </Button>
                          )}
                        </div>
                      </div>
                      {message.type === "user" && (
                        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-secondary-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="bg-muted text-muted-foreground p-4 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-current rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-current rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Input
                        value={inputMessage}
                        onChange={handleInputChange}
                        placeholder="Describe your symptoms..."
                        className="pr-12"
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        disabled={isTyping}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`absolute right-1 top-1 h-8 w-8 p-0 ${
                          isListening ? "text-red-500" : "text-muted-foreground"
                        }`}
                        onClick={handleVoiceInput}
                        disabled={isTyping}
                      >
                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping} className="px-6">
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span>Press Enter to send</span>
                      <span>AI speaks automatically</span>
                      <span>Type to stop voice</span>
                    </div>
                    <div className="text-primary font-medium">
                      {questionCount < 4 ? `${4 - questionCount} questions remaining` : "Final question"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
