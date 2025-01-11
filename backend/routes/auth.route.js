import express from 'express';

import { signupController} from '../controller/auth.controller.js';


const router = express.Router();

router.post('/signup', signupController);
router.post('/login', loginController);