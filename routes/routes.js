import express from 'express';
const router = express.Router();
import {register, login} from '../controllers/authController.js'

router.get('/',(req, res) =>{
    res.render('index');
});

router.get('/register',(req, res) =>{
    res.render('register');
});

router.get('/login',(req, res) =>{
    res.render('login');
});


//url
router.post('/register', register);
router.post('/login', login);
export default router;