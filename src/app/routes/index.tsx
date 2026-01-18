import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { initAuth } from '@/features/auth/store'
import { LoginPage } from '@/features/auth/LoginPage'
import { AccessDenied } from '@/features/auth/AccessDenied'
import { ProtectedRoute } from '@/app/guards/ProtectedRoute'
import { RoleGuard } from '@/app/guards/RoleGuard'
import { AppLayout } from '@/app/layout/AppLayout'
import { DashboardPage } from '@/features/dashboard/DashboardPage'
import { UsersPage } from '@/features/users/UsersPage'
import { DataTablePage } from '@/features/data-table/DataTablePage'
import { FeatureFlagsPage } from '@/features/feature-flags/FeatureFlagsPage'
import { AuditLogPage } from '@/features/audit-log/AuditLogPage'
import { SettingsPage } from '@/features/settings/SettingsPage'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary'

export function AppRoutes() {
  useEffect(() => {
    initAuth()
  }, [])

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/403" element={<AccessDenied />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route
            path="users"
            element={
              <RoleGuard allowedRoles={['admin']}>
                <UsersPage />
              </RoleGuard>
            }
          />
          <Route
            path="data-table"
            element={
              <RoleGuard allowedRoles={['admin', 'manager']}>
                <DataTablePage />
              </RoleGuard>
            }
          />
          <Route
            path="feature-flags"
            element={
              <RoleGuard allowedRoles={['admin']}>
                <FeatureFlagsPage />
              </RoleGuard>
            }
          />
          <Route
            path="audit-log"
            element={
              <RoleGuard allowedRoles={['admin', 'manager']}>
                <AuditLogPage />
              </RoleGuard>
            }
          />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}
