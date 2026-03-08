import AboutSection from "@/components/mainPage/sections/AboutSection";
import AchievementsSection from "@/components/mainPage/sections/AchievementSection";
import CaseStudiesSection from "@/components/mainPage/sections/CaseStudiesSection";
import ContactSection from "@/components/mainPage/sections/ContactSection";
import FooterSection from "@/components/mainPage/sections/FooterSection";
import HeroSection from "@/components/mainPage/sections/HeroSection";
import ProjectsSection from "@/components/mainPage/sections/ProjectsSection";
import TechStackSection from "@/components/mainPage/sections/Techstacksection ";


export default function MainPageSectionWise (){
    return (
        <>
        {/* <Overview /> */}
        < HeroSection />
        <AboutSection />
        < ProjectsSection />
        < CaseStudiesSection />
        < TechStackSection />
        <AchievementsSection />
        <ContactSection />
        < FooterSection />
        </>
    )
}