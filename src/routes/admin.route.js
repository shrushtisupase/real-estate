import { Router } from 'express';
import {
  getAgents,
  verifyAgent,
  getRevenue,
} from '../controllers/admin.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { z } from 'zod';

const router = Router();

const verifyAgentSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Agent ID format'),
  }),
});

// All routes here are restricted to Admin
router.use(protect, authorize('admin'));

router.get('/agents', getAgents);
router.patch('/agents/:id/verify', validate(verifyAgentSchema), verifyAgent);
router.get('/revenue', getRevenue);

export default router;
