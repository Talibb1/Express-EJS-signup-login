import express from 'express';
const router = express.Router();
import userController from '../controller/userController.js'


router.get('/', userController.home);

router.get('/login', userController.login);

router.post('/login', userController.findUser);

router.get('/register', userController.register);

router.post('/register', userController.createUser);


export default router // new patern ES6
