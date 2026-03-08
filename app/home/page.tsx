"use client";
import { useState } from "react";
import ModernHeader from "@/components/mainPage/ModernHeader";
import SerpentineWaveWithStars from "@/components/mainPage/SerpentineWaveBackground";
import MainPageSectionWise from "./overviewpage/lyout";

export default function mainPage() {
    const [activeSection, setActiveSection] = useState("overview");
    const renderSection = () => {
    
  };
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 z-0">
        <SerpentineWaveWithStars />
      </div>
      <div className="relative z-10">
        <ModernHeader 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />
        <MainPageSectionWise />
      </div>
    </main>
  )
}
