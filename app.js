// Nos permite configurar las variables 

import './loadEnv.js';
import express from 'express';
import router  from './routes/routes.js';
// puerto deonde esucha express
const port = 11000;

// Aplicacion (server) de express
const app = express();

//definir el sistema de vistas (plantillas) a utilizar
app.set('view engine','pug');


// Definir la ubicación de los archivos publicos
app.use(express.static('public'));

//Routers
app.use('/', router);



// servidor de express escuchando en el puerto
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});