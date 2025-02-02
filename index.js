const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const TARGET_URL = 'http://a1080577.xsph.ru/public/commands.php';

app.all('*', async (req, res) => {
    try {
        const method = req.method.toLowerCase();
        const url = `${TARGET_URL}${req.originalUrl}`;
        const options = {
            method,
            url,
            headers: { ...req.headers },
            data: req.body
        };

        const response = await axios(options);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
