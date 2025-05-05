import express from 'express';
import { requestOtp, validateOtp } from '../controllers/auth.controller';

const router = express.Router();

router.post('/otp/request', requestOtp);
router.post('/otp/verify', validateOtp);

export default router;
