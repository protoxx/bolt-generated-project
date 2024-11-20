import Hero from '../components/home/Hero'
import FeaturedTools from '../components/home/FeaturedTools'
import TrendingTools from '../components/home/TrendingTools'
import CategoryExplorer from '../components/home/CategoryExplorer'
import NewsletterSignup from '../components/home/NewsletterSignup'
import { mockTools } from '../data/mockData'

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Hero />
      <FeaturedTools tools={mockTools} />
      <TrendingTools tools={mockTools} />
      <CategoryExplorer />
      <NewsletterSignup />
    </div>
  )
}
