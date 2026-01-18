import { useQuery } from '@tanstack/react-query'
import { api } from '@/shared/api/endpoints'

export function useAuditLog() {
  const query = useQuery({
    queryKey: ['auditLogs'],
    queryFn: api.getAuditLogs,
  })

  return {
    logs: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  }
}
