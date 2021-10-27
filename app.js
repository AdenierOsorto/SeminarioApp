// Nos permite configurar las variables 

import './loadEnv.js';
import express from 'express';
import router  from './routes/routes.js';
import session from 'express-session';
// puerto deonde esucha express
const port = 11000;

// Aplicacion (server) de express
const app = express();

//definir el sistema de vistas (plantillas) a utilizar
app.set('view engine','pug');

//configurar el manejo de sessiones en la app

const oneDay = 54 * 60 * 60 * 1000;

app.use(session({
    secret: process.env.SESSION_SECRET
    
}))


// Definir la ubicación de los archivos publicos
app.use(express.static('public'));

// configuracion para procesar los formularios
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//Routers
app.use('/', router);




// servidor de express escuchando en el puerto
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});