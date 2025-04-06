import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export const verifyClerkWebhook = (req: Request, res: Response, next: NextFunction) => {
  const signature = req.headers['clerk-signature'] as string;
  const rawBody = JSON.stringify(req.body);
  const secret = process.env.CLERK_WEBHOOK_SECRET!;

  const hash = crypto.createHmac('sha256', secret).update(rawBody).digest('base64');

  if (hash !== signature) {
    return res.status(403).send('Invalid webhook signature');
  }

  next();
};
