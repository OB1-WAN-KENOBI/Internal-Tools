import { useState, useEffect, useRef } from 'react'
import type { DashboardMetrics } from '@/shared/types'
import { API_BASE_URL } from '@/shared/config'

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

    // In production, use mock data instead of SSE
    if (!API_BASE_URL) {
      setIsLoading(false)
      // Generate mock metrics
      const generateMockMetrics = (): DashboardMetrics => ({
        activeUsers: Math.floor(Math.random() * 500) + 100,
        eventsPerMinute: Math.floor(Math.random() * 200) + 50,
        errorRate: Math.random() * 10,
        revenue: Math.floor(Math.random() * 5000) + 1000,
      })
      
      setMetrics(generateMockMetrics())
      setHistory([generateMockMetrics()])
      
      // Update metrics every 5 seconds
      const interval = setInterval(() => {
        if (isMountedRef.current) {
          const newMetrics = generateMockMetrics()
          setMetrics(newMetrics)
          setHistory((prev) => [...prev.slice(-29), newMetrics])
        }
      }, 5000)
      
      return () => {
        isMountedRef.current = false
        clearInterval(interval)
      }
    }

    console.log('🔌 Connecting to SSE endpoint...')
    
    try {
      const eventSource = new EventSource(`${API_BASE_URL}/metrics/stream`)
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
