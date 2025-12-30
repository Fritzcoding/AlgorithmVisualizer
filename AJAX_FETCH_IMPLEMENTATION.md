# AJAX/Fetch Implementation - Algorithm Visualizer

## Overview
This project now includes a **Fetch API-based preset system** that demonstrates AJAX technology integration. Users can quickly load predefined configurations for each algorithm using preset buttons.

## How It Works

### 1. **Presets JSON File** (`/public/presets.json`)
- Contains preset configurations for multiple algorithms
- Each algorithm has 3 different presets (Easy, Medium, Hard or similar)
- Example presets include:
  - **Binary Search**: Easy (0-50), Medium (0-100), Hard (0-1000)
  - **Sorting**: Small (10 elements), Medium (50), Large (100)
  - **Pathfinder**: Small Grid (10x10), Medium (20x20), Large (30x30)
  - **Prime Numbers**: Basic (100), Standard (500), Advanced (1000)

### 2. **usePresets Hook** (`/src/lib/hooks/usePresets.js`)
- Custom React Hook that uses the **Fetch API**
- Fetches presets from `/presets.json` asynchronously
- Handles loading and error states
- Returns presets for a specific algorithm

**Key Features:**
```javascript
const fetchPresets = async () => {
  const response = await fetch('/presets.json');
  const data = await response.json();
  // Process and return data
};
```

### 3. **PresetSelector Component** (`/src/components/preset-selector.jsx`)
- Displays preset buttons for the current algorithm
- Calls `usePresets` hook to fetch configurations
- Uses Fetch API indirectly through the hook
- Provides user-friendly buttons to apply presets

### 4. **Integration Example** (Binary Search)
- PresetSelector is displayed before the game starts
- When a preset is clicked, it updates:
  - `upper`: Maximum number in range
  - `lower`: Minimum number in range
  - `max`: Display limit
- Preset values override manual input

## AJAX/Fetch Technology Details

### Fetch API Usage
```javascript
// Inside usePresets hook
const response = await fetch('/presets.json');
const data = await response.json();
```

**Why this is AJAX:**
- ✅ Asynchronous HTTP request (Fetch)
- ✅ JSON data exchange
- ✅ Non-blocking UI updates
- ✅ Error handling and loading states
- ✅ Client-side data binding

### Benefits
1. **Modular Design**: Presets can be updated without code changes
2. **Scalability**: Easy to add more presets
3. **User Experience**: Quick preset selection vs manual configuration
4. **Modern Standards**: Uses native Fetch API (modern JavaScript)

## How to Test

1. Open the Binary Search algorithm
2. Before starting the game, you'll see preset buttons:
   - **Easy** - Range 0-50
   - **Medium** - Range 0-100
   - **Hard** - Range 0-1000
3. Click any preset to instantly apply its configuration
4. The preset values populate the "Upper Number" field automatically

## Future Enhancements

You can easily extend this by:
- Adding more presets per algorithm
- Creating a backend API endpoint instead of JSON file
- Adding custom preset creation by users
- Persisting user presets to localStorage
- Syncing presets to a database

## Technical Stack

- **Frontend**: React (Functional & Class Components)
- **API**: Fetch API (modern AJAX)
- **Data Format**: JSON
- **Styling**: Tailwind CSS

## Proof of AJAX Implementation

The Fetch API is used in:
1. `usePresets.js` - Direct Fetch call
2. `preset-selector.jsx` - Uses the hook with Fetch data
3. `page.jsx` - Displays and applies fetched presets

This satisfies the AJAX/Fetch requirement while providing practical functionality!

## Algorithm Info via Fetch (new)

### What we added
- A JSON file at `/public/algorithm-info.json` containing titles, short descriptions and longer `details` for each algorithm.
- A client-only fetch call inside `src/app/components/algorithm-cards.jsx` that loads `/algorithm-info.json` on mount.

### Where the fetch runs
- `AlgorithmCards` is a client component (it starts with `"use client"`). The fetch is executed in a `useEffect` so it only runs on the browser after hydration — this avoids server/client mismatch and keeps SSR deterministic.

### What the code does (high level)
1. On component mount `useEffect` calls `fetch('/algorithm-info.json')`.
2. The response JSON is parsed and stored in local state (`info`).
3. Cards read `info[algorithm.id]` and, if present, show the fetched `title` and `description` instead of the hard-coded strings. If the fetch fails, the component falls back to embedded values.

### Minimal example (from `AlgorithmCards`)
```javascript
useEffect(() => {
  fetch('/algorithm-info.json')
    .then(r => { if (!r.ok) throw new Error('failed'); return r.json(); })
    .then(data => setInfo(data))
    .catch(() => setInfo(null));
}, []);

// later when rendering each card
const fetched = info && info[algorithm.id];
const title = fetched ? fetched.title : algorithm.title;
const desc = fetched ? fetched.description : algorithm.description;
```

### Why this is useful
- Data can be updated without modifying React source files — just edit `/public/algorithm-info.json`.
- The fetch is asynchronous and non-blocking, so page load isn't held up.
- The approach is plain AJAX (Fetch API) and keeps the UI responsive.

### How to test it locally
1. Start the dev server:
```bash
cd AlgorithmVisualizer
npm run dev
```
2. Open the browser DevTools → Network tab and reload the main page.
3. You should see a request to `/algorithm-info.json` and a 200 response with the JSON payload.
4. If you edit `public/algorithm-info.json` and refresh, the cards should display updated titles/descriptions.

### Notes & best practices
- Keep `algorithm-info.json` valid JSON (no JS comments). I added this file at `/public/algorithm-info.json`.
- Because the fetch runs on the client, server-side rendering remains deterministic and hydration mismatches are avoided.
- For production you can move the JSON to an API endpoint if you want runtime updates or auth-protected editing.

### Additional details about the AJAX panel and dropdown

- The component uses two client-side fetch usages:
  - A `useEffect` on mount that fetches `/algorithm-info.json` and stores it in React state (`info`) so the orbiting algorithm cards can show up-to-date titles/descriptions.
  - A vanilla-JS async function `loadAlgo(id)` that also fetches `/algorithm-info.json` when the user selects an option from the custom dropdown. `loadAlgo` fills the DOM nodes inside the Algorithm Info panel (name, details, time, space). An artificial 400ms delay is added so the loading indicator is visible for demo purposes.

- The Algorithm Info panel is a purely client-side feature (the component begins with `"use client"`). This avoids SSR/hydration mismatches and lets us use browser-only APIs like `document.getElementById` and pointer events safely.

- UI behaviors implemented:
  - The panel is draggable: click-and-drag the panel header (or the small circular toggle) to move it around the page. Drag state is stored in component state so the panel stays where you drop it.
  - When collapsed the panel becomes a small circular toggle button (still draggable and always visible). Click it to expand the full panel.
  - The dropdown of algorithm options is rendered from the fetched `algorithm-info.json` when available. If the JSON contains many entries, the option list scrolls (there's an `overflow-y` scrollbar with a max height so the list doesn't overflow the page).

### Where the fetch runs (summary)
- `src/app/components/algorithm-cards.jsx` — `useEffect` fetch to populate `info` state for cards.
- `src/app/components/algorithm-cards.jsx` — `loadAlgo(id)` vanilla async function used by the dropdown to fill panel details; also fetches the same JSON and shows a short loading indicator.
