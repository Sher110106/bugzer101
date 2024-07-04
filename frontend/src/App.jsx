import React, { useEffect } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faXTwitter, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import './index.css';

function App() {
    useEffect(() => {
        const captureUserActions = () => {
            const userActions = [];
            const errorLogs = [];

            document.addEventListener('click', (event) => {
                userActions.push({
                    type: 'click',
                    timestamp: new Date().toISOString(),
                    target: event.target.tagName,
                    id: event.target.id,
                    classList: [...event.target.classList]
                });
            });

            window.onerror = (message, source, lineno, colno, error) => {
                errorLogs.push({
                    message,
                    source,
                    lineno,
                    colno,
                    error: error ? error.stack : null,
                    timestamp: new Date().toISOString()
                });
            };

            const sendReport = async () => {
                const screenshot = await captureScreenshot();
                const reportData = {
                    actions: userActions,
                    errors: errorLogs,
                    screenshot
                };

                fetch('https://api-sher110106s-projects.vercel.app/report', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(reportData)
                })
                    .then(response => response.json())
                    .then(data => console.log('Report sent successfully:', data))
                    .catch(error => console.error('Error sending report:', error));
            };

            const captureScreenshot = async () => {
                return 'screenshot-data';
            };

            const reportButton = document.getElementById('report-button');
            if (reportButton) {
                reportButton.addEventListener('click', sendReport);
            }
        };

        captureUserActions();
    }, []);

    return (
        <div className="w-full">
            {/* NavBar */}
            <nav className="flex justify-center mt-2 sticky top-2 bg-opacity-50 z-10">
                <div className="flex h-24 rounded-lg w-3/5 items-center justify-center gap-7 shadow-lg z-100 bg-white">
                    <a href="#about">
                        <Button variant="outlined">
                            01. ABOUT BUGZER
                        </Button>
                    </a>

                    <a href="#how-it-works">
                        <Button variant="outlined">
                            02. HOW IT WORKS
                        </Button>
                    </a>
                    <a href="#contact">
                        <Button variant="outlined">
                            03. CONTACT
                        </Button>
                    </a>
                </div>
            </nav>


            {/* Main Content */}
            <main className="flex">
                {/* Links */}
                <div className="fixed top-2 right-2 z-50">
                    <Button id="report-button" variant="outlined" className="bg-red-500 text-white">
                        Report
                    </Button>
                </div>
                <aside className="flex fixed flex-col gap-5 h-[70vh] justify-center ml-10" id="socials">
                    <a id="instagram" href="https://www.instagram.com/bugzerrr?utm_source=qr" target="_blank"
                       rel="noopener noreferrer">
                        <IconButton className="rounded hover:shadow-lg" variant="outlined" size="lg">
                            <FontAwesomeIcon icon={faInstagram} className="text-2xl"/>
                        </IconButton>
                    </a>
                    <a id="twitter" href="https://x.com/LionEatingBugs" target="_blank" rel="noopener noreferrer">
                        <IconButton className="rounded hover:shadow-lg" variant="outlined" size="lg">
                            <FontAwesomeIcon icon={faXTwitter} className="text-2xl"/>
                        </IconButton>
                    </a>

                    <a id="mail" href="mailto:bugzerrr@gmail.com" target="_blank" rel="noopener noreferrer">
                        <IconButton className="rounded hover:shadow-lg" variant="outlined" size="lg">
                            <FontAwesomeIcon icon={faEnvelope} className="text-2xl"/>
                        </IconButton>
                    </a>
                </aside>

                {/* Movable content */}
                <section className="w-full flex flex-col items-center overflow-y-scroll h-[80vh]">
                    <div className="w-3/5 flex flex-col items-left mt-20" id="hero">
                        <p className="mt-2 mb-3 text-xl">Welcome to</p>
                        <span className="text-blue-700"><h1 className="my-2 text-8xl font-bold">Bugzer</h1></span>
                        <h2 className="my-2 text-7xl font-semibold">Streamline Your Bug Reporting</h2>
                    </div>
                    <div className=" flex flex-col items-center mt-20 text-blue-700 justify-center" id="intro">
                        <p className="mt-4 mb-3 text-xl w-3/5 justify-center items-center">
                            "Bugzer is a web app designed to streamline the bug reporting process for both new and
                            existing websites.
                            It provides integrated bug reporting, user action logs, screenshots, and detailed reports to
                            help developers
                            quickly identify and fix issues."
                        </p>
                    </div>
                    <div className="w-3/5 h-screen flex flex-col items-left" id="how-it-works">
                        <h1 className="text-3xl mt-40 font-bold">01. How It Works</h1>
                        <div className="py-10 px-20">
                            <ol className="list-decimal ml-5 text-gray-700 text-sm">
                                <li>Users log actions and errors as they interact with a site.</li>
                                <li>Click the "report" button when encountering a bug.</li>
                                <li>Provide a brief description.</li>
                                <li>A detailed report is sent to the developers.</li>
                            </ol>
                        </div>
                        <div className="py-10 px-20">
                            <h2 className="text-2xl mb-4 font-semibold">Watch How It Works</h2>
                            <div className="video-container">
                                <video controls>
                                    <source src="./bugzer5.mp4" type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>


                    <div className="items-center  h-screen flex flex-col items-left" id="about">
                        <h1 className="text-3xl mt-40 font-bold p-10">02. About Bugzer</h1>

                        <div className="col-span-1  items-center  justify-center">
                            <img src="./Untitled-3.png" alt="Bugzer logo"
                                 className="rounded-full items-center  justify-center shadow-lg p-15  h-35 w-96"/>
                        </div>
                        <div className="flex justify-center items-center h-screen">
                            <div className="col-span-2 shadow-lg rounded-lg bg-white p-5">
                                <p className="mb-3 text-center">
                                    <b>Welcome to Bugzer!</b> Bugzer is a comprehensive bug reporting tool designed to
                                    make the process of identifying and fixing bugs as seamless as possible.
                                    Whether you're a developer, tester, or project manager, Bugzer provides the tools
                                    you need to streamline your workflow and improve the quality of your software.
                                </p>
                                <p className="my-3 text-center">
                                    <b>Our Mission</b> is to provide a user-friendly platform that simplifies bug
                                    reporting and enhances collaboration between team members.
                                    With Bugzer, you can easily log user actions, capture screenshots, and generate
                                    detailed reports that help developers quickly identify and resolve issues.
                                </p>
                                <p className="my-3 text-center">
                                    We are constantly evolving and adding new features to ensure that Bugzer meets the
                                    needs of our users. Stay tuned for updates and new releases!
                                </p>
                            </div>
                        </div>

                    </div>


                    {/* How It Works */}


                    {/* Contact */}
                    <div className="w-3/5 h-[100vh] flex flex-col items-center my-20" id="contact">
                        <h1 className="text-3xl font-bold">03. Get In Touch</h1>
                        <h2 className="text-6xl my-4 font-semibold">Contact Us</h2>
                        <p className="text-xl text-center mb-8">
                            We are always here to help. Whether you have a question, feedback, or need support, feel
                            free to reach out to us.
                            Our team is dedicated to providing you with the best possible experience.
                        </p>
                        <a href="mailto:bugzerrr@gmail.com">
                            <Button>Contact Us</Button>
                        </a>
                    </div>
                    {/* Footer */}
                    <footer className="w-full text-center py-4 bg-gray-100">
                        Created by <b>Bugzer Team,</b> 2024
                    </footer>
                </section>
            </main>
        </div>
    );
}

export default App;
