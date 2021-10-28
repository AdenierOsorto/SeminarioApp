import express from 'express';
const router = express.Router();
import {register, login, isAuthenticated} from '../controllers/authController.js'

router.get('/', isAuthenticated,(req, res) =>{
    res.render('index');
});

router.get('/login',(req, res) =>{
    res.render('login');
});
router.get('/register',(req, res) =>{
    res.render('register');
});



//url
router.post('/register', register);
router.post('/login', login);
export default router;