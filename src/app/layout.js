import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Algorithm Visualizer",
  description: "Explore and learn algorithms through visualization.",
};

export default function RootLayout({ children }) {
  // randomize some visual params at render time so sizes/delays vary per session
  const cometDirs = ['dir-rtl', 'dir-ltr', 'dir-diag'];
  const comets = [0, 1, 2].map((i) => {
    const tail = 220 + Math.floor(Math.random() * 260); // px
    const delay = (Math.random() * 6).toFixed(2) + 's';
    const scale = (0.7 + Math.random() * 0.6).toFixed(2);
    const duration = (10 + Math.random() * 12).toFixed(2) + 's';
    return (
      <div
        key={`comet-${i}`}
        className={`comet comet--${i + 1} ${cometDirs[i % cometDirs.length]}`}
        style={{
          ['--tail-width']: `${tail}px`,
          ['--scale']: `${scale}`,
          animationDelay: delay,
          animationDuration: duration,
        }}
      />
    );
  });

  const asteroidDirs = ['dir-rtl', 'dir-ltr', 'dir-diag'];
  const asteroids = [0, 1, 2].map((i) => {
    const scale = 0.7 + Math.random() * 0.9;
    const delay = (1 + Math.random() * 8).toFixed(2) + 's';
    const duration = (12 + Math.random() * 14).toFixed(2) + 's';
    const top = 18 + Math.floor(Math.random() * 40);
    const w = Math.max(6, Math.round(14 * scale));
    const h = Math.max(5, Math.round(10 * scale));
    return (
      <div
        key={`ast-${i}`}
        className={`asteroid asteroid--${i + 1} ${asteroidDirs[i % asteroidDirs.length]}`}
        style={{
          width: `${w}px`,
          height: `${h}px`,
          animationDelay: delay,
          animationDuration: duration,
          top: `${top}%`
        }}
      />
    );
  });

  // UFO with slight random delay
  const ufoDelay = (Math.random() * 12).toFixed(2) + 's';

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="comet-layer" aria-hidden="true">
          {comets}
          <div className="ufo ufo--one" style={{ animationDelay: ufoDelay }} />
          {asteroids}
        </div>
        {children}
      </body>
    </html>
  );
}