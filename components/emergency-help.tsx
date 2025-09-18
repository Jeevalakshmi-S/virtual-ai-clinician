"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Phone, MapPin, Clock } from "lucide-react"

const emergencyContacts = [
  { name: "Emergency Services", number: "911", type: "emergency" },
  { name: "Poison Control", number: "1-800-222-1222", type: "poison" },
  { name: "Mental Health Crisis", number: "988", type: "mental" },
]

const nearbyHospitals = [
  { name: "City General Hospital", distance: "0.8 miles", time: "3 min" },
  { name: "St. Mary's Medical Center", distance: "1.2 miles", time: "5 min" },
  { name: "Regional Emergency Clinic", distance: "2.1 miles", time: "8 min" },
]

export function EmergencyHelp() {
  const handleEmergencyCall = (number: string) => {
    window.open(`tel:${number}`, "_self")
  }

  return (
    <Card className="border-destructive/20 bg-destructive/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          Emergency Help
        </CardTitle>
        <CardDescription>Quick access to emergency services and nearby hospitals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Emergency Call Button */}
        <Button
          className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          size="lg"
          onClick={() => handleEmergencyCall("911")}
        >
          <Phone className="h-5 w-5 mr-2" />
          Call 911 - Emergency
        </Button>

        {/* Other Emergency Contacts */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Other Emergency Contacts</h4>
          {emergencyContacts.slice(1).map((contact, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="w-full justify-start bg-transparent"
              onClick={() => handleEmergencyCall(contact.number)}
            >
              <Phone className="h-4 w-4 mr-2" />
              {contact.name} - {contact.number}
            </Button>
          ))}
        </div>

        {/* Nearby Hospitals */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Nearby Hospitals
          </h4>
          {nearbyHospitals.map((hospital, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-background rounded border text-sm">
              <div>
                <div className="font-medium">{hospital.name}</div>
                <div className="text-muted-foreground text-xs">{hospital.distance}</div>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-xs">
                <Clock className="h-3 w-3" />
                {hospital.time}
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Instructions */}
        <div className="text-xs text-muted-foreground p-3 bg-background rounded border">
          <strong>When to call 911:</strong> Chest pain, difficulty breathing, severe bleeding, loss of consciousness,
          severe allergic reactions, or any life-threatening emergency.
        </div>
      </CardContent>
    </Card>
  )
}
