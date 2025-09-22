import AnimatedElement from "./AnimatedElement";
import TestimonialCard from "./TestimonialCard";

function Testimonials() {
  const testimonials = [
    {
      quote:
        "Nucleus transformed my career. The data science track was incredibly comprehensive and practical.",
      name: "Sarah Johnson",
      role: "Data Scientist @ TechCorp",
      avatar: "https://i.pravatar.cc/48?img=1",
    },
    {
      quote:
        "The flexible learning schedule allowed me to upskill while working a full-time job. Highly recommended!",
      name: "Michael Chen",
      role: "UX Designer @ CreativeMinds",
      avatar: "https://i.pravatar.cc/48?img=2",
    },
    {
      quote:
        "I landed my dream marketing job after completing the digital marketing certification on Nucleus.",
      name: "Emily Rodriguez",
      role: "Marketing Manager @ Innovate",
      avatar: "https://i.pravatar.cc/48?img=3",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <AnimatedElement customClass="text-center mb-16">
          <h3 className="text-indigo-600 font-semibold uppercase tracking-wider">
            Student Stories
          </h3>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2">
            Loved by Learners Worldwide
          </h2>
        </AnimatedElement>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={t.name} style={{ transitionDelay: `${i * 100}ms` }}>
              <AnimatedElement>
                <TestimonialCard {...t} />
              </AnimatedElement>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
