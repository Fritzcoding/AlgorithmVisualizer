import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Github, Home } from 'lucide-react'

export default function Navbar(props) {
  const { hideAbout } = props || {};
  return (
    <nav className="bg-gray-200 py-1 px-6 flex justify-between items-center border-b border-gray-300">
      <Link href="/" className="text-xl font-bold text-gray-800">{props.title}</Link>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="lg" asChild className="text-gray-800 hover:text-gray-600">
          <Link href="/">
            <Home className="h-4 w-4" />
            Home
          </Link>
        </Button>
        {!hideAbout && (
          <Button variant="ghost" size="lg" asChild className="text-gray-800 hover:text-gray-600">
            <Link href="/about">About</Link>
          </Button>
        )}
        <Button size="icon" variant="ghost" className="text-gray-800 hover:text-gray-600">
          <a href="https://github.com/Fritzcoding" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5" />
          </a>
        </Button>
      </div>
    </nav>
  )
}

