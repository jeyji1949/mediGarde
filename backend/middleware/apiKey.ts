import { Request, Response, NextFunction } from 'express';

export default function apiKeyMiddleware(req: Request, res: Response, next: NextFunction) {
  const clientKey = req.query.apiKey;

  if (clientKey !== process.env.API_KEY) {
    return res.status(401).json({ message: 'Clé API invalide' });
  }

  next();
}
