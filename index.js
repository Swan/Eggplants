const path = require('path');
const config = require('./config/config.json');
const express = require('express');
const app = express();

app.use(express.static(__dirname));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

const PORT = process.env.PORT || config.CLIENT_SERVER_PORT;
app.listen(PORT, () => {
   console.log(`[CLIENT] HTTP CLIENT SERVER STARTED ON PORT: ${PORT}`);
});