import crypto from 'crypto';

export const generateToken = () => crypto.randomBytes(20).toString('hex');
