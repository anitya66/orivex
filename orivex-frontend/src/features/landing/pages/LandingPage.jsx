import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustedCompanies from "../components/TrustedCompanies";
import WhyChoose from "../components/WhyChoose";
import HowItWorks from "../components/HowItWorks";
import Statistics from "../components/Statistics";
import CTASection from "../components/CTASection";
import LandingFooter from "../components/LandingFooter";

function LandingPage() {
  return (
    <>
      <Navbar />

      <Hero />

      <TrustedCompanies />

      <WhyChoose />

      <HowItWorks />

      <Statistics />

      <CTASection />

      <LandingFooter />
    </>
  );
}

export default LandingPage;