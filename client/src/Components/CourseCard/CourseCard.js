import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ Course }) => {
    // console.log("Course : ", Course)
    // console.log("Course : ", Course)
    const {
        thumbnail,
        courseName,
        instructor,
        price
    } = Course;

    // Placeholder values for rating, reviews, and badge
    const rating = "4.4 ★";
    const reviews = "9,181";
    const badge = "Bestseller";

    return (
        <>
            <div className="w-[15rem] border-1 border-pure-greys-5 mx-auto max-w-screen-xl bg-white/30 backdrop-blur-lg shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105">
                <Link to={`/courses/${Course._id}`}>
                    <img className="w-full h-48 object-cover" src={thumbnail} alt={courseName} />
                    <div className="p-4">
                        <h3 className="text-xl font-semibold">{courseName}</h3>
                        <p className="text-gray-700">{`${instructor?.firstName ?? instructor} ${instructor?.lastName ?? ""}`}</p>
                        <div className="flex items-center my-2">
                            <span className="text-yellow-500">{rating}</span>
                            <span className="ml-2 text-gray-600">({reviews})</span>
                        </div>
                        <p className="text-xl font-bold text-gray-900">₹{price}</p>
                        {badge && (
                            <span className="inline-block bg-yellow-300 text-yellow-800 text-xs font-semibold mt-2 px-2 py-1 rounded">
                                {badge}
                            </span>
                        )}
                    </div>
                </Link>
            </div>
        </>
    );
};

export default CourseCard;
