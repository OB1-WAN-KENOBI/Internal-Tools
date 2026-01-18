import { create } from 'zustand'
import type { FeatureFlag } from '@/shared/types'

interface FeatureFlagsState {
  flags: Record<string, boolean>
  setFlags: (flags: FeatureFlag[]) => void
  toggleFlag: (name: string) => void
  isEnabled: (name: string) => boolean
}

export const useFeatureFlagsStore = create<FeatureFlagsState>((set, get) => ({
  flags: {},
  
  setFlags: (flags: FeatureFlag[]) => {
    const flagsMap = flags.reduce((acc, flag) => {
      acc[flag.name] = flag.enabled
      return acc
    }, {} as Record<string, boolean>)
    set({ flags: flagsMap })
  },

  toggleFlag: (name: string) => {
    set((state) => ({
      flags: {
        ...state.flags,
        [name]: !state.flags[name],
      },
    }))
  },

  isEnabled: (name: string) => {
    return get().flags[name] ?? false
  },
}))

export function useFeatureFlag(flagName: string): boolean {
  return useFeatureFlagsStore((state) => state.isEnabled(flagName))
}
