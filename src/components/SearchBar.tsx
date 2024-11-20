interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="max-w-2xl mx-auto mb-8">
      <input
        type="text"
        placeholder="Search AI tools..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  )
}
