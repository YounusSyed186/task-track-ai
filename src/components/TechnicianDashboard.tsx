import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/StatusBadge"
import { Wrench, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"

interface Issue {
  id: string
  description: string
  status: "pending" | "assigned" | "in_progress" | "resolved"
  category: string
  user_email: string
  created_at: string
  image_url?: string
}

interface TechnicianStatus {
  id: string
  name: string
  status: "available" | "busy"
}

export function TechnicianDashboard() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [technicianStatus, setTechnicianStatus] = useState<TechnicianStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [updatingIssue, setUpdatingIssue] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [issuesResponse, techniciansResponse] = await Promise.all([
        axios.get("http://localhost:8000/api/issues/list"),
        axios.get("http://localhost:8000/api/technicians/list")
      ])

      // Filter issues assigned to current technician (for demo, we'll use the first technician)
      const currentTechnician = techniciansResponse.data[0]
      if (currentTechnician) {
        setTechnicianStatus(currentTechnician)
        // Filter issues assigned to this technician
        const assignedIssues = issuesResponse.data.filter((issue: any) => 
          issue.assigned_technician === currentTechnician.name
        )
        setIssues(assignedIssues)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const updateIssueStatus = async (issueId: string, newStatus: "in_progress" | "resolved") => {
    setUpdatingIssue(issueId)
    try {
      await axios.patch(`http://localhost:8000/api/technicians/update/${issueId}`, {
        status: newStatus
      })

      setIssues(prev => prev.map(issue => 
        issue.id === issueId ? { ...issue, status: newStatus } : issue
      ))

      toast({
        title: "Status Updated",
        description: `Issue marked as ${newStatus.replace('_', ' ')}`,
      })
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update issue status",
        variant: "destructive"
      })
    } finally {
      setUpdatingIssue(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Clock className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Technician Status */}
      {technicianStatus && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Technician Dashboard
            </CardTitle>
            <CardDescription>
              Welcome back, {technicianStatus.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Status:</span>
              <StatusBadge 
                status={technicianStatus.status === "available" ? "resolved" : "progress"} 
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assigned Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Assigned Issues ({issues.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {issues.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No issues assigned</p>
            </div>
          ) : (
            <div className="space-y-4">
              {issues.map((issue) => (
                <Card key={issue.id} className="border">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Issue #{issue.id}</span>
                          <StatusBadge status={issue.status} />
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          <strong>Category:</strong> {issue.category}
                        </p>
                        
                        <p className="text-sm">
                          {issue.description}
                        </p>
                        
                        <p className="text-xs text-muted-foreground">
                          Reported by: {issue.user_email} • {new Date(issue.created_at).toLocaleDateString()}
                        </p>

                        {issue.image_url && (
                          <div className="mt-2">
                            <img
                              src={issue.image_url}
                              alt="Issue"
                              className="max-w-xs rounded-lg border"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        {issue.status === "assigned" && (
                          <Button
                            size="sm"
                            onClick={() => updateIssueStatus(issue.id, "in_progress")}
                            disabled={updatingIssue === issue.id}
                          >
                            Start Work
                          </Button>
                        )}
                        
                        {issue.status === "in_progress" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateIssueStatus(issue.id, "resolved")}
                            disabled={updatingIssue === issue.id}
                          >
                            Mark Resolved
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}