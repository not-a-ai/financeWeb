import { Router } from "express";
import { login, register } from './index.js'

const router = Router();

router.post('/login', async (req, res) => {
  const data = await login(req.body)
  res.status(200).json({ data });
});


router.post('/register', async (req, res) => {
  const data = await register(req.body);
  res.status(200).json({ data });
});



export default router;