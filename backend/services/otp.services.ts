import Otp from '../models/otp.model';

export const generateOtp = async (phone: string): Promise<string> => {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  await Otp.create({ phone, otp });
  return otp;
};

export const verifyOtp = async (phone: string, otp: string): Promise<boolean> => {
  const found = await Otp.findOne({ phone, otp });
  return !!found;
};
export const deleteOtp = async (phone: string, otp: string): Promise<void> => {
  await Otp.deleteOne({ phone, otp });
}