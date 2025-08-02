import { useState, useEffect } from "react"
import { AuthWrapper } from "@/components/AuthWrapper"
import { DashboardHeader } from "@/components/DashboardHeader"
import { Sidebar } from "@/components/Sidebar"
import { UserPortal } from "@/components/UserPortal"
import { TechnicianDashboard } from "@/components/TechnicianDashboard"
import { AdminPanel } from "@/components/AdminPanel"

type Role = "user" | "technician" | "admin"

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentRole, setCurrentRole] = useState<Role | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('currentUser')
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          if (userData.role) {
            setCurrentRole(userData.role)
            setIsAuthenticated(true)
          }
        }
      } catch (error) {
        localStorage.removeItem('currentUser')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleAuthSuccess = (role: Role) => {
    setCurrentRole(role)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentRole(null)
  }

  const handleRoleChange = (role: Role) => {
    setCurrentRole(role)
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Show authentication forms if not authenticated
  if (!isAuthenticated || !currentRole) {
    return <AuthWrapper onAuthSuccess={handleAuthSuccess} />
  }

  const renderContent = () => {
    switch (currentRole) {
      case "user":
        return <UserPortal />
      case "technician":
        return <TechnicianDashboard />
      case "admin":
        return <AdminPanel />
      default:
        return <UserPortal />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar currentRole={currentRole} onRoleChange={handleRoleChange} />
        
        <main className="flex-1 md:ml-0 p-6">
          <div className="max-w-6xl mx-auto">
            <DashboardHeader onLogout={handleLogout} />
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
