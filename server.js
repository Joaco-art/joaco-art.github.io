const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // Para autenticación con tokens JWT
const users = {}; // Simulación de base de datos en memoria

app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.json({ success: false, message: 'El usuario ya existe.' });
    }
    users[username] = { password }; // Guardar usuario en "base de datos"
    res.json({ success: true });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!users[username] || users[username].password !== password) {
        return res.json({ success: false, message: 'Usuario o contraseña incorrectos.' });
    }
    const token = jwt.sign({ username }, 'secretKey'); // Generar token JWT
    res.json({ success: true, token });
});

app.listen(3000, () => {
    console.log('Servidor escuchando en puerto 3000');
});
