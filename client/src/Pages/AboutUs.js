import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-8">
                    Welcome to Nucleus
                </h1>
                <p className="text-lg sm:text-xl text-gray-700 mb-6">
                    At Nucleus, we are committed to transforming the learning experience through technology. Our mission is to provide high-quality, accessible education to everyone, everywhere.
                </p>

                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Core Values Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
                        <p className="text-gray-600">
                            We aim to create a learning platform that bridges the gap between education and technology, providing tailored courses and resources for learners at all levels.
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h2>
                        <p className="text-gray-600">
                            To empower individuals to achieve their educational goals through an intuitive and engaging platform, fostering a global community of lifelong learners.
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h2>
                        <p className="text-gray-600">
                            We believe in accessibility, innovation, and inclusivity. We strive to make learning engaging and accessible to everyone, regardless of their background or location.
                        </p>
                    </div>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-2">
                    {/* Team Section */}
                    <div className="bg-[#111827] text-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">Meet Our Team</h2>
                        <p>
                            Our passionate team of educators, technologists, and designers work tirelessly to bring the best learning experience to you. At Nucleus, we prioritize student success and strive to continuously improve.
                        </p>
                    </div>

                    {/* Why Nucleus Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-[#111827] mb-4">Why Choose Nucleus?</h2>
                        <p className="text-[#4B5563]">
                            Whether you're a student, a professional, or just someone eager to learn, Nucleus offers a wide range of courses designed to help you succeed. With cutting-edge content and user-friendly design, learning has never been easier.
                        </p>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="mt-16 bg-[#3949AB] text-white py-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-4">Ready to start your learning journey?</h2>
                    <p className="mb-6">
                        Join Nucleus today and gain access to world-class education at your fingertips.
                    </p>
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-white text-[#3949AB] px-6 py-3 rounded-full shadow-lg hover:bg-[#E5E7EB] transition-all">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
