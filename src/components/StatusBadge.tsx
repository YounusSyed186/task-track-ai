import { cn } from "@/lib/utils"

type Status = "pending" | "assigned" | "in_progress" | "resolved" | "available" | "busy" | "progress"

interface StatusBadgeProps {
  status: Status
  className?: string
}

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-status-pending text-white"
  },
  assigned: {
    label: "Assigned", 
    className: "bg-status-assigned text-white"
  },
  in_progress: {
    label: "In Progress",
    className: "bg-status-progress text-white"
  },
  resolved: {
    label: "Resolved",
    className: "bg-status-resolved text-white"
  },
  available: {
    label: "Available",
    className: "bg-status-resolved text-white"
  },
  busy: {
    label: "Busy",
    className: "bg-status-progress text-white"
  },
  progress: {
    label: "In Progress",
    className: "bg-status-progress text-white"
  }
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}