import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustedCompanies from "../components/TrustedCompanies";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";
import CTA from "../components/CTA";

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustedCompanies />
      <Features />
      <HowItWorks />
      <Stats />
      <CTA />
    </>
  );
}

export default LandingPage;