import { apiClient } from './client'
import type {
  User,
  AuditEvent,
  FeatureFlag,
  DataTableRow,
} from '@/shared/types'

export const api = {
  // Users
  getUsers: () => apiClient<User[]>('/users'),
  getUser: (id: string) => apiClient<User>(`/users/${id}`),
  createUser: (user: Omit<User, 'id' | 'createdAt'>) =>
    apiClient<User>('/users', {
      method: 'POST',
      body: JSON.stringify({
        ...user,
        createdAt: new Date().toISOString(),
      }),
    }),
  updateUser: (id: string, user: Partial<User>) =>
    apiClient<User>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(user),
    }),
  deleteUser: (id: string) =>
    apiClient<void>(`/users/${id}`, {
      method: 'DELETE',
    }),

  // Audit Logs
  getAuditLogs: () => apiClient<AuditEvent[]>('/auditLogs'),
  createAuditLog: (log: Omit<AuditEvent, 'id'>) =>
    apiClient<AuditEvent>('/auditLogs', {
      method: 'POST',
      body: JSON.stringify(log),
    }),

  // Feature Flags
  getFeatureFlags: () => apiClient<FeatureFlag[]>('/featureFlags'),
  updateFeatureFlag: (id: string, enabled: boolean) =>
    apiClient<FeatureFlag>(`/featureFlags/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ enabled }),
    }),

  // Data Table
  getDataTableRows: () => apiClient<DataTableRow[]>('/dataTableRows'),
}
