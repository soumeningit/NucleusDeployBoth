import React from 'react';

const CourseContent = () => {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="text-sm text-gray-500 mb-4">101 sections • 640 lectures • 58h 28m total length</div>
            <button className="text-blue-500 hover:underline">Expand all sections</button>

            <div className="mt-4">
                <Section
                    title="Day 1 - Beginner - Working with Variables in Python to Manage Data"
                    lectures="18 lectures • 1hr 36min"
                />
                <Section
                    title="Day 2 - Beginner - Understanding Data Types and How to Manipulate Strings"
                    lectures="10 lectures • 1hr 6min"
                    expanded
                >
                    <Lecture title="Day 2 Goals: what we will make by the end of the day" time="01:46" />
                    <Lecture title="Python Primitive Data Types" time="07:58" />
                    <Quiz title="Data Types Quiz" questions="3 questions" />
                    <Lecture title="Type Error, Type Checking and Type Conversion" time="07:19" />
                    <InteractiveExercise title="[Interactive Coding Exercise] Data Types" time="03:34" />
                    <Lecture title="Mathematical Operations in Python" time="08:27" />
                    <InteractiveExercise title="[Interactive Coding Exercise] BMI Calculator" time="06:14" />
                    <Lecture title="Number Manipulation and F Strings in Python" time="08:10" />
                    <InteractiveExercise title="[Interactive Coding Exercise] Life in Weeks" time="03:31" />
                    <Quiz title="Mathematical Operations Quiz" questions="3 questions" />
                    <Lecture title="Day 2 Project: Tip Calculator" time="18:20" />
                    <Lecture title="You are already in the top 50%" time="00:29" />
                </Section>
                <Section
                    title="Day 3 - Beginner - Control Flow and Logical Operators"
                    lectures="13 lectures • 1hr 23min"
                />
                <Section
                    title="Day 4 - Beginner - Randomisation and Python Lists"
                    lectures="9 lectures • 1hr 7min"
                />
                <Section
                    title="Day 5 - Beginner - Python Loops"
                    lectures="9 lectures • 50min"
                />
            </div>

        </div>
    );
};

const Section = ({ title, lectures, children, expanded }) => {
    return (
        <div className="mb-4">
            <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg cursor-pointer">
                <div>
                    <h2 className="font-semibold">{title}</h2>
                    <div className="text-sm text-gray-500">{lectures}</div>
                </div>
                <div>
                    {expanded ? '-' : '+'}
                </div>
            </div>
            {expanded && <div className="pl-4 mt-2 space-y-2">{children}</div>}
        </div>
    );
};

const Lecture = ({ title, time }) => {
    return (
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-200 rounded-full mr-4"></div>
                <div>{title}</div>
            </div>
            <div className="text-sm text-gray-500">{time}</div>
        </div>
    );
};

const Quiz = ({ title, questions }) => {
    return (
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
                <div className="w-6 h-6 bg-yellow-200 rounded-full mr-4"></div>
                <div>{title}</div>
            </div>
            <div className="text-sm text-gray-500">{questions}</div>
        </div>
    );
};

const InteractiveExercise = ({ title, time }) => {
    return (
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-200 rounded-full mr-4"></div>
                <div>{title}</div>
            </div>
            <div className="text-sm text-gray-500">{time}</div>
        </div>
    );
};

export default CourseContent;
