import cnn from '../database/connection.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {promisify} from 'util';
var session;
export const  register  = async (req, res) => {
    const {fullname, username, password} = req.body;

    // cifar la contrasena
    const hash = await bcryptjs.hash(password,8);

    //contruir la data que sera insertada;
    const data = {
        username: username,
        password: hash,
        fullname: fullname
    };

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

export const login = async (req, res) => {
    const {username, password} = req.body;

    // const hash = await bcryptjs.hash(password, 8);
    if(!username || !password){
        res.render('login');
        return;
    }

    // query a la base de datos, para saber si exiiste el usuario
    cnn.query("select * from users where username = ?",[username], async (err,result)=>{
        
        if(result.length === 0 || !(await bcryptjs.compare(password, result[0].password))){
            res.render('login');
            return;
        }

        const id = result[0].id;
        const token = jwt.sign({id: id}, process.env.JWT_SECRET);
        //guardar en la sesión el token generado
        session = req.session;
        session.token = token;

        // el user y password son correctos, podemos continuar
        res.render('/');
    });
    // console.log(username, password);
}
// creando un middleware para proteger las URL que necesitan inicio de sesion
export const isAuthenticated = async (req, res, next) =>{
    if(req.session.token){
        //validar que el token le pertenezca al usuario
        const verifyPromise = await promisify(jwt.verify);
        const decoded = await verifyPromise(req.session.token, process.env.JWT_SECRET)
        
        // decoded {id: id del user en base de datos}

        //consultar en la base de datos si el usuario que se decodific del token, existe.
        cnn.query('SELECT * FROM users WHERE id = ?', decoded.id, (err, result) => {
            if(result.length === 0 || err){
                return res.redirect('/login');
            }
            // el usuario existe
            session = req.session;
            session.user = result[0];
            console.log(result);
        });

        next();
    }else{
        // el token no exite, por tanto, no se ha iniciado sesion
        return res.redirect('/login')
    }
};

export const logout = (req, res) =>{
    req.session.destroy();

}
export const logger = (req, res, next)=>{
    console.log(req.path, req.method);
    next();
};