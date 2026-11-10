import { useState } from 'react'
import useFetch from './hooks/useFetch.js'

const API_URL = 'https://jsonplaceholder.typicode.com/photos'
const MAX_PHOTOS = 100

// The API's image host (via.placeholder.com) is no longer reliable, so if an image
// fails to load we draw a coloured square using the hex colour found in the URL.
function PhotoCard({ photo }) {
  const [broken, setBroken] = useState(false)
  const hex = photo.url.split('/').pop()

  return (
    <div className="photo-card">
      {broken ? (
        <div className="fallback" style={{ background: `#${hex}` }}>600 x 600</div>
      ) : (
        <img src={photo.url} alt={photo.title} onError={() => setBroken(true)} />
      )}
      <p title={photo.title}>{photo.title}</p>
    </div>
  )
}

function App() {
  const { data, loading, error } = useFetch(API_URL)

  return (
    <main className="page">
      <h1>Photos</h1>
      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">Error: {error}</p>}
      {data && (
        <div className="grid">
          {data.slice(0, MAX_PHOTOS).map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>
      )}
    </main>
  )
}

export default App
