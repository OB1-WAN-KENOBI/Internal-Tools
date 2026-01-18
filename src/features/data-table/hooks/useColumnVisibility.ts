import { useState, useEffect } from 'react'
import type { VisibilityState } from '@tanstack/react-table'

const STORAGE_KEY = 'dataTable_columnVisibility'

export function useColumnVisibility() {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columnVisibility))
  }, [columnVisibility])

  return { columnVisibility, setColumnVisibility }
}
