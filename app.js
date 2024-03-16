const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint to handle translation
app.post('/translate', async (req, res) => {
  const { text, sourceLang, targetLang } = req.body;

  try {
    // Call Claude's API for translation
    const response = await fetch(`https://claudeapi.com/translate?source=${sourceLang}&target=${targetLang}&text=${encodeURIComponent(text)}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': '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' // Replace 'your_api_key_here' with your actual API key
      }
    });

    const data = await response.json();

    // Return translated text
    res.json({ translatedText: data.translated_text });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while translating text.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
