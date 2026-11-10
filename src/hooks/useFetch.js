import { useState, useEffect } from 'react'

// Custom hook: fetches JSON from `url` and returns { data, loading, error }.
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    setLoading(true)
    setError(null)

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
        return res.json()
      })
      .then((json) => {
        setData(json)
        setLoading(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return // ignore cancelled requests
        setError(err.message)
        setLoading(false)
      })

    // cleanup: cancel the request if the component unmounts or url changes
    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}

export default useFetch
