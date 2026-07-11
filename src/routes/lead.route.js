import { Router } from 'express';
import {
  createLead,
  getLeads,
  updateLeadStatus,
  updateLead,
} from '../controllers/lead.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  createLeadSchema,
  updateLeadStatusSchema,
  updateLeadSchema,
} from '../validation/lead.validation.js';

const router = Router();

// ==========================================
// PUBLIC ROUTES
// ==========================================
router.post('/', validate(createLeadSchema), createLead);

// ==========================================
// PROTECTED ROUTES (Agent & Admin)
// ==========================================
router.get('/', protect, authorize('agent', 'admin'), getLeads);
router.patch('/:id/status', protect, authorize('agent', 'admin'), validate(updateLeadStatusSchema), updateLeadStatus);
router.patch('/:id', protect, authorize('agent', 'admin'), validate(updateLeadSchema), updateLead);

export default router;
