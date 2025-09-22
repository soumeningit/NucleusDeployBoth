import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import Testimonials from "../components/Home/Testimonials";

import { useEffect } from "react";
import CTA from "../components/Home/CTA";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function Home() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
            @keyframes fade-in-up {
                0% {
                    opacity: 0;
                    transform: translateY(20px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            .animate-fade-in-up {
                animation: fade-in-up 0.8s ease-out forwards;
                opacity: 0;
            }
        `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return (
    <>
      <div className="bg-gray-50 text-neutral">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Testimonials />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Home;
