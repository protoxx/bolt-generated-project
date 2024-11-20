import { useState, useEffect, useRef } from 'react'
import { Tool } from '../types'
import { useNavigate } from 'react-router-dom'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (value: string) => {
    setQuery(value)
    onSearch(value)
  }

  return (
    <div ref={searchRef} className="relative max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search AI tools..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {query && isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg">
          <div className="p-2">
            <button
              onClick={() => navigate(`/search?q=${encodeURIComponent(query)}`)}
              className="w-full px-3 py-2 text-left text-sm text-blue-600 hover:bg-blue-50 rounded"
            >
              Search for "{query}"
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
