const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { Resend } = require('resend'); // ✅ Resend import

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// ✅ Initialize Resend with API Key
const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/contact', async (req, res) => {
    const { name, email, number, subject, message } = req.body;

    const htmlMessage = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>📬 New Alert from Your Portfolio</h2>
      <p><strong>Name:</strong> ${name || "N/A"}</p>
      <p><strong>Email:</strong> ${email || "N/A"}</p>
      <p><strong>Mobile:</strong> ${number || "N/A"}</p>
      <hr>
      <p style="white-space: pre-line;"><strong>Message:</strong><br>${message}</p>
      <br>
      <footer style="font-size: 12px; color: #888;">
        You received this message from your portfolio website.
      </footer>
    </div>
    `;

    try {
        const result = await resend.emails.send({
            from: 'Kunal Dhauta <onboarding@resend.dev>', // ✅ use a verified domain email if available
            to: process.env.RECEIVER_EMAIL,
            subject: subject || '📩 New Contact Form Submission',
            html: htmlMessage,
        });

        console.log('📤 Email sent:', result);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('❌ Error sending email:', error);
        res.status(500).json({ error: 'Failed to send message.' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
