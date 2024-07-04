import express from 'express';
import bodyParser from 'body-parser';
import puppeteer from 'puppeteer';
import mongoose from 'mongoose';
import cors from "cors";

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:tesbiq-xEskuf-7dygco@cluster0.a6eeksn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
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
app.use(cors());

app.post('/report', async (req, res) => {
    let screenshot;
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://bugzer.vercel.app/'); // Adjust the URL to your frontend
        screenshot = await page.screenshot({ encoding: 'base64' });
        await browser.close();
    } catch (err) {
        console.error('Error capturing screenshot:', err);
        screenshot = 'screenshot-error'; // Fallback value
    }
    const { actions, errors } = req.body
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
