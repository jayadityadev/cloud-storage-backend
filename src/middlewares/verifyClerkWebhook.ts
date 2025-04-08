// src/middlewares/verifyClerkWebhook.ts

import { Request, Response, NextFunction } from 'express'
import { Webhook } from 'svix'
import { WebhookEvent } from '@clerk/backend'

export const verifyClerkWebhook = (req: Request, res: Response, next: NextFunction) => {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env')
  }

  const headers = req.headers
  const payload = req.body.toString()

  const svix_id = headers['svix-id'] as string
  const svix_timestamp = headers['svix-timestamp'] as string
  const svix_signature = headers['svix-signature'] as string

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({
      success: false,
      message: 'Missing Svix signature headers',
    })
  }

  const wh = new Webhook(SIGNING_SECRET)

  let evt
  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })

    ;(req as any).clerkEvent = evt
    
    next()
  } catch (err: any) {
    console.error('Webhook verification failed:', err.message)
    return res.status(400).json({
      success: false,
      message: 'Invalid webhook signature',
    })
  }
}
