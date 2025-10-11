const express = require('express');
const app = express();
const db = require('../DB/db'); // Asegúrate de que la ruta a tu archivo de conexión sea correcta

// RUTA 1: Mostrar todos los oficios en la página principal
app.get('/', (req, res) => {
    // Corregido: Se consulta la tabla "oficio"
    const consulta = 'SELECT * FROM oficio';

    db.query(consulta, (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            res.send('Error, por favor contacta a soporte técnico.');
        } else {
            // Se renderiza la vista 'index.ejs' con la lista de oficios
            res.render('index', { oficios: results });
        }
    });
});

// RUTA 2: Agregar un nuevo oficio a la base de datos
app.post('/add', (req, res) => {
    const { numero_oficio, nombre, seccion, fecha, hash } = req.body;

    // Corregido: Se inserta en la tabla "oficio"
    const insertarRegistro = 'INSERT INTO oficio (nombre, seccion, fecha, hash) VALUES (?, ?, ?, ?)';

    db.query(insertarRegistro, [nombre, seccion, fecha, hash], (err, result) => {
        if (err) {
            console.error('No se pudo insertar el registro:', err);
        } else {
            res.redirect('/');
        }
    });
});

// RUTA 3: Mostrar el formulario para editar un oficio específico
app.get('/edit/:numero_oficio', (req, res) => {
    const { numero_oficio } = req.params;
    
    // Corregido: Se busca en la tabla "oficio"
    const buscarOficio = 'SELECT * FROM oficio WHERE numero_oficio = ?';

    db.query(buscarOficio, [numero_oficio], (err, results) => {
        if (err) {
            console.error('Error al buscar el oficio:', err);
            return res.send('Error en la base de datos');
        }
        if (results.length === 0) {
            return res.send('Oficio no encontrado');
        }
        // Se renderiza la vista 'edit.ejs' y se le pasa el objeto 'oficio'
        res.render('edit', { oficio: results[0] });
    });
});

// RUTA 4: Actualizar la información de un oficio en la base de datos
app.post('/update/:numero_oficio', (req, res) => {
    const { numero_oficio } = req.params;
    const { nombre, seccion, fecha } = req.body;

    // CORRECCIÓN 1: Se eliminó la coma extra antes de WHERE
    const actualizarOficio = 'UPDATE oficio SET nombre = ?, seccion = ?, fecha = ? WHERE numero_oficio = ?';

    // CORRECCIÓN 2: Se añadió la variable 'numero_oficio' a los parámetros de la consulta
    db.query(actualizarOficio, [nombre, seccion, fecha, numero_oficio], (err) => {
        if (err) {
            console.error("Error al actualizar el oficio:", err);
            res.send("Error al actualizar");
        } else {
            res.redirect('/');
        }
    });
});

// RUTA 5: Eliminar un oficio de la base de datos
app.get('/delete/:numero_oficio', (req, res) => { // Cambiado de :id a :numero_oficio
    const { numero_oficio } = req.params;
    
    // Cambiado de id a numero_oficio en la consulta
    const eliminarOficio = 'DELETE FROM oficio WHERE numero_oficio = ?'; 

    db.query(eliminarOficio, [numero_oficio], (err) => { // Pasando el parámetro correcto
        if (err) {
            console.error('Error al eliminar el registro:', err);
            res.send("Error al eliminar el oficio");
        } else {
            res.redirect('/');
        }
    });
});

module.exports = app;