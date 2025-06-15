import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <section className="w-full">
                <div className="container flex flex-col justify-center mx-auto md:p-8">
                    <div className="gap-0">
                        <details className="w-full border rounded-lg">
                            <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">{question}</summary>
                            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">{answer}</p>
                        </details>
                    </div>
                </div>
            </section>
        </>
    );
};

const FAQSection = () => {
    const faqs = [
        {
            question: 'What subjects or courses do you offer?',
            answer: 'We offer a wide range of subjects and courses, including STEM, humanities, business, and more. You can explore our catalog to find courses that suit your interests and career goals.',
        },
        {
            question: 'How do I access the courses?',
            answer: 'Once you enroll in a course, you will have access to it through our platform. You can log in using your account credentials and navigate to the course materials, which may include video lectures, readings, quizzes, and assignments.',
        },
        {
            question: 'Do you offer certifications or credentials upon completion?',
            answer: 'Yes, we offer certificates of completion for many courses. These certificates can be a valuable addition to your resume or LinkedIn profile, demonstrating your skills and knowledge in a particular subject area.',
        },
        {
            question: 'Is there a community or forum where I can interact with other learners?',
            answer: "Yes, we have a vibrant online community where learners can interact, discuss course materials, ask questions, and collaborate on projects. It's a great way to connect with peers and instructors.",
        },
        {
            question: 'Are the courses self-paced or scheduled?',
            answer: 'We offer both self-paced courses and scheduled classes. You can choose the format that best fits your learning style and schedule. Scheduled classes typically have set start and end dates, while self-paced courses allow you to learn at your own pace.',
        },
        {
            question: 'What kind of support do you offer to learners?',
            answer: 'We provide various support options, including technical support for platform issues and academic support from instructors or teaching assistants. You can reach out via email, chat, or through our help center.',
        }

    ];

    return (
        <section className="bg-[rgba(31,41,55,255)] text-white flex flex-col items-center mt-10 w-full mx-auto justify-center">
            <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">How it works</p>
            <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">Frequently Asked Questions</h2>
            <div className="w-8/12">
                {faqs.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </section>
    );
};

export default FAQSection;
