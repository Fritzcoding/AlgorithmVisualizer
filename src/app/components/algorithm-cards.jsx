"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'



const algorithms = [
  {
    id: 'pathfinder',
    title: "Pathfinder",
    description: "Visualize graph algorithms like dijkstra, BFS, DFS",
    image: '/images/graph.png?height=200&width=300'
  },
  {
    id: 'recursion-tree',
    title: 'Recursion Tree',
    description: "The process in which a function calls itself directly or indirectly is called recursion",
    image: '/images/recursion.jpg?height=200&width=300'
  },
  {
    id: 'sorting',
    title: 'Sorting Algorithm',
    description: "Compare different sorting algorithms",
    image: '/images/sort.png?height=200&width=300'
  },
  {
    id: 'n-queen',
    title: 'N Queen',
    description: "The N queens puzzle is the problem of placing N chess queens on an N*N chessboard so that no two queens threaten each other",
    image: '/images/queen.PNG?height=200&width=300'
  },
  {
    id: 'prime-numbers',
    title: 'Prime Numbers',
    description: "Visualize how Seive is better than brute force",
    image: '/images/primes.jpg?height=200&width=300'
  },
  {
    id: 'convex-hull',
    title: 'Convex Hull',
    description: "The convex hull of a set of points is the smallest convex polygon that contains all the points of it",
    image: '/images/convex-hull.png?height=200&width=300'
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    description: "Binary search is an efficient algorithm for finding an item from a sorted list of item",
    image: '/images/binary-search.png?height=200&width=300'
  },
  // {
  //   id: '15-puzzle',
  //   title: '15 Puzzle',
  //   description: "The 15-puzzle is a sliding puzzle that consists of a frame of numbered square tiles in random order with one tile missing",
  //   image: '/AlgorithmVisualizer/images/15puzzle.PNG?height=200&width=300'
  // }
]

// Add animation styles
const animationStyles = `
@keyframes orbit1 {
  0% { transform: rotate(0deg) translateY(-300px) rotate(0deg); filter: drop-shadow(0 0 10px rgba(147, 51, 234, 0.3)); }
  50% { filter: drop-shadow(0 0 20px rgba(147, 51, 234, 0.6)); }
  100% { transform: rotate(360deg) translateY(-300px) rotate(-360deg); filter: drop-shadow(0 0 10px rgba(147, 51, 234, 0.3)); }
}

@keyframes orbit2 {
  0% { transform: rotate(51.43deg) translateY(-300px) rotate(-51.43deg); filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.3)); }
  50% { filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.6)); }
  100% { transform: rotate(411.43deg) translateY(-300px) rotate(-411.43deg); filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.3)); }
}

@keyframes orbit3 {
  0% { transform: rotate(102.86deg) translateY(-300px) rotate(-102.86deg); filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.3)); }
  50% { filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.6)); }
  100% { transform: rotate(462.86deg) translateY(-300px) rotate(-462.86deg); filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.3)); }
}

@keyframes orbit4 {
  0% { transform: rotate(154.29deg) translateY(-300px) rotate(-154.29deg); filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.3)); }
  50% { filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.6)); }
  100% { transform: rotate(514.29deg) translateY(-300px) rotate(-514.29deg); filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.3)); }
}

@keyframes orbit5 {
  0% { transform: rotate(205.71deg) translateY(-300px) rotate(-205.71deg); filter: drop-shadow(0 0 10px rgba(147, 51, 234, 0.3)); }
  50% { filter: drop-shadow(0 0 20px rgba(147, 51, 234, 0.6)); }
  100% { transform: rotate(565.71deg) translateY(-300px) rotate(-565.71deg); filter: drop-shadow(0 0 10px rgba(147, 51, 234, 0.3)); }
}

@keyframes orbit6 {
  0% { transform: rotate(257.14deg) translateY(-300px) rotate(-257.14deg); filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.3)); }
  50% { filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.6)); }
  100% { transform: rotate(617.14deg) translateY(-300px) rotate(-617.14deg); filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.3)); }
}

@keyframes orbit7 {
  0% { transform: rotate(308.57deg) translateY(-300px) rotate(-308.57deg); filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.3)); }
  50% { filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.6)); }
  100% { transform: rotate(668.57deg) translateY(-300px) rotate(-668.57deg); filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.3)); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.5), 0 0 40px rgba(99, 102, 241, 0.3); }
  50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.8), 0 0 60px rgba(99, 102, 241, 0.5); }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.orbit-1 { animation: orbit1 20s linear infinite; }
.orbit-2 { animation: orbit2 20s linear infinite; }
.orbit-3 { animation: orbit3 20s linear infinite; }
.orbit-4 { animation: orbit4 20s linear infinite; }
.orbit-5 { animation: orbit5 20s linear infinite; }
.orbit-6 { animation: orbit6 20s linear infinite; }
.orbit-7 { animation: orbit7 20s linear infinite; }

.orbits-paused .orbit-1,
.orbits-paused .orbit-2,
.orbits-paused .orbit-3,
.orbits-paused .orbit-4,
.orbits-paused .orbit-5,
.orbits-paused .orbit-6,
.orbits-paused .orbit-7 { animation-play-state: paused; }

.planet-glow {
  animation: pulse-glow 3s ease-in-out infinite;
}

/* morphing planet: use clip-path for smooth shape morph and keep transform centered */
.planet-morph { transition: clip-path 420ms cubic-bezier(.2,.9,.2,1), border-radius 420ms cubic-bezier(.2,.9,.2,1), box-shadow 420ms ease, background 420ms ease, transform 420ms cubic-bezier(.2,.9,.2,1); transform-origin: center center; }
.planet-circle { clip-path: circle(50% at 50% 50%); border-radius: 9999px; }
.planet-circle h2 { font-size: 1.5rem !important; }
.planet-circle p { font-size: 0.85rem !important; margin-top:4px !important; }
.planet-square { clip-path: inset(0% round 12px); border-radius: 12px !important; transform: scale(0.72); background: linear-gradient(90deg,#ef4444,#b91c1c) !important; color: #fff !important; }
.planet-square h2 { color: #fff !important; }
.planet-square p { color: rgba(255,255,255,0.9) !important; margin-top:4px !important; }
.planet-square .emoji { color: #fff !important; margin-top:6px !important; }

/* outline/glow base and mode-specific glows */
.planet-outline { border: 1px solid rgba(255,255,255,0.06); }
.planet-circle.planet-outline { box-shadow: 0 0 28px rgba(99,102,241,0.30), 0 0 68px rgba(99,102,241,0.12); }
.planet-square.planet-outline { box-shadow: 0 0 28px rgba(239,68,68,0.32), 0 0 68px rgba(239,68,68,0.12); }

/* clickable planet press animation */
.planet-active { animation: planet-pop 0.55s cubic-bezier(.2,.9,.2,1); }
@keyframes planet-pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.08); }
  100% { transform: scale(1); }
}

.space-bg {
  background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
  position: relative;
  overflow: hidden;
}

.stars {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: twinkle var(--duration) infinite;
}

.nebula-glow-1 {
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  top: 10%;
  left: 10%;
  filter: blur(80px);
  animation: float-slow-1 20s ease-in-out infinite;
}

.nebula-glow-2 {
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  bottom: 10%;
  right: 10%;
  filter: blur(80px);
  animation: float-slow-2 25s ease-in-out infinite;
}

@keyframes float-slow-1 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, 30px); }
}

@keyframes float-slow-2 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-40px, -40px); }
}

/* AJAX panel collapse */
.ajax-panel { max-height: 480px; transition: max-height 320ms ease, padding 320ms ease, opacity 320ms ease; }
.ajax-panel.collapsed { max-height: 0; padding-top: 0; padding-bottom: 0; opacity: 0; pointer-events: none; }

/* allow dropdown to overflow panel and add scrollbar */
.ajax-panel { overflow: visible; }
.ajax-dropdown { position: relative; display: inline-block; }
.ajax-dropdown .dropdown-btn { display:flex; align-items:center; gap:6px; }
.ajax-dropdown .options { position: absolute; right: 0; top: calc(100% + 6px); background: white; color: black; border-radius: 6px; box-shadow: 0 6px 18px rgba(0,0,0,0.2); max-height: 0; transition: max-height 220ms ease, opacity 220ms ease; opacity: 0; overflow: hidden; z-index: 800; }
.ajax-dropdown.open .options { max-height: 260px; opacity: 1; overflow-y: auto; }
.ajax-dropdown .options::-webkit-scrollbar { width: 8px; }
.ajax-dropdown .options::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 6px; }
.ajax-dropdown .option { padding: 8px 12px; cursor: pointer; white-space: nowrap; }
.ajax-dropdown .option:hover { background: #f3f4f6; transform: translateX(6px); transition: transform 160ms ease; }

/* small circular toggle when collapsed */
.panel-toggle-small { width:56px; height:56px; font-size:18px; border-radius:9999px; display:flex; align-items:center; justify-content:center; }
.panel-toggle-small:hover { transform: scale(1.06); transition: transform 160ms ease; }
`;

export function AlgorithmCards() {
  const [stars, setStars] = useState([]);
  const [planetActive, setPlanetActive] = useState(false);
  const [info, setInfo] = useState(null);
  const [panelCollapsed, setPanelCollapsed] = useState(false);
  const [panelPos, setPanelPos] = useState({ left: 24, top: 64 });
  const dragRef = React.useRef({ dragging: false, startX: 0, startY: 0, origLeft: 24, origTop: 64 });
  const [isSquare, setIsSquare] = useState(false);

  useEffect(() => {
    const s = [...Array(100)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${2 + Math.random() * 3}s`
    }));
    setStars(s);
    // fetch algorithm info JSON from public folder
    fetch('/algorithm-info.json')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load algorithm info');
        return r.json();
      })
      .then((data) => setInfo(data))
      .catch(() => setInfo(null));
  }, []);

  // Vanilla JS AJAX demo: wire up selection control and DOM updates
  useEffect(() => {
    const select = document.getElementById('ajax-algo-select');
    const loading = document.getElementById('ajax-loading');
    const nameEl = document.getElementById('ajax-name');
    const descEl = document.getElementById('ajax-desc');
    const timeEl = document.getElementById('ajax-time');
    const spaceEl = document.getElementById('ajax-space');

    if (!select) return;

    async function loadAlgo(id) {
      // show loading immediately
      if (loading) loading.style.display = 'block';
      if (nameEl) nameEl.textContent = '';
      if (descEl) descEl.textContent = '';
      if (timeEl) timeEl.textContent = '';
      if (spaceEl) spaceEl.textContent = '';

      try {
        const res = await fetch('/algorithm-info.json');
        if (!res.ok) throw new Error('fetch failed');
        const data = await res.json();
        // artificial delay so loading is visible
        await new Promise(r => setTimeout(r, 400));
        const infoItem = data[id];
        if (infoItem) {
          if (nameEl) nameEl.textContent = infoItem.title || id;
          if (descEl) descEl.textContent = infoItem.details || infoItem.description || '';
          // handle time object or string
          if (timeEl) {
            if (typeof infoItem.time === 'object') {
              const t = infoItem.time;
              timeEl.textContent = `${t.best || '-'} / ${t.average || t.avg || '-'} / ${t.worst || '-'} (best/avg/worst)`;
            } else {
              timeEl.textContent = infoItem.time || infoItem.complexity || '';
            }
          }
          if (spaceEl) spaceEl.textContent = infoItem.space || '';
        } else {
          if (nameEl) nameEl.textContent = 'Not found';
        }
      } catch (e) {
        if (nameEl) nameEl.textContent = 'Error loading info';
      } finally {
        if (loading) loading.style.display = 'none';
      }
    }

    // new dropdown uses .option elements inside select container
    function clickHandler(e) {
      const opt = e.target.closest && e.target.closest('.option');
      if (opt) {
        const val = opt.getAttribute('data-val');
        // update visible button text
        const btn = select.querySelector('.dropdown-btn');
        if (btn) btn.textContent = opt.textContent + ' ▾';
        // close dropdown
        select.classList.remove('open');
        loadAlgo(val);
      }
      // toggle dropdown when clicking the button
      if (e.target.closest && e.target.closest('.dropdown-btn')) {
        select.classList.toggle('open');
      }
    }

    select.addEventListener('click', clickHandler);
    // initial load: pick first option value
    const first = select.querySelector('.option');
    if (first) {
      const firstVal = first.getAttribute('data-val');
      const btn = select.querySelector('.dropdown-btn');
      if (btn) btn.textContent = first.textContent + ' ▾';
      loadAlgo(firstVal);
    }

    return () => select.removeEventListener('click', clickHandler);
  }, [info]);

    // handler to start drag from header/label area
    const startDrag = (e) => {
      e.preventDefault();
      dragRef.current.dragging = true;
      dragRef.current.startX = e.clientX;
      dragRef.current.startY = e.clientY;
      dragRef.current.origLeft = panelPos.left;
      dragRef.current.origTop = panelPos.top;
      const onPointerMove = (ev) => {
        if (!dragRef.current.dragging) return;
        const dx = ev.clientX - dragRef.current.startX;
        const dy = ev.clientY - dragRef.current.startY;
        setPanelPos({ left: Math.max(8, dragRef.current.origLeft + dx), top: Math.max(8, dragRef.current.origTop + dy) });
      };
      const onPointerUp = () => {
        dragRef.current.dragging = false;
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
      };
      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    };

  const handlePlanetActivate = () => {
    setPlanetActive(true);
    window.setTimeout(() => setPlanetActive(false), 800);
  };
  const handlePlanetKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePlanetActivate();
    }
  };

  const AlgorithmCard = ({ algorithm }) => {
    const fetched = info && info[algorithm.id];
    const desc = fetched ? fetched.description : algorithm.description;
    return (
    <Link href={`/${algorithm.id}`} className="block group w-full h-full">
      <Card className="overflow-hidden transition-shadow hover:shadow-lg h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={algorithm.image}
            alt={algorithm.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
          <CardHeader className="flex-grow">
          <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
            {fetched ? fetched.title : algorithm.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between">
          <p className="text-lg text-muted-foreground">{desc}</p>
        </CardContent>
      </Card>
    </Link>
    );
  };

  return (
    <>
      <style>{animationStyles}</style>
      <div className="space-bg relative w-full h-full min-h-screen flex items-center justify-center px-4">
        {/* Star field background */}
        <div className="absolute inset-0 overflow-hidden">
          {stars.map((s, i) => (
            <div
              key={i}
              className="stars"
              style={{
                left: s.left,
                top: s.top,
                ['--duration']: s.duration,
              }}
            />
          ))}
        </div>

        {/* Nebula glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="nebula-glow-1"></div>
          <div className="nebula-glow-2"></div>
        </div>

        {/* Orbital background rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute w-80 h-80 rounded-full border border-purple-400 opacity-30"></div>
          <div className="absolute w-96 h-96 rounded-full border border-indigo-400 opacity-20"></div>
          <div className="absolute w-[28rem] h-[28rem] rounded-full border border-purple-300 opacity-15"></div>
        </div>

        {/* Orbiting container - perfectly centered */}
        <div className={`relative z-10 w-80 h-80 flex items-center justify-center ${isSquare ? 'orbits-paused' : ''}`}>
          {/* Center Logo/Planet */}
          <div className="absolute z-20">
            <div
              className={`planet-glow planet-outline planet-morph ${isSquare ? 'planet-square' : 'planet-circle'} text-center bg-gradient-to-r from-purple-600 to-indigo-600 w-52 h-52 flex flex-col items-center justify-center text-white shadow-2xl ${planetActive? 'planet-active':''}`}
              role="button"
              tabIndex={0}
              onClick={() => {
                setIsSquare(s => !s);
                setPlanetActive(true);
                window.setTimeout(() => setPlanetActive(false), 420);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsSquare(s => !s);
                  setPlanetActive(true);
                  window.setTimeout(() => setPlanetActive(false), 420);
                }
              }}
              aria-pressed={planetActive}
              style={{ fontFamily: 'Poppins, Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
            >
              <h2 className="text-3xl font-extrabold leading-tight">Algorithms</h2>
              <p className="text-sm mt-1 leading-tight">Learn & Visualize</p>
              <div className="mt-2 text-5xl emoji">🪐</div>
            </div>
          </div>

          {/* Algorithm 0 - Top (0°) */}
          <div className="absolute w-72 h-72 orbit-1">
            <AlgorithmCard algorithm={algorithms[0]} />
          </div>

          {/* Algorithm 1 - 51.43° */}
          <div className="absolute w-72 h-72 orbit-2">
            <AlgorithmCard algorithm={algorithms[1]} />
          </div>

          {/* Algorithm 2 - 102.86° */}
          <div className="absolute w-72 h-72 orbit-3">
            <AlgorithmCard algorithm={algorithms[2]} />
          </div>

          {/* Algorithm 3 - 154.29° */}
          <div className="absolute w-72 h-72 orbit-4">
            <AlgorithmCard algorithm={algorithms[3]} />
          </div>

          {/* Algorithm 4 - 205.71° */}
          <div className="absolute w-72 h-72 orbit-5">
            <AlgorithmCard algorithm={algorithms[4]} />
          </div>

          {/* Algorithm 5 - 257.14° */}
          <div className="absolute w-72 h-72 orbit-6">
            <AlgorithmCard algorithm={algorithms[5]} />
          </div>

          {/* Algorithm 6 - 308.57° */}
          <div className="absolute w-72 h-72 orbit-7">
            <AlgorithmCard algorithm={algorithms[6]} />
          </div>
        </div>
      </div>
      
        {/* Algorithm Info panel (AJAX-loaded) - draggable container */}
        <div style={{ left: panelPos.left, top: panelPos.top }} className="absolute z-30">
          <div className="flex items-start gap-2">
            {/* small toggle visible when collapsed */}
            <button
              aria-label={panelCollapsed? 'Expand panel' : 'Collapse panel'}
              onClick={() => setPanelCollapsed(s => !s)}
              onPointerDown={startDrag}
              className={`panel-toggle-small bg-white/6 text-white rounded shadow ${panelCollapsed? '':'hidden'}`}
            >
              {panelCollapsed ? '▸' : '▾'}
            </button>

            {/* full header and panel area */}
            <div className={`bg-white/6 backdrop-blur-md rounded p-3 text-white border border-white/10 shadow-lg ajax-panel ${panelCollapsed? 'collapsed':''}`}>
              <div className="flex items-center justify-between mb-2" onPointerDown={startDrag} style={{ cursor: 'grab' }}>
                <label className="mr-2 font-medium">Algorithm Info</label>
                <div className={`ajax-dropdown`} id="ajax-algo-select">
                  <button type="button" className="dropdown-btn bg-white text-black px-3 py-1 rounded border border-gray-300">Select algorithm ▾</button>
                  <div className="options">
                    {/* render options from info if available, fallback to static list */}
                    {info ? Object.keys(info).map(key => (
                      <div key={key} className="option" data-val={key}>{info[key].title || key}</div>
                    )) : (
                      <>
                        <div className="option" data-val="pathfinder">Pathfinder</div>
                        <div className="option" data-val="recursion-tree">Recursion Tree</div>
                        <div className="option" data-val="sorting">Sorting</div>
                        <div className="option" data-val="n-queen">N Queen</div>
                        <div className="option" data-val="prime-numbers">Prime Numbers</div>
                        <div className="option" data-val="convex-hull">Convex Hull</div>
                        <div className="option" data-val="binary-search">Binary Search</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div id="ajax-loading" style={{display:'none'}} className="mb-2 text-sm font-medium">Loading algorithm info...</div>
              <div id="ajax-info" className="text-sm">
                <div><strong id="ajax-name"></strong></div>
                <div id="ajax-desc" className="mt-1 text-xs text-gray-200"></div>
                <div className="mt-2 text-xs text-gray-300">Time: <span id="ajax-time"></span></div>
                <div className="text-xs text-gray-300">Space: <span id="ajax-space"></span></div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

