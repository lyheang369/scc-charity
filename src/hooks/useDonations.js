import { useCallback, useEffect, useRef, useState } from 'react'
import { DONATION_POLL_MS, donationFingerprint, fetchDonationPayload, normalizeDonationPayload } from '../lib/donations'

export function useDonations({ poll = true } = {}) {
  const [payload, setPayload] = useState(() => normalizeDonationPayload())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const fingerprintRef = useRef('')
  const timerRef = useRef(null)
  const controllerRef = useRef(null)
  const mountedRef = useRef(false)

  const load = useCallback(async () => {
    if (controllerRef.current) controllerRef.current.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    try {
      const nextPayload = await fetchDonationPayload(controller.signal)
      const nextFingerprint = donationFingerprint(nextPayload)

      if (!mountedRef.current || controller.signal.aborted) return

      if (nextFingerprint !== fingerprintRef.current) {
        fingerprintRef.current = nextFingerprint
        setPayload(nextPayload)
      }

      setError(null)
    } catch (nextError) {
      if (mountedRef.current && nextError.name !== 'AbortError') setError(nextError)
    } finally {
      if (mountedRef.current && !controller.signal.aborted) setLoading(false)
    }
  }, [])

  useEffect(() => {
    let active = true
    mountedRef.current = true

    const schedule = () => {
      if (!active || !poll) return
      window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(run, DONATION_POLL_MS)
    }

    const run = async () => {
      if (!active || document.hidden) {
        schedule()
        return
      }

      await load()
      schedule()
    }

    const handleVisibilityChange = () => {
      if (!document.hidden) run()
    }

    run()
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      active = false
      mountedRef.current = false
      window.clearTimeout(timerRef.current)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (controllerRef.current) controllerRef.current.abort()
    }
  }, [load, poll])

  return {
    ...payload,
    loading,
    error,
    refresh: load,
  }
}
