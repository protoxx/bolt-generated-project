import Hero from '../components/home/Hero'
import FeaturedTools from '../components/home/FeaturedTools'
import { mockTools } from '../data/mockData'

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Hero />
      <FeaturedTools tools={mockTools} />
    </div>
  )
}
