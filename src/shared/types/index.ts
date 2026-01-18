export type Role = 'admin' | 'manager' | 'viewer'

export type UserStatus = 'active' | 'disabled'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  status: UserStatus
  createdAt: string
}

export interface AuditEvent {
  id: string
  userId: string
  userName: string
  action: 'create' | 'update' | 'delete' | 'login' | 'logout'
  resource: string
  timestamp: string
  details?: string
}

export interface FeatureFlag {
  id: string
  name: string
  description: string
  enabled: boolean
}

export interface DashboardMetrics {
  activeUsers: number
  eventsPerMinute: number
  errorRate: number
  revenue: number
}

export interface DataTableRow {
  id: string
  name: string
  email: string
  department: string
  position: string
  salary: number
  joinDate: string
  status: string
  [key: string]: string | number
}
