const BASE_URL = 'http://localhost:5000/api'; // ou ton IP locale sur téléphone réel

export const sendOtpToPhone = async (phone: string) => {
  const response = await fetch(`${BASE_URL}/auth/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone })
  });

  const data = await response.json();
  return data;
};

export const verifyOtpFromPhone = async (phone: string, otp: string) => {
  const response = await fetch(`${BASE_URL}/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, otp })
  });

  const data = await response.json();
  return data;
};
export const deleteOtpFromPhone = async (phone: string, otp: string) => {
  const response = await fetch(`${BASE_URL}/auth/delete-otp`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, otp })
  });

  const data = await response.json();
  return data;
};