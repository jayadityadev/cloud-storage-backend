import express, { Router } from 'express';
import { handleClerkUserCreated } from '../controllers/user.controller';
import bodyParser from 'body-parser'
import { verifyClerkWebhook } from '../middlewares/verifyClerkWebhook';

const router = Router();

router.post(
  '/webhooks/clerk',
  express.raw({ type: 'application/json' }),
  verifyClerkWebhook,
  handleClerkUserCreated
)
  
export default router;
