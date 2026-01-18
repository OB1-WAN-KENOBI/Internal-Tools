import { useState, useEffect, useRef } from 'react'
import type { DashboardMetrics } from '@/shared/types'

export function useRealtimeMetrics() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<DashboardMetrics[]>([])
  const eventSourceRef = useRef<EventSource | null>(null)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    
    // Prevent double connection in StrictMode
    if (eventSourceRef.current) {
      console.log('⚠️ EventSource already exists, skipping')
      return
    }

    console.log('🔌 Connecting to SSE endpoint...')
    
    try {
      const eventSource = new EventSource('http://localhost:3001/metrics/stream')
      eventSourceRef.current = eventSource

      eventSource.onopen = () => {
        if (!isMountedRef.current) return
        console.log('✅ SSE connection opened')
        setIsLoading(false)
        setError(null)
      }

      eventSource.onmessage = (event) => {
        if (!isMountedRef.current) return
        console.log('📊 Received metrics:', event.data)
        try {
          const data: DashboardMetrics = JSON.parse(event.data)
          setMetrics(data)
          setHistory((prev) => [...prev.slice(-29), data])
        } catch (e) {
          console.error('Failed to parse metrics:', e)
        }
      }

      eventSource.onerror = (err) => {
        if (!isMountedRef.current) return
        console.error('❌ SSE error:', err)
        setError('Failed to connect to metrics stream')
        setIsLoading(false)
      }
    } catch (err) {
      console.error('❌ Failed to initialize SSE:', err)
      setError('Failed to initialize metrics stream')
      setIsLoading(false)
    }

    return () => {
      isMountedRef.current = false
      if (eventSourceRef.current) {
        console.log('🔌 Closing SSE connection')
        eventSourceRef.current.close()
        eventSourceRef.current = null
      }
    }
  }, [])

  return { metrics, history, isLoading, error }
}
