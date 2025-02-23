import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Carregar variáveis do ficheiro .env

const app = express();
const PORT = process.env.PORT || 4000;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

app.get('/weather/:city', async (req, res) => {
    try {
        const { city } = req.params;
        const response = await axios.get(`${WEATHER_API_URL}/${city}?key=${WEATHER_API_KEY}&unitGroup=metric`);

        const weatherData = response.data;
        const result = {
            cidade: weatherData.address,
            temperatura: weatherData.currentConditions.temp,
            condicao: weatherData.currentConditions.conditions,
        };
        res.json(result);
    } catch (error) {
        console.error("Erro a chamar a API:", error);
        res.status(500).json({ erro: "Erro ao obter os dados meteorológicos." });
    }
});

// Rota de teste para garantir que a API está a funcionar
app.get('/', (req, res) => {
    res.json({ "boas": "pessoal" });
});

app.listen(PORT, () => {
    console.log(`API a correr em http://localhost:${PORT}`);
});