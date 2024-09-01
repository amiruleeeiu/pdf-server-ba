const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const generatePDF = require('./generatePDF');

const app = express();

require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(bodyParser.text({ type: 'text/html' })); // Middleware to parse HTML content

app.post('/generate-pdf', async (req, res) => {
  try {
    const htmlContent = req.body; // Get HTML content from request body
    const outputPath = path.join(__dirname, 'result.pdf');

    // Generate PDF
    await generatePDF(htmlContent, outputPath);

    // Send PDF file as response
    res.sendFile(outputPath);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
