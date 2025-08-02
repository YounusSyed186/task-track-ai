import { useState } from "react"
import { Sidebar } from "@/components/Sidebar"
import { UserPortal } from "@/components/UserPortal"
import { TechnicianDashboard } from "@/components/TechnicianDashboard"
import { AdminPanel } from "@/components/AdminPanel"

type Role = "user" | "technician" | "admin"

const Index = () => {
  const [currentRole, setCurrentRole] = useState<Role>("user")

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
        <Sidebar currentRole={currentRole} onRoleChange={setCurrentRole} />
        
        <main className="flex-1 md:ml-0 p-6">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
