import { API_BASE_URL } from '@/shared/config'
import type { User, AuditEvent, FeatureFlag, DataTableRow } from '@/shared/types'

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Mock data for production
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@company.com',
    role: 'admin',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Manager User',
    email: 'manager@company.com',
    role: 'manager',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Viewer User',
    email: 'viewer@company.com',
    role: 'viewer',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
]

const mockAuditLogs: AuditEvent[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Admin User',
    action: 'login',
    resource: 'auth',
    timestamp: new Date().toISOString(),
    details: 'User logged in',
  },
]

const mockFeatureFlags: FeatureFlag[] = [
  { id: '1', name: 'New Dashboard', description: 'Enable new dashboard design', enabled: true },
  { id: '2', name: 'Dark Mode', description: 'Enable dark mode theme', enabled: false },
  { id: '3', name: 'Beta Features', description: 'Show beta features', enabled: true },
]

const mockDataTableRows: DataTableRow[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    department: 'Engineering',
    position: 'Senior Developer',
    salary: 120000,
    joinDate: '2020-01-15',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    department: 'Marketing',
    position: 'Marketing Manager',
    salary: 95000,
    joinDate: '2019-03-20',
    status: 'Active',
  },
]

function getMockData<T>(endpoint: string, method: string = 'GET'): T | null {
  if (!API_BASE_URL) {
    // Production mode - return mock data
    if (endpoint === '/users') {
      return mockUsers as T
    }
    if (endpoint.startsWith('/users/')) {
      const id = endpoint.split('/')[2]
      return mockUsers.find(u => u.id === id) as T
    }
    if (endpoint === '/auditLogs') {
      return mockAuditLogs as T
    }
    if (endpoint === '/featureFlags') {
      return mockFeatureFlags as T
    }
    if (endpoint.startsWith('/featureFlags/')) {
      const id = endpoint.split('/')[2]
      const flag = mockFeatureFlags.find(f => f.id === id)
      if (flag && method === 'PATCH') {
        // Simulate update
        return { ...flag, enabled: !flag.enabled } as T
      }
      return flag as T
    }
    if (endpoint === '/dataTableRows') {
      return mockDataTableRows as T
    }
    if (method === 'POST' || method === 'PATCH') {
      // For mutations, return the created/updated object
      return {} as T
    }
    if (method === 'DELETE') {
      return undefined as unknown as T
    }
  }
  return null
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  // In production, return mock data
  const mockData = getMockData<T>(endpoint, options?.method || 'GET')
  if (mockData !== null) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockData
  }

  if (!API_BASE_URL) {
    // Fallback: return empty array for list endpoints
    if (endpoint.includes('/users') || endpoint.includes('/auditLogs') || 
        endpoint.includes('/featureFlags') || endpoint.includes('/dataTableRows')) {
      return [] as T
    }
    return {} as T
  }

  const url = `${API_BASE_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      throw new ApiError(response.status, response.statusText)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new Error('Network error')
  }
}
