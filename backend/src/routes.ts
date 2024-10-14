import express from 'express';
import * as AccountController from './controllers/accountController';

const router = express.Router();

router.post('/accounts', AccountController.createAccount);
router.get('/accounts', AccountController.getAccount);
router.post('/deposit', AccountController.deposit);
router.post('/withdraw', AccountController.withdraw);
router.post('/transfer', AccountController.transfer);
router.get('/logs', AccountController.getLogs);

export default router;
