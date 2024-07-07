import express from 'express';
import bodyParser from 'body-parser';
import puppeteer from 'puppeteer-core';
import mongoose from 'mongoose';
import cors from 'cors';
import {join} from 'path';

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });

const reportSchema = new mongoose.Schema({
    actions: Array,
    errors: Array,
    screenshot: String,
    timestamp: { type: Date, default: Date.now }
}, { suppressReservedKeysWarning: true });

const Report = mongoose.model('Report', reportSchema);

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'https://bugzer.vercel.app' // Allow requests from your frontend domain
}));

app.get("/", (req, res) => {
    res.send("done");
});

app.post('/report', async (req, res) => {
    const { actions, errors } = req.body;

    let screenshot;
    try {
        const browser = await puppeteer.launch({
            executablePath: join(__dirname, 'cache', 'puppeteer', 'chrome', 'mac_arm-126.0.6478.126', 'chrome-mac-arm64', 'Google Chrome for Testing.app', 'Contents', 'MacOS', 'Google Chrome for Testing'),
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            headless: true
        });
        const page = await browser.newPage();

        // Log requests to help with debugging
        page.on('request', request => {
            console.log('Request:', request.url());
        });

        // Log responses to help with debugging
        page.on('response', response => {
            console.log('Response:', response.url(), response.status());
        });

        await page.goto('https://bugzer.vercel.app/', { waitUntil: 'networkidle2' });

        // Wait for a specific element to ensure the page is fully loaded
        await page.waitForSelector('body');

        screenshot = await page.screenshot({ encoding: 'base64' });
        await browser.close();
    } catch (err) {
        console.error('Error capturing screenshot:', err.message);
        screenshot = 'screenshot-error'; // Fallback value
    }

    console.log('Screenshot:', screenshot);
    const newReport = new Report({
        actions,
        errors,
        screenshot
    });

    try {
        await newReport.save();
        res.status(200).send('Report saved successfully');
    } catch (err) {
        console.error('Error saving report:', err);
        res.status(500).send('Error saving report');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Export the app for Vercel
export default app;
