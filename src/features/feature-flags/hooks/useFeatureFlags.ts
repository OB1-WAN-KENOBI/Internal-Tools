import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/shared/api/endpoints'
import { useFeatureFlagsStore } from '../store'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export function useFeatureFlags() {
  const queryClient = useQueryClient()
  const setFlags = useFeatureFlagsStore((state) => state.setFlags)

  const query = useQuery({
    queryKey: ['featureFlags'],
    queryFn: api.getFeatureFlags,
  })

  useEffect(() => {
    if (query.data) {
      setFlags(query.data)
    }
  }, [query.data, setFlags])

  const toggleMutation = useMutation({
    mutationFn: ({ id, enabled }: { id: string; enabled: boolean }) =>
      api.updateFeatureFlag(id, enabled),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['featureFlags'] })
      toast.success('Feature flag updated')
    },
    onError: () => {
      toast.error('Failed to update feature flag')
    },
  })

  return {
    flags: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    toggleFlag: toggleMutation.mutate,
  }
}
