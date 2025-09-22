import { useState, useEffect, useRef } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import AnimatedElement from "../components/Home/AnimatedElement";

import { FiMenu, FiX, FiTarget, FiZap, FiBriefcase } from "react-icons/fi";
import { FaLinkedinIn, FaTwitter, FaFacebookF } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";

const AboutHero = () => (
  <section className="pt-32 pb-20 md:pt-40 md:pb-24 bg-white relative overflow-hidden">
    <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-50 rounded-full -translate-x-1/2 opacity-50 blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-50 rounded-full translate-x-1/2 opacity-50 blur-3xl"></div>
    <div className="container mx-auto px-6 text-center relative">
      <AnimatedElement>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 leading-tight">
          We're making education{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            accessible to all.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto">
          Our mission is to empower individuals to reach their full potential by
          providing high-quality, flexible, and engaging learning experiences.
        </p>
      </AnimatedElement>
    </div>
  </section>
);

const OurStory = () => (
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <AnimatedElement>
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
            alt="A diverse group of people collaborating and learning together"
            className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full h-full object-cover aspect-video md:aspect-auto"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/600x450/E0E7FF/3730A3?text=Our+Story";
            }}
          />
        </AnimatedElement>
        <AnimatedElement delay={200}>
          <h3 className="text-indigo-600 font-semibold uppercase tracking-wider">
            Our Story
          </h3>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2 mb-6">
            From a Simple Idea to a Global Community
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Nucleus started in a small coffee shop with a big idea: what if
            anyone, anywhere, could learn from the very best? Frustrated by the
            limitations of traditional education, our founders set out to build
            a platform that put learners first.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Today, we're proud to have built a thriving community of curious
            minds, expert instructors, and forward-thinking companies, all
            dedicated to the pursuit of knowledge and growth.
          </p>
        </AnimatedElement>
      </div>
    </div>
  </section>
);

const OurValues = () => {
  const values = [
    {
      icon: <FiTarget size={30} />,
      title: "Learner-Centric",
      description:
        "Our learners are at the core of every decision we make. Their success is our success.",
    },
    {
      icon: <FiZap size={30} />,
      title: "Innovation",
      description:
        "We constantly explore new ways to make learning more effective, engaging, and fun.",
    },
    {
      icon: <HiOutlineUsers size={30} />,
      title: "Community",
      description:
        "We foster a supportive and collaborative environment where everyone can thrive.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <AnimatedElement customClass="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Our Guiding Principles
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-4">
            The values that drive our mission forward and shape our culture.
          </p>
        </AnimatedElement>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <AnimatedElement key={value.title} delay={i * 150}>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-indigo-200/50 border border-gray-100 transition-all duration-300 transform hover:-translate-y-2 text-center h-full group">
                <div className="bg-indigo-100 text-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamMemberCard = ({ name, role, avatar }) => (
  <div className="text-center group">
    <div className="relative inline-block">
      <img
        src={avatar}
        alt={name}
        className="w-40 h-40 rounded-full mx-auto mb-4 shadow-lg object-cover transition-transform duration-300 transform group-hover:scale-105"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/160x160/CCCCCC/FFFFFF?text=??";
        }}
      />
      <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-indigo-500 transition-all duration-300"></div>
    </div>
    <h4 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
      {name}
    </h4>
    <p className="text-gray-500 font-medium">{role}</p>
  </div>
);

const MeetTheTeam = () => {
  const team = [
    {
      name: "Dr. Evelyn Reed",
      role: "CEO & Co-Founder",
      avatar:
        "https://avatar.iran.liara.run/username?username=Evelyn+Reed&size=160&background=14B8A6&color=FFFFFF",
    },
    {
      name: "Marcus Hayes",
      role: "CTO & Co-Founder",
      avatar:
        "https://avatar.iran.liara.run/username?username=Marcus+Hayes&size=160&background=F59E0B&color=FFFFFF",
    },
    {
      name: "Jasmine Kaur",
      role: "Head of Curriculum",
      avatar:
        "https://avatar.iran.liara.run/username?username=Jasmine+Kaur&size=160&background=EF4444&color=FFFFFF",
    },
    {
      name: "David Chen",
      role: "Head of Product",
      avatar:
        "https://avatar.iran.liara.run/username?username=David+Chen&size=160&background=3B82F6&color=FFFFFF",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <AnimatedElement customClass="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            The People Behind the Platform
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-4">
            A passionate team dedicated to revolutionizing education.
          </p>
        </AnimatedElement>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {team.map((member, i) => (
            <AnimatedElement key={member.name} delay={i * 150}>
              <TeamMemberCard {...member} />
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
};

const JoinUsCTA = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-6">
      <AnimatedElement>
        <div className="rounded-2xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600">
          <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 opacity-50"></div>
          <div className="relative z-10">
            <div className="bg-white/20 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <FiBriefcase size={40} />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
              Want to Join Our Mission?
            </h2>
            <p className="text-indigo-200 text-lg max-w-2xl mx-auto mb-8">
              We're always looking for talented individuals to join our team.
              Check out our open positions and help us shape the future of
              learning.
            </p>
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105">
              View Careers
            </button>
          </div>
        </div>
      </AnimatedElement>
    </div>
  </section>
);

function AboutUs() {
  return (
    <div className="font-sans antialiased text-gray-900 bg-white">
      <Navbar />
      <main>
        <AboutHero />
        <OurStory />
        <OurValues />
        <MeetTheTeam />
        <JoinUsCTA />
      </main>
      <Footer />
    </div>
  );
}

export default AboutUs;
