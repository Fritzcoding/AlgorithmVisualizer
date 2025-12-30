# Algorithm Visualizer - Complete Setup & Running Guide

## System Requirements

- **Operating System**: Windows, macOS, or Linux
- **Node.js**: Version 16.x or higher
- **npm**: Version 7.x or higher (comes with Node.js)
- **Disk Space**: ~500MB for node_modules and dependencies
- **RAM**: Minimum 2GB (4GB+ recommended)

## Step-by-Step Setup Instructions

### 1. Install Node.js

**Windows:**
1. Visit [nodejs.org](https://nodejs.org)
2. Download the LTS (Long Term Support) version
3. Run the installer and follow the setup wizard
4. Restart your computer after installation

**Verify Installation:**
```bash
node --version
npm --version
```

### 2. Clone or Download the Project

```bash
# Clone the repository
git clone https://github.com/MinMinBen/AlgorithmVisualizerPatch

# Navigate to the project directory
cd AlgorithmVisualizer
```

If you don't have Git installed:
- Download as ZIP from the GitHub repository
- Extract to your desired location
- Open terminal/command prompt in the extracted folder

### 3. Install Dependencies

```bash
# Install all required npm packages
npm install
```

This will:
- Create a `node_modules` folder
- Install Next.js, React, TailwindCSS, and all other dependencies
- Generate a `package-lock.json` file

⏱️ **Installation Time**: 2-5 minutes depending on internet speed

### 4. Start Development Server

```bash
# Start the development server with hot-reload
npm run dev
```

**Expected Output:**
```
> next dev

  ▲ Next.js 15.1.0

  Local:        http://localhost:3000
  Environments: .env.local

  ✓ Ready in 2.5s
```

### 5. Access the Application

Open your web browser and navigate to:
```
http://localhost:3000
```

You should see the Algorithm Visualizer homepage with navigation to all algorithm segments.

## Available NPM Commands

### Development
```bash
npm run dev
```
- Starts the development server with Hot Module Replacement (HMR)
- Changes are reflected instantly in the browser
- **Best for**: Development and testing

### Production Build
```bash
npm run build
```
- Creates an optimized production bundle in the `/build` directory
- Minifies code and optimizes assets
- **Duration**: 1-3 minutes

### Run Production Build
```bash
npm start
```
- Runs the production-optimized build locally
- **Use after**: `npm run build`
- **Port**: http://localhost:3000

### Combined Command (Build + Run)
```bash
npm run build && npm start
```

## Troubleshooting

### Issue: Port 3000 Already in Use

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Option 1: Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Option 2: Use a different port
npm run dev -- -p 3001
```

### Issue: npm: command not found

**Solution:**
- Node.js is not installed or not in system PATH
- Reinstall Node.js from [nodejs.org](https://nodejs.org)
- Restart terminal/command prompt after installation

### Issue: Slow Installation

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Install with verbose output to see progress
npm install --verbose
```

### Issue: Module Not Found Errors

**Solution:**
```bash
# Delete node_modules and package-lock.json
rmdir /s /q node_modules
del package-lock.json

# Reinstall everything
npm install
```

## Project File Structure Overview

```
AlgorithmVisualizer/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.js            # Home page
│   │   ├── layout.js          # Root layout wrapper
│   │   ├── globals.css        # Global styles
│   │   ├── binary-search/     # Binary search segment
│   │   ├── pathfinder/        # Pathfinding algorithms
│   │   ├── sorting/           # Sorting algorithms
│   │   └── ...                # Other algorithm segments
│   ├── components/            # Reusable React components
│   │   ├── navbar.jsx         # Navigation bar
│   │   ├── custom-slider.jsx  # Slider input
│   │   ├── ui/                # shadcn/ui components
│   │   └── ...                # Other components
│   └── lib/
│       ├── algorithms/        # Core algorithm implementations
│       └── helpers/           # Utility functions
├── public/                    # Static files (images, manifest)
├── package.json               # Dependencies and scripts
├── next.config.mjs            # Next.js configuration
├── tailwind.config.js         # TailwindCSS configuration
└── jsconfig.json              # JavaScript path aliases

```

## Technology Stack Breakdown

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.1.0 | React meta-framework with SSR |
| React | 18.3.1 | UI library for components |
| React DOM | 18.3.1 | DOM rendering |

### Styling & UI
| Technology | Version | Purpose |
|------------|---------|---------|
| TailwindCSS | 3.4.16 | Utility-first CSS framework |
| shadcn/ui | Latest | Pre-built accessible components |
| Radix UI | Latest | Headless UI primitives |
| Lucide React | 0.468.0 | Icon library |

### Animation & Effects
| Technology | Version | Purpose |
|------------|---------|---------|
| React Flip Move | 3.0.5 | Smooth list item animations |
| TailwindCSS Animate | 1.0.7 | CSS-based animations |
| react-mt-svg-lines | 0.9.1 | SVG line animations |

### Utilities
| Technology | Version | Purpose |
|------------|---------|---------|
| Lodash | 4.17.21 | JavaScript utility library |
| clsx | 2.1.1 | Class name composition |
| query-string | 7.1.1 | URL parameter parsing |

## Environment Configuration

### .env.local (Optional)
Create a `.env.local` file in the root directory for environment variables:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

## Deployment Options

### GitHub Pages (Live)
```bash
npm run build
npm run deploy
```

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Automatic deployment on push

### Other Platforms
- Netlify
- AWS Amplify
- Azure App Service
- DigitalOcean

## Debugging Tips

### Enable Verbose Logging
```bash
npm run dev -- --verbose
```

### Check for TypeScript/ESLint Errors
```bash
npx eslint src/
```

### Debug in Browser DevTools
1. Open DevTools: `F12` or `Ctrl+Shift+I`
2. Use Sources tab for step-by-step debugging
3. Use Console tab for logging

## Performance Optimization

### Clear Browser Cache
```
Ctrl+Shift+Delete (Chrome/Edge)
or
Cmd+Shift+Delete (macOS)
```

### Optimize Node Modules
```bash
npm ci  # Clean install instead of npm install
```

## Next Steps

1. **Explore Algorithm Segments**: Navigate through different algorithms in the UI
2. **Read Source Code**: Check `src/lib/algorithms/` for implementation details
3. **Modify Visualizations**: Experiment with colors and animation speeds
4. **Add New Algorithms**: Implement new algorithms following the existing pattern

## Getting Help

- **Documentation**: Check algorithm segment READMEs for detailed explanations
- **Code Comments**: Algorithms are documented with inline comments

## Quick Reference Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Clean install dependencies
npm ci

# Clear npm cache
npm cache clean --force

# Check for outdated packages
npm outdated

# Update packages
npm update
```

---

**Happy Algorithm Exploring! 🚀**
