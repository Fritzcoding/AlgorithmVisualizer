// Local presets data used to avoid runtime fetch calls
// Keep this in sync with public/presets.json as needed
const presets = {
  "binary-search": [
    { id: "easy", name: "Easy", description: "Small range (0-50)", upper: 50, lower: 0, max: 50 },
    { id: "medium", name: "Medium", description: "Standard range (0-100)", upper: 100, lower: 0, max: 100 },
    { id: "hard", name: "Hard", description: "Large range (0-1000)", upper: 1000, lower: 0, max: 1000 }
  ],
  "sorting": [
    { id: "small", name: "Small", description: "10 elements", arraySize: 10 },
    { id: "medium", name: "Medium", description: "50 elements", arraySize: 50 },
    { id: "large", name: "Large", description: "100 elements", arraySize: 100 }
  ],
  "pathfinder": [
    { id: "small-grid", name: "Small Grid", description: "10x10 grid", rows: 10, cols: 10 },
    { id: "medium-grid", name: "Medium Grid", description: "20x20 grid", rows: 20, cols: 20 },
    { id: "large-grid", name: "Large Grid", description: "30x30 grid", rows: 30, cols: 30 }
  ],
  "prime-numbers": [
    { id: "basic", name: "Basic", description: "Up to 50", limit: 50 },
    { id: "standard", name: "Standard", description: "Up to 100", limit: 100 },
    { id: "advanced", name: "Advanced", description: "Up to 300", limit: 300 }
  ],
  "n-queen": [
    { id: "easy", name: "Easy", description: "Small grid, slow speed", number: 4, speedSlider: 10 },
    { id: "medium", name: "Medium", description: "Standard grid and speed", number: 8, speedSlider: 50 },
    { id: "hard", name: "Hard", description: "Large grid, faster speed", number: 12, speedSlider: 80 }
  ]
  ,
  "convex-hull": [
    { id: "easy", name: "Easy", description: "Few points, slow", number: 20, speedSlider: 20 },
    { id: "medium", name: "Medium", description: "Moderate points", number: 50, speedSlider: 50 },
    { id: "hard", name: "Hard", description: "Many points, faster", number: 100, speedSlider: 80 }
  ],
  "recursion-tree": [
    { id: "easy", name: "Easy", description: "Small n, small branching", n: 4, r: 2, algo: 0 },
    { id: "medium", name: "Medium", description: "Moderate n and branching", n: 6, r: 2, algo: 0 }
  ]
};

export default presets;
