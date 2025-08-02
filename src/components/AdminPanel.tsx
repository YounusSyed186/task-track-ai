import { useState, useEffect } from "react"
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/StatusBadge"
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs"
import { Shield, Users, Wrench, AlertTriangle, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"

interface User {
  id: string
  name: string
  email: string
  phone: string
  created_at: string
}

interface Technician {
  id: string
  name: string
  status: "available" | "busy"
  specialty: string
}

interface Issue {
  id: string
  description: string
  status: "pending" | "assigned" | "in_progress" | "resolved"
  category: string
  user_email: string
  assigned_technician?: string
  created_at: string
  image_url?: string
}

interface SystemStats {
  totalUsers: number
  totalTechnicians: number
  totalIssues: number
  availableTechnicians: number
}

export function AdminPanel() {
  const [users, setUsers] = useState<User[]>([])
  const [technicians, setTechnicians] = useState<Technician[]>([])
  const [issues, setIssues] = useState<Issue[]>([])
  const [stats, setStats] = useState<SystemStats>({
    totalUsers: 0,
    totalTechnicians: 0,
    totalIssues: 0,
    availableTechnicians: 0
  })
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      const [usersRes, techsRes, issuesRes] = await Promise.all([
        axios.get("http://localhost:8000/api/users/list"),
        axios.get("http://localhost:8000/api/technicians/list"),
        axios.get("http://localhost:8000/api/issues/list")
      ])

      const usersData = Array.isArray(usersRes.data) ? usersRes.data : []
      const techsData = Array.isArray(techsRes.data) ? techsRes.data : []
      const issuesData = Array.isArray(issuesRes.data) ? issuesRes.data : []

      setUsers(usersData)
      setTechnicians(techsData)
      setIssues(issuesData)

      setStats({
        totalUsers: usersData.length,
        totalTechnicians: techsData.length,
        totalIssues: issuesData.length,
        availableTechnicians: techsData.filter((t) => t.status === "available").length
      })

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch admin data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Clock className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Technicians</p>
                <p className="text-2xl font-bold">{stats.totalTechnicians}</p>
              </div>
              <Wrench className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Issues</p>
                <p className="text-2xl font-bold">{stats.totalIssues}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-status-resolved">{stats.availableTechnicians}</p>
              </div>
              <Shield className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="issues" className="space-y-4">
        <TabsList>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="technicians">Technicians</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="issues">
          <Card>
            <CardHeader>
              <CardTitle>All Issues</CardTitle>
              <CardDescription>Complete overview of maintenance requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issues.map((issue) => (
                  <Card key={issue.id} className="border">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Issue #{issue.id}</span>
                            <StatusBadge status={issue.status} />
                            <Badge variant="outline">{issue.category}</Badge>
                          </div>
                          <p className="text-sm">{issue.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Reporter: {issue.user_email}</span>
                            {issue.assigned_technician && (
                              <span>Assigned: {issue.assigned_technician}</span>
                            )}
                            <span>{new Date(issue.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        {issue.image_url && (
                          <img
                            src={issue.image_url}
                            alt="Issue"
                            className="w-16 h-16 object-cover rounded border"
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technicians">
          <Card>
            <CardHeader>
              <CardTitle>Technicians</CardTitle>
              <CardDescription>Manage technical staff and availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {technicians.map((tech) => (
                  <Card key={tech.id}>
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{tech.name}</h4>
                          <StatusBadge status={tech.status === "available" ? "resolved" : "progress"} />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Specialty: {tech.specialty}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>System users and contact information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <Card key={user.id} className="border">
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="text-sm">{user.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Joined</p>
                          <p className="text-sm">{new Date(user.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
