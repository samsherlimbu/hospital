// controllers/feedback.js
const nodemailer = require('nodemailer');
const Feedback = require('../models/feedback');

const submitFeedback = async (req, res) => {
    const { email, message } = req.body;

    // Validate input
    if (!email || !message) {
        return res.status(400).json({ error: 'Email and message are required.' });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    try {
        // Save feedback to the database
        const feedback = new Feedback({ email, message });
        await feedback.save();

        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Set up email options
        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: 'New Feedback Received',
            text: `Feedback Details:\nEmail: ${email}\nMessage: ${message}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Feedback submitted and email sent successfully.' });
    } catch (error) {
        console.error('Error submitting feedback or sending email:', error);
        res.status(500).json({ error: 'Failed to submit feedback or send email.' });
    }
}

module.exports = { submitFeedback };
