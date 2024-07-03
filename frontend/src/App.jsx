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
                //http://localhost:5173
                //https://api-omega-navy-60.vercel.app/report
                fetch('//https://api-omega-navy-60.vercel.app/report', {
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

                {/* Movable content */}
                <section className="w-full flex flex-col items-center overflow-y-scroll h-[80vh]">
                    <div className="w-3/5 flex flex-col items-left mt-20" id="hero">
                        <p className="mt-2 mb-3 text-xl">Welcome to</p>
                        <span className="text-blue-700"><h1 className="my-2 text-8xl font-bold">Bugzer</h1></span>
                        <h2 className="my-2 text-7xl font-semibold">Streamline Your Bug Reporting</h2>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;
