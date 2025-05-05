import { Request, Response } from 'express';
import { generateOtp, verifyOtp } from '../services/otp.services';
import { sendOtp } from '../utils/sendOtp';

export const requestOtp = async (req: Request, res: Response) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: 'Numéro requis' });
  
    const otp = await generateOtp(phone);
    await sendOtp(phone, otp);
    res.status(200).json({ message: 'OTP envoyé' });
  };
  
  export const validateOtp = async (req: Request, res: Response) => {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ message: 'Téléphone et OTP requis' });
  
    const valid = await verifyOtp(phone, otp);
    if (valid) return res.status(200).json({ message: 'OTP valide' });
  
    res.status(400).json({ message: 'OTP invalide' });
  };
  

