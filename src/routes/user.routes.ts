import express, { Router } from 'express';
import { handleClerkUserCreated } from '../controllers/user.controller';
import { verifyClerkWebhook } from '../middlewares/verifyClerkWebhook';

const router = Router();

router.post('/webhooks/clerk', express.json({ type: '*/*' }), verifyClerkWebhook, handleClerkUserCreated);

export default router;
