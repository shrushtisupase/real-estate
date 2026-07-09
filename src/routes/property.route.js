import { Router } from 'express';
import {
  getProperties,
  getPropertyById,
  createProperty,
} from '../controllers/property.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createPropertySchema } from '../validation/property.validation.js';
import { upload } from '../middlewares/multer.middleware.js'; // Imported Multer configuration

const router = Router();

// ==========================================
// PUBLIC ROUTES
// ==========================================
router.get('/', getProperties);
router.get('/:id', getPropertyById);

// ==========================================
// PROTECTED ROUTES
// ==========================================
// Only Agents and Admins can create listings
router.post(
  '/',
  protect,
  authorize('agent', 'admin'),
  // Multer intercepts multipart/form-data here before validation
  upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'documents', maxCount: 5 }
  ]),
  validate(createPropertySchema),
  createProperty
);

export default router;