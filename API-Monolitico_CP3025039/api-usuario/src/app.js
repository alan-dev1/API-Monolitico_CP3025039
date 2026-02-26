const express = require('express');
const userRoutes = require('./routes/routes');

const app = express();

app.use(express.json());

app.use(userRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada.' });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});