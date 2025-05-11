import { Router, Request, Response } from 'express';
import { deleteOtp, generateOtp, verifyOtp } from '../services/otp.services';
import { sendOtp } from '../utils/sendOtp';
import dotenv from 'dotenv';

const router = Router();

router.get('/send-otp', async (req: Request, res: Response) => {
    try {
        const { phone } = req.body;
        if (!phone) return res.status(400).json({ message: 'Numéro requis' });

        const otp = await generateOtp(phone);
        await sendOtp(phone, otp);
        res.json({ success: true, message: 'OTP envoyé' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi de l\'OTP' });
    }
});

router.post('/verify-otp', async (req: Request, res: Response) => {
    try {
        const { phone, otp } = req.body;
        const valid = await verifyOtp(phone, otp);
        res.json({ valid });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur lors de la vérification de l\'OTP' });
    }
});

router.delete('/delete-otp', async (req: Request, res: Response) => {
    try {
        const { phone, otp } = req.body;
        await deleteOtp(phone, otp);
        res.json({ success: true, message: 'OTP supprimé' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur lors de la suppression de l\'OTP' });
    }
});

export default router;
