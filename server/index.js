const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/contact', async (req, res) => {
    const { name, email, number, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });

    transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: '📩 New Contact Form Submission',
        html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>📬 New Message from Your Portfolio</h2>
      <p><strong>Name:</strong> ${name || "N/A"}</p>
      <p><strong>Email:</strong> ${email || "N/A"}</p>
      <p><strong>Mobile:</strong> ${mobile || "N/A"}</p>
      <hr>
      <p style="white-space: pre-line;"><strong>Message:</strong><br>${message}</p>
      <br>
      <footer style="font-size: 12px; color: #888;">
        You received this message from your portfolio website.
      </footer>
    </div>
  `,
    });

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to send message.' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
