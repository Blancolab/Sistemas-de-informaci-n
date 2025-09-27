const express = require("express");
const bodyParser = require('body-parser');
const db = require('./DB/db');//Llama a db.js para la conexion a la base de datos
const rutas = require('./routes/rutas');//Llama a routes.js para las rutas de la aplicacion



//Instanciar express
const app = express();
const port = 3005;//SERVIDOR


//manejar peticiones por medio de la url usando POST y por medio de url
app.use(bodyParser.urlencoded({extended:false}));


//configuracion de plantillas
app.set('view engine','ejs');

//rutas
app.use('/',rutas);

//Para nviar los archivos estaticos de la carpeta public, para las vistas
app.use(express.static('public'));


//Iniciar el servidor
app.listen(port,()=>{
    console.log(`http://127.0.0.1:${port}`);
});