import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Upload, User, Phone, Mail, MessageCircle, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"

interface UserData {
  name: string
  email: string
  phone: string
}

interface IssueData {
  description: string
  image: File | null
}

export function UserPortal() {
  const [userData, setUserData] = useState<UserData>({ name: "", email: "", phone: "" })
  const [issueData, setIssueData] = useState<IssueData>({ description: "", image: null })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<any>(null)
  const { toast } = useToast()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIssueData(prev => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    if (!userData.name || !userData.email || !userData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all user details",
        variant: "destructive"
      })
      return false
    }

    if (!issueData.description) {
      toast({
        title: "Missing Description",
        description: "Please describe the issue",
        variant: "destructive"
      })
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      })
      return false
    }

    return true
  }

  const submitIssue = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Create user first
      await axios.post("http://localhost:8000/api/users/new", userData)

      // Create issue with image
      const formData = new FormData()
      formData.append("description", issueData.description)
      formData.append("user_email", userData.email)
      if (issueData.image) {
        formData.append("image", issueData.image)
      }

      const response = await axios.post("http://localhost:8000/api/issues/new", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      setSubmissionResult(response.data)
      toast({
        title: "Issue Submitted",
        description: "Your issue has been reported successfully",
      })

      // Reset form
      setUserData({ name: "", email: "", phone: "" })
      setIssueData({ description: "", image: null })
      setImagePreview(null)
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Failed to submit issue. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submissionResult) {
    return (
      <div className="space-y-6">
        <Card className="border-status-resolved">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-status-resolved">
              <CheckCircle className="h-5 w-5" />
              Issue Submitted Successfully
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Issue ID:</strong> {submissionResult.issue_id}</p>
              <p><strong>Category:</strong> {submissionResult.category}</p>
              {submissionResult.assigned_technician && (
                <p><strong>Assigned Technician:</strong> {submissionResult.assigned_technician}</p>
              )}
              <p className="text-muted-foreground">
                You will be notified when a technician is assigned to your issue.
              </p>
            </div>
            <Button 
              onClick={() => setSubmissionResult(null)} 
              className="mt-4"
            >
              Submit Another Issue
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* User Registration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Information
          </CardTitle>
          <CardDescription>
            Please provide your contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={userData.name}
                onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={userData.phone}
                onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter your phone number"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={userData.email}
              onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter your email address"
            />
          </div>
        </CardContent>
      </Card>

      {/* Issue Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Report Issue
          </CardTitle>
          <CardDescription>
            Describe the maintenance issue and upload an image if available
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Issue Description</Label>
            <Textarea
              id="description"
              value={issueData.description}
              onChange={(e) => setIssueData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Please describe the issue in detail..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Upload Image (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="image" className="cursor-pointer">
                {imagePreview ? (
                  <div className="space-y-2">
                    <img
                      src={imagePreview}
                      alt="Issue preview"
                      className="max-w-full max-h-48 mx-auto rounded-lg"
                    />
                    <p className="text-sm text-muted-foreground">Click to change image</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">Click to upload an image</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <Button 
            onClick={submitIssue} 
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : "Submit Issue"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}