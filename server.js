const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;


app.use(bodyParser.json());
app.use(express.json());

app.get('/ping', (req, res) => {
        res.json({message: 'pong'})
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
