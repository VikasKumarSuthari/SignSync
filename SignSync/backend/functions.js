const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const {EMAIL1,EMAIL2,PASSWORD}=process.env;

const saveTranscript = async (req, res) => {
  try {

    // console.log("Request Headers:", req.headers);
    // console.log("Request Body:", req.body);
    const { transcript } = req.body;
    if (!transcript) {
      return res.status(400).json({ error: "No transcript received" });
    }
    console.log("Received transcript:", transcript);

    // Process the transcript (e.g., save to database)

    res.json({ message: "Transcript received successfully" });
  } catch (error) {
    console.error("Error processing transcript:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const sendEmail = async (formData) => {
  console.log("Sending email with data:", formData); 
  
  const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: EMAIL1,
          pass: PASSWORD,
      },
  });

  const mailOptions = {
      from: EMAIL1,
      to: EMAIL2, // Your email to receive messages
      subject: `Contact Form Submission: ${formData.subject}`,
      text: `
      Name: ${formData.name}
      Email: ${formData.email}
      Subject: ${formData.subject}
      Message: ${formData.message}
      `,
  };

  return transporter.sendMail(mailOptions);
};


module.exports = { saveTranscript,sendEmail };
