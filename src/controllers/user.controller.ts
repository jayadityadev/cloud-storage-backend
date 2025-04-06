import { Request, Response } from 'express';
import { User } from '../models/user.model';

export const handleClerkUserCreated = async (req: Request, res: Response) => {
  const { id, email_addresses, first_name, last_name } = req.body.data;

  const email = email_addresses?.[0]?.email_address;

  try {
    const existing = await User.findOne({ clerkId: id });
    if (existing) return res.status(200).send('User already exists');

    const user = new User({
      clerkId: id,
      email,
      fullName: `${first_name || ''} ${last_name || ''}`.trim(),
    });

    await user.save();
    res.status(201).json({ message: 'User created in MongoDB' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
