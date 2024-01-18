import { Router } from "express";
import { get, getAll, remove, save, update } from "./index.js";

const router = Router();

router.get('/', async (_, res) => {
  const data = await getAll();
  res.status(200).json({ data });
});

router.get('/:id', async (req, res) => {
  const data = await get(req.params.id);
  res.status(200).json({ data });
});

router.post('/', async (req, res) => {
  const data = await save(req.body);
  res.status(200).json({ data });
});

router.put('/:id', async (req, res) => {
  const data = await update(req.params.id, req.body);
  res.status(200).json({ data });
});

router.delete('/:id', async (req, res) => {
  const data = await remove(req.params.id);
  res.status(200).json({ data });
});



export default router;