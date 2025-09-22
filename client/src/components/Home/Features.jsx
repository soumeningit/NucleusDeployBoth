import {
  FaLaptopCode,
  FaUserTie,
  FaLightbulb,
  FaBullseye,
  FaChartBar,
  FaTv,
} from "react-icons/fa";
import AnimatedElement from "./AnimatedElement";
import FeatureCard from "./FeatureCard";

function Features() {
  const features = [
    {
      icon: <FaLaptopCode size={32} />,
      title: "Expert-Led Courses",
      description:
        "Learn from industry leaders and certified professionals with real-world experience.",
    },
    {
      icon: <FaBullseye size={32} />,
      title: "Personalized Learning",
      description:
        "Our AI-powered platform adapts to your learning style and career goals.",
    },
    {
      icon: <FaChartBar size={32} />,
      title: "Career Growth Tracking",
      description:
        "Monitor your progress, gain certifications, and see tangible career results.",
    },
    {
      icon: <FaTv size={32} />,
      title: "Interactive Sessions",
      description:
        "Engage with instructors and peers in real-time for a collaborative experience.",
    },
  ];
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <AnimatedElement customClass="text-center mb-16">
          <h3 className="text-indigo-600 font-semibold uppercase tracking-wider">
            Why Nucleus?
          </h3>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2">
            Everything You Need to Succeed
          </h2>
        </AnimatedElement>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <AnimatedElement>
                <FeatureCard {...feature} />
              </AnimatedElement>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
