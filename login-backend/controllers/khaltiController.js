const express = require('express');
const axios = require('axios');
const app = express();

// Define an API endpoint that proxies requests to the Khalti API
app.get('/api/khalti/verify', async (req, res) => {
    const { token, amount, key } = req.query;
    const khaltiUrl = `https://khalti.com/api/v2/payment/verify/?token=${token}/amount=${amount}/key=${key}`;
    try {
        const response = await axios.get(khaltiUrl);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching data from Khalti.');
    }
});

// Start the server on port 3000
app.listen(3000, () => console.log('Server started on port 3000.'));
