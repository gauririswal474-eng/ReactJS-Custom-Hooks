# React Custom Hook: useFetch

A custom hook `useFetch(url)` that fetches data from an API and returns `{ data, loading, error }`, used to display a photo grid.

## Files
- `src/hooks/useFetch.js`: the custom hook
- `src/App.jsx`: uses the hook with `https://jsonplaceholder.typicode.com/photos` and renders the grid
- `src/index.css`: styling (black page, 4-column grid)

## How the hook works
- Accepts a `url` parameter.
- Uses the browser `fetch` API inside `useEffect`.
- Returns `data` (fetched JSON or `null`), `loading` (boolean) and `error` (message or `null`).

## Decisions made during the enhancement process
- **`useState` x3 for data, loading, error:** keeps the hook's return values simple and matches the brief.
- **`useEffect` with `[url]` dependency:** the request re-runs automatically when the URL changes.
- **Response check:** `fetch` does not reject on HTTP errors, so `res.ok` is checked and an error is thrown for bad statuses.
- **AbortController cleanup:** cancels in-flight requests when the component unmounts or the URL changes, avoiding state updates on unmounted components. Abort errors are ignored.
- **Only the first 100 photos are rendered:** the API returns 5,000 items; limiting keeps the page fast.
- **Image fallback:** the API's placeholder image host can be unreliable, so a failed image is replaced by a coloured square built from the hex colour in the URL.
- **Long titles truncated** with ellipsis so every card stays the same height.

## Run locally
```
npm install
npm run dev
```

## Deployed link
https://YOUR-LINK
