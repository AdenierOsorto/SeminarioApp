import express from 'express';
const router = express.Router();
import {register, login, isAuthenticated, logout} from '../controllers/authController.js'

router.get('/', isAuthenticated,(req, res) =>{
    res.render('index', {user: req.session.user});
});

router.get('/login',(req, res) =>{
    res.render('login');
});

router.get('/logout', logout);

router.get('/register',(req, res) =>{
    res.render('register');
});



//url
router.post('/register', register);
router.post('/login', login);
export default router;