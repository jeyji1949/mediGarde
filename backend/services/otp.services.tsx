import Otp from '../models/otp.model';
import crypto from 'crypto';

export const generateOtp = async (phone: string): Promise<string> => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await Otp.create({ phone, otp });
  return otp;
};

export const verifyOtp = async (phone: string, enteredOtp: string): Promise<boolean> => {
  const record = await Otp.findOne({ phone, otp: enteredOtp });
  return !!record;
};
