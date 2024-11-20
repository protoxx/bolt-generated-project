import { useSearchParams } from 'react-router-dom'
import { mockTools } from '../data/mockData'
import ToolGrid from '../components/ToolGrid'
import CategoryFilter from '../components/CategoryFilter'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''

  const categories = Array.from(new Set(mockTools.map(tool => tool.category)))

  const filteredTools = mockTools.filter(tool => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(query.toLowerCase()) ||
      tool.description.toLowerCase().includes(query.toLowerCase())
    
    const matchesCategory = !category || tool.category === category

    return matchesSearch && matchesCategory
  })

  const handleCategoryChange = (newCategory: string) => {
    const params = new URLSearchParams(searchParams)
    if (newCategory) {
      params.set('category', newCategory)
    } else {
      params.delete('category')
    }
    setSearchParams(params)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Search Results for "{query}"
      </h1>

      <CategoryFilter
        categories={categories}
        selectedCategory={category}
        onCategoryChange={handleCategoryChange}
      />

      {filteredTools.length > 0 ? (
        <ToolGrid tools={filteredTools} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No tools found matching your search</p>
        </div>
      )}
    </div>
  )
}
