require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

console.log("GMAIL:", process.env.EMAIL_USER);
console.log("PASS:", process.env.EMAIL_PASS.length); // should log 16


  // Configure Nodemailer with Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:process.env.EMAIL_USER,    // your Gmail
      pass:process.env.EMAIL_PASS     // your Gmail App Password
    }
  });

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    to:process.env.EMAIL_USER,
    subject: `New contact form submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent from ${email}`);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
