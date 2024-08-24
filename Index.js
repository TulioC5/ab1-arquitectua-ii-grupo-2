const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 5050;

// Configurar el body parser para recibir datos en formato JSON
app.use(bodyParser.json());

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambiar según tu configuración de MySQL
    password: '', // Cambiar según tu configuración de MySQL
    database: 'rutasdb'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

// Rutas CRUD

// Crear usuario
app.post('/usuarios', (req, res) => {
    const { nombre, contraseña, usuario, puesto } = req.body;
    const sql = 'INSERT INTO tbl_usuarios (nombre, contraseña, usuario, puesto) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, contraseña, usuario, puesto], (err, result) => {
        if (err) throw err;
        res.send('Usuario creado con éxito');
    });
});

// Consultar todos los usuarios
app.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM tbl_usuarios';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Consultar un usuario específico
app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM tbl_usuarios WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

// Actualizar usuario
app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, contraseña, usuario, puesto } = req.body;
    const sql = 'UPDATE tbl_usuarios SET nombre = ?, contraseña = ?, usuario = ?, puesto = ? WHERE id = ?';
    db.query(sql, [nombre, contraseña, usuario, puesto, id], (err, result) => {
        if (err) throw err;
        res.send('Usuario actualizado con éxito');
    });
});

// Eliminar usuario
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM tbl_usuarios WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send('Usuario eliminado con éxito');
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
