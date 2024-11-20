interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2 mb-8 flex-wrap">
      <button
        onClick={() => onCategoryChange('')}
        className={`px-4 py-2 rounded-full ${
          selectedCategory === '' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-200 text-gray-700'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === category 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
