import { Router } from "express";
import { get, getAll, remove, save, update } from "./index.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

router.get('/',authMiddleware, async (req, res) => {
  const data = await getAll(req.user.id);
  res.status(200).json({ data });
});

router.get('/:id',authMiddleware, async (req, res) => {
  const data = await get(req.params.id, req.user.id);
  res.status(200).json({ data });
});

router.post('/',authMiddleware, async (req, res) => {
  req.body.user_id = req.user.id
  const data = await save(req.body);
  res.status(200).json({ data });
});

router.put('/:id',authMiddleware, async (req, res) => {
  req.body.user_id = req.user.id
  const data = await update(req.params.id, req.body, req.user.id);
  res.status(200).json({ data });
});

router.delete('/:id',authMiddleware, async (req, res) => {
  const data = await remove(req.params.id,req.body.user_id = req.user.id);
  res.status(200).json({ data });
});



export default router;