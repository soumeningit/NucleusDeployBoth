import React from 'react'
import { useState } from 'react';
import { apiConnector } from "../service/apiConnector";
import { contactUs } from '../service/apis';
import CourseLandingPage from './CourseLandingPage';
import CourseContent from './CourseContent';
import CourseSections from './CourseSections';
import Video from '../Components/VideoDetails/Video';

function ContactUs() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [message, setMessage] = useState('');

    const submitHandler = (e) => {

        e.preventDefault();

        // Create FormData object
        const formData = {
            firstName,
            lastName,
            email,
            contactNumber,
            message,
        };

        // Print form data to console (you can also send it to an API)
        console.log('Form Data:', formData);

        putUserResponse(formData);

        // Reset form fields after submission (optional)
        setFirstName('');
        setLastName('');
        setEmail('');
        setContactNumber('');
        setMessage('');
    }

    async function putUserResponse(formData) {
        try {
            console.log("formData : ", formData);
            const response = await apiConnector("POST", contactUs.CONTACT_US_API, formData);
            console.log(response)
        }
        catch (error) {
            console.log("Can't send user data :", error)
            console.log(error)

        }
    }

    return (
        <div className="mx-auto max-w-7xl px-4">
            <div className="mx-auto max-w-7xl py-12 md:py-24">
                <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
                    <div className="flex items-center justify-center">
                        <div className="px-2 md:px-12">
                            <p className="text-2xl font-bold text-gray-900 md:text-4xl">
                                Get in touch
                            </p>
                            <p className="mt-4 text-lg text-gray-600">
                                Our friendly team would love to hear from you.
                            </p>
                            <form onSubmit={submitHandler} className="mt-8 space-y-4">
                                <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
                                    <div className="grid w-full items-center gap-1.5">
                                        <label
                                            className="text-sm font-medium outline-none leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="first_name"
                                        >
                                            First Name
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="text"
                                            id="first_name"
                                            placeholder="First Name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <label
                                            className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="last_name"
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="text"
                                            id="last_name"
                                            placeholder="Last Name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <label
                                        className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                        type="email"
                                        id="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <label
                                        className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="contactNumber"
                                    >
                                        Phone number
                                    </label>
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                        type="tel"
                                        id="contactNumber"
                                        placeholder="contactNumber"
                                        value={contactNumber}
                                        onChange={(e) => setContactNumber(e.target.value)}
                                    />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <label
                                        className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="message"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        className="flex h-32 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                        id="message"
                                        placeholder="Leave us a message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                    <img
                        alt="Contact us"
                        className="hidden max-h-full w-full rounded-lg object-cover lg:block"
                        src="https://images.unsplash.com/photo-1543269664-56d93c1b41a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGhhcHB5JTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                    />
                </div>
            </div>
        </div>

    )
}

export default ContactUs