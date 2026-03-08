'use client'

import { ScrollProgress } from '@/components/solutionSections/shared/ScrollProgress'
import { Header } from '@/components/solutionSections/sections/Header'
import { Footer } from '@/components/solutionSections/sections/Footer'
import { AboutSection } from '@/components/solutionSections/sections/AboutSection'
import { ServicesSection } from '@/components/solutionSections/sections/ServicesSection'
import { PortfolioSection } from '@/components/solutionSections/sections/PortfolioSection'
import { ProcessSection } from '@/components/solutionSections/sections/ProcessSection'
import { TestimonialsSection } from '@/components/solutionSections/sections/TestimonialsSection'
import { ContactSection } from '@/components/solutionSections/sections/ContactSection'
import { HeroSection } from '@/components/solutionSections/sections/HeroSection'

export default function SolutionsPage() {
  const handleScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="bg-background text-foreground">
      <ScrollProgress />
      <Header onScroll={handleScroll} />
      <HeroSection onScroll={function (sectionId: string): void {
              throw new Error('Function not implemented.')
          } } />
      <AboutSection />
      <ServicesSection onScroll={handleScroll} />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer onScroll={handleScroll} />
    </main>
  )
}
