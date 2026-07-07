import { MotionConfig } from 'framer-motion'
import { BubbleField } from './components/cellar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Analytics from './components/Analytics'
import Testimonial from './components/Testimonial'
import FAQ from './components/FAQ'
import DemoForm from './components/DemoForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-cream-50">
        <BubbleField page />
        <Navbar />
        <Hero />
        <HowItWorks />
        <Features />
        <Analytics />
        <Testimonial />
        <FAQ />
        <DemoForm />
        <Footer />
      </div>
    </MotionConfig>
  )
}
