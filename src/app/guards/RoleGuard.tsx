import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store'
import type { Role } from '@/shared/types'

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: Role[]
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const user = useAuthStore((state) => state.user)

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/403" replace />
  }

  return <>{children}</>
}
