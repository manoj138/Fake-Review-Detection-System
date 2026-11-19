import React from 'react';
import { LandingNavbar } from '../../components/landing/LandingNavbar';
import { HeroSection } from '../../components/landing/HeroSection';
import { ProblemSolution } from '../../components/landing/ProblemSolution';
import { FeaturesGrid } from '../../components/landing/FeaturesGrid';
import { LiveDemoWidget } from '../../components/landing/LiveDemoWidget';
import { HowItWorks } from '../../components/landing/HowItWorks';
import { PricingSection } from '../../components/landing/PricingSection';
import { Testimonials } from '../../components/landing/Testimonials';
import { FAQAccordion } from '../../components/landing/FAQAccordion';
import { LandingFooter } from '../../components/landing/LandingFooter';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FB] text-[#172033] selection:bg-[#635BFF] selection:text-white">
      <LandingNavbar />
      <main>
        <HeroSection />
        <ProblemSolution />
        <FeaturesGrid />
        <LiveDemoWidget />
        <HowItWorks />
        <PricingSection />
        <Testimonials />
        <FAQAccordion />
      </main>
      <LandingFooter />
    </div>
  );
}
export default LandingPage;

