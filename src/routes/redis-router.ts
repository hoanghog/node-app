import express from 'express';
import RedisService from '../services/redis-service';

import { Request, Response, NextFunction } from 'express';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  await RedisService.create(req.body);
  return res.sendStatus(200);
});

router.get('/:key', async (req: Request, res: Response) => {
  const result = await RedisService.get(req.params.key);
  return res.json(result);
});


export default router;
