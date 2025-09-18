"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  ArrowLeft,
  User,
  Edit,
  Save,
  X,
  Camera,
  Shield,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Activity,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UserProfile {
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  bloodGroup: string
  height: string
  weight: string
  address: string
  emergencyContact: string
  emergencyPhone: string
  allergies: string
  medications: string
  medicalHistory: string
  profileImage: string
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    name: "Dr. John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    gender: "male",
    bloodGroup: "O+",
    height: "5'10\"",
    weight: "175 lbs",
    address: "123 Healthcare Ave, Medical District, NY 10001",
    emergencyContact: "Jane Doe (Spouse)",
    emergencyPhone: "+1 (555) 987-6543",
    allergies: "Penicillin, Shellfish, Pollen",
    medications: "Multivitamin (daily), Omega-3 (daily)",
    medicalHistory: "Mild hypertension (controlled), Previous appendectomy (2018), No chronic conditions",
    profileImage: "/professional-headshot.png",
  })
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile)
  const { toast } = useToast()

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    })
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const handleImageUpload = () => {
    // Simulate image upload
    toast({
      title: "Image Upload",
      description: "Profile image upload functionality would be implemented here.",
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
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
                <h1 className="text-xl font-bold text-foreground">My Profile</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profile.profileImage || "/placeholder.svg"} alt={profile.name} />
                    <AvatarFallback className="text-lg">{getInitials(profile.name)}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                      onClick={handleImageUpload}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">{profile.name}</h2>
                <p className="text-muted-foreground mb-4">{profile.email}</p>
                <div className="space-y-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Activity className="h-3 w-3 mr-1" />
                    Active Patient
                  </Badge>
                  <div className="text-sm text-muted-foreground">Member since {new Date().getFullYear() - 1}</div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Health Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Blood Group</span>
                  <Badge variant="outline">{profile.bloodGroup}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Height</span>
                  <span className="text-sm font-medium">{profile.height}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Weight</span>
                  <span className="text-sm font-medium">{profile.weight}</span>
                </div>
                <Separator />
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-xs text-muted-foreground">Total Consultations</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Basic information about yourself</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                      />
                    ) : (
                      <div className="p-2 bg-muted rounded text-sm">{profile.name}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                      />
                    ) : (
                      <div className="p-2 bg-muted rounded text-sm flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {profile.email}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                      />
                    ) : (
                      <div className="p-2 bg-muted rounded text-sm flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {profile.phone}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    {isEditing ? (
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={editedProfile.dateOfBirth}
                        onChange={(e) => setEditedProfile({ ...editedProfile, dateOfBirth: e.target.value })}
                      />
                    ) : (
                      <div className="p-2 bg-muted rounded text-sm flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(profile.dateOfBirth).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    {isEditing ? (
                      <Select
                        value={editedProfile.gender}
                        onValueChange={(value) => setEditedProfile({ ...editedProfile, gender: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-2 bg-muted rounded text-sm capitalize">{profile.gender}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    {isEditing ? (
                      <Select
                        value={editedProfile.bloodGroup}
                        onValueChange={(value) => setEditedProfile({ ...editedProfile, bloodGroup: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-2 bg-muted rounded text-sm">{profile.bloodGroup}</div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  {isEditing ? (
                    <Textarea
                      id="address"
                      value={editedProfile.address}
                      onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
                      rows={2}
                    />
                  ) : (
                    <div className="p-2 bg-muted rounded text-sm flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5" />
                      {profile.address}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Physical Information */}
            <Card>
              <CardHeader>
                <CardTitle>Physical Information</CardTitle>
                <CardDescription>Your physical measurements and characteristics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height</Label>
                    {isEditing ? (
                      (
                        <Input
                        id="height"
                        value={editedProfile.height}
                        onChange={(e) => setEditedProfile({ ...editedProfile, height: e.target.value })}
                        placeholder="e.g., 5'10\" or 178 cm"
                      />
                      )
                    ) : (
                      <div className="p-2 bg-muted rounded text-sm">{profile.height}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight</Label>
                    {isEditing ? (
                      <Input
                        id="weight"
                        value={editedProfile.weight}
                        onChange={(e) => setEditedProfile({ ...editedProfile, weight: e.target.value })}
                        placeholder="e.g., 175 lbs or 79 kg"
                      />
                    ) : (
                      <div className="p-2 bg-muted rounded text-sm">{profile.weight}</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Emergency Contact
                </CardTitle>
                <CardDescription>Person to contact in case of emergency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Contact Name</Label>
                    {isEditing ? (
                      <Input
                        id="emergencyContact"
                        value={editedProfile.emergencyContact}
                        onChange={(e) => setEditedProfile({ ...editedProfile, emergencyContact: e.target.value })}
                      />
                    ) : (
                      <div className="p-2 bg-muted rounded text-sm">{profile.emergencyContact}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Contact Phone</Label>
                    {isEditing ? (
                      <Input
                        id="emergencyPhone"
                        value={editedProfile.emergencyPhone}
                        onChange={(e) => setEditedProfile({ ...editedProfile, emergencyPhone: e.target.value })}
                      />
                    ) : (
                      <div className="p-2 bg-muted rounded text-sm">{profile.emergencyPhone}</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medical Information */}
            <Card>
              <CardHeader>
                <CardTitle>Medical Information</CardTitle>
                <CardDescription>Important medical details for consultations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  {isEditing ? (
                    <Textarea
                      id="allergies"
                      value={editedProfile.allergies}
                      onChange={(e) => setEditedProfile({ ...editedProfile, allergies: e.target.value })}
                      placeholder="List any known allergies..."
                      rows={2}
                    />
                  ) : (
                    <div className="p-2 bg-muted rounded text-sm">{profile.allergies || "None reported"}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medications">Current Medications</Label>
                  {isEditing ? (
                    <Textarea
                      id="medications"
                      value={editedProfile.medications}
                      onChange={(e) => setEditedProfile({ ...editedProfile, medications: e.target.value })}
                      placeholder="List current medications and dosages..."
                      rows={2}
                    />
                  ) : (
                    <div className="p-2 bg-muted rounded text-sm">{profile.medications || "None reported"}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medicalHistory">Medical History</Label>
                  {isEditing ? (
                    <Textarea
                      id="medicalHistory"
                      value={editedProfile.medicalHistory}
                      onChange={(e) => setEditedProfile({ ...editedProfile, medicalHistory: e.target.value })}
                      placeholder="Describe any significant medical history..."
                      rows={3}
                    />
                  ) : (
                    <div className="p-2 bg-muted rounded text-sm">{profile.medicalHistory}</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
