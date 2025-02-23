import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {res.json({"boas": "pessoal"})});

app.listen(PORT, () => {console.log(`API a correr em http://localhost:${PORT}`);});
