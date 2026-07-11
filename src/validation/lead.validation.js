import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createLeadSchema = z.object({
  body: z.object({
    buyerName: z.string().min(2, 'Buyer name must be at least 2 characters').trim(),
    buyerEmail: z.string().email('Invalid email address').toLowerCase().trim(),
    buyerPhone: z.string().trim().optional(),
    propertyId: z.string().regex(objectIdRegex, 'Invalid Property ID format'),
    budget: z.coerce.number().min(0, 'Budget must be positive').optional(),
    source: z.enum(['Website', 'Referral', 'Walk-in']).default('Website'),
  }),
});

export const updateLeadStatusSchema = z.object({
  body: z.object({
    status: z.enum(['New', 'Contacted', 'Site Visit', 'Negotiation', 'Closed']),
  }),
  params: z.object({
    id: z.string().regex(objectIdRegex, 'Invalid Lead ID format'),
  }),
});

export const updateLeadSchema = z.object({
  body: z.object({
    notes: z.string().trim().optional(),
    budget: z.coerce.number().min(0, 'Budget must be positive').optional(),
    nextFollowUp: z.preprocess((val) => {
      if (!val) return undefined;
      return new Date(val);
    }, z.date()).optional(),
  }),
  params: z.object({
    id: z.string().regex(objectIdRegex, 'Invalid Lead ID format'),
  }),
});
