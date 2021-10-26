import cnn from '../database/connection.js';
import bcryptjs from 'bcryptjs';
export const  register  = async (req, res) => {
    const {fullname, username, password} = req.body;

    // cifar la contrasena
    const hash = await bcryptjs.hash(password,8);

    //contruir la data que sera insertada;
    const data = {
        username: username,
        password: hash,
        fullname: fullname
    }

    // construir el query 
    // consultas preparadas
    cnn.query('INSERT INTO users SET ?', data, (err, result)=>{
        if(err){
            console.log(`ocurrio un error al insertar el registro`);
            return;
        }
        res.redirect('/')
    });
}

export const login = (req, res) => {
    
}