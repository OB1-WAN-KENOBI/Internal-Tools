import { useQuery } from '@tanstack/react-query'
import { api } from '@/shared/api/endpoints'

export function useDataTable() {
  const query = useQuery({
    queryKey: ['dataTableRows'],
    queryFn: api.getDataTableRows,
  })

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  }
}
