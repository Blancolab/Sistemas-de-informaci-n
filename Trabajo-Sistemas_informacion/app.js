const express = require("express");
const session = require('express-session');
const db = require('./DB/db');
const rutas = require('./routes/rutas'); // Llama a routes.js

const app = express();
const port = 3005;

// Configuración de plantillas y archivos estáticos
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Middlewares para leer datos de formularios y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de sesiones
app.use(session({
    secret: 'un_secreto_muy_seguro_y_largo', // Cambia esto por seguridad
    resave: false,
    saveUninitialized: false
}));

// --- RUTAS PÚBLICAS (AUTENTICACIÓN) ---

// Muestra el formulario de login
app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// Procesa el login
app.post('/auth', (req, res) => {
    const { nombre_usuario, contraseña } = req.body;
    if (!nombre_usuario || !contraseña) {
        return res.render('login', { error: '¡Por favor, ingresa un usuario y contraseña!' });
    }
    const consulta = 'SELECT * FROM usuario WHERE nombre_usuario = ? AND contraseña = ?';
    db.query(consulta, [nombre_usuario, contraseña], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            req.session.loggedin = true;
            req.session.username = nombre_usuario;
            res.redirect('/');
        } else {
            res.render('login', { error: '¡Usuario y/o contraseña incorrectos!' });
        }
    });
});

// --- MIDDLEWARE DE AUTENTICACIÓN ---
const checkAuth = (req, res, next) => {
    if (req.session.loggedin) {
        next(); // Si hay sesión, continúa
    } else {
        res.redirect('/login'); // Si no, al login
    }
};

// --- RUTAS PROTEGIDAS ---
// Aplica el middleware 'checkAuth' a TODAS las rutas importadas de 'rutas.js'
app.use('/', checkAuth, rutas);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://127.0.0.1:${port}`);
    console.log('Intenta acceder a la ruta principal para ser redirigido al login.');
});