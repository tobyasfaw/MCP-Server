import type { Request, Response, NextFunction } from 'express';
import { config } from '../config.js';

export function requireApiKey(req: Request, res: Response, next: NextFunction) {
  const key = req.header('x-api-key');
  if (!key || key !== config.apiKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

export function requireOrg(req: Request, res: Response, next: NextFunction) {
  if (config.orgAllowlist.length === 0) return next();
  const email = (req.header('x-user-email') || '').toLowerCase();
  const domain = email.split('@')[1];
  if (!domain || !config.orgAllowlist.includes(domain)) {
    return res.status(403).json({ error: 'Forbidden: org not allowed' });
  }
  next();
}
