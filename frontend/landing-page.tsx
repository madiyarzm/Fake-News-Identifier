import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Eye, BarChart } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white p-4">
      <main className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 animate-fade-in-up">Fake News Identifier</h1>
        <p className="text-xl mb-8 text-blue-200 animate-fade-in-up animation-delay-200">
          Empowering you to distinguish fact from fiction in the digital age
        </p>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            icon={<Shield className="h-12 w-12 mb-4 text-blue-400" />}
            title="Protect Yourself"
            description="Guard against misinformation and make informed decisions"
          />
          <FeatureCard
            icon={<Eye className="h-12 w-12 mb-4 text-blue-400" />}
            title="Advanced Analysis"
            description="Utilize cutting-edge AI to scrutinize news content"
          />
          <FeatureCard
            icon={<BarChart className="h-12 w-12 mb-4 text-blue-400" />}
            title="Instant Results"
            description="Get real-time feedback on the credibility of news"
          />
        </div>
        <Link href="/analyze" passHref>
          <Button className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 shadow-lg text-lg animate-pulse">
            Start Analyzing
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-blue-800/50 p-6 rounded-lg shadow-lg animate-fade-in-up animation-delay-400">
      {icon}
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-blue-200">{description}</p>
    </div>
  )
}

