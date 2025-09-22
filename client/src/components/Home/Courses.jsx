import React from "react";

const CourseCard = ({ image, title, instructor, price }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-bold text-neutral mb-2">{title}</h3>
      <p className="text-gray-500 mb-4">By {instructor}</p>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-primary">{price}</span>
        <button className="bg-secondary text-white font-semibold py-2 px-4 rounded-md hover:bg-emerald-600 transition duration-300">
          Enroll Now
        </button>
      </div>
    </div>
  </div>
);

const Courses = () => {
  const coursesData = [
    {
      image:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
      title: "React for Beginners",
      instructor: "John Doe",
      price: "$49",
    },
    {
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
      title: "Advanced Tailwind CSS",
      instructor: "Jane Smith",
      price: "$79",
    },
    {
      image:
        "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
      title: "Full-Stack Web Development",
      instructor: "Sam Wilson",
      price: "$199",
    },
  ];
  return (
    <section id="courses" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral">
            Our Popular Courses
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Start learning a new skill with our expert-led courses.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesData.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
