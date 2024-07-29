const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8080;

// para procesar los json del cliente
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const FILE_PATH = 'users.json';
let users = [];

// Función para leer datos desde el archivo
const readFromFile = (filename) => {
    if (fs.existsSync(filename)) {
        const data = fs.readFileSync(filename, 'utf8');
        return JSON.parse(data);
    }
    return [];
};

// Función para escribir datos en el archivo
const writeToFile = (filename, data) => {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf8');
};

// Función para registrar en consola y archivo
const logAndPersist = (message, data) => {
    console.log(message, data);
    writeToFile(FILE_PATH, users);
};

// Leer datos del archivo al iniciar el servidor
users = readFromFile(FILE_PATH);

// Endpoint para obtener usuarios
app.get('/api/users', (req, res) => {
    const response = { data: users };
    logAndPersist('GET /api/users:', response);
    res.send(response);
});

// Endpoint para agregar usuario
app.post('/api/users', (req, res) => {
    const { body } = req;
    if (!body.email || !body.password) {
        const errorResponse = { status: 'error', error: 'falta data' };
        logAndPersist('POST /api/users: Error:', errorResponse);
        return res.status(400).send(errorResponse);
    }
    const newUser = { id: users.length + 1, ...body };
    users.push(newUser);
    const response = { data: users };
    logAndPersist('POST /api/users: Success:', response);
    res.status(200).send(response);
});

// Endpoint para actualizar usuario
app.put('/api/users/:uid', (req, res) => {
    const { uid } = req.params;
    const { body } = req;
    const userIndex = users.findIndex(user => user.id === Number(uid));
    if (userIndex === -1) {
        const errorResponse = { status: 'error', error: 'Usuario no encontrado' };
        logAndPersist('PUT /api/users/:uid: Error:', errorResponse);
        return res.status(404).send(errorResponse);
    }
    users[userIndex] = { ...users[userIndex], ...body };
    const response = { data: users };
    logAndPersist('PUT /api/users/:uid: Success:', response);
    res.send(response);
});

// Endpoint para eliminar usuario
app.delete('/api/users/:uid', (req, res) => {
    const { uid } = req.params;
    const newUsers = users.filter(user => user.id !== Number(uid));
    if (newUsers.length === users.length) {
        const errorResponse = { status: 'error', error: 'Usuario no encontrado' };
        logAndPersist('DELETE /api/users/:uid: Error:', errorResponse);
        return res.status(404).send(errorResponse);
    }
    users = newUsers;
    const response = { data: users };
    logAndPersist('DELETE /api/users/:uid: Success:', response);
    res.send(response);
});

app.listen(PORT, () => {
    console.log('Escuchando en el puerto:', PORT);
});
