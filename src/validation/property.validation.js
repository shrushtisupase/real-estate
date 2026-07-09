import { z } from 'zod';

export const createPropertySchema = z.object({
  body: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').trim(),
    description: z.string().min(20, 'Description is too short').trim(),
    
    // Coerced fields to handle FormData strings
    price: z.coerce.number().min(1, 'Price must be greater than 0'),
    propertyType: z.enum(['Apartment', 'Villa', 'Plot', 'Commercial']),
    status: z.enum(['Available', 'Reserved', 'Sold']).default('Available'),
    bedrooms: z.coerce.number().min(0).default(0),
    bathrooms: z.coerce.number().min(0).default(0),
    area: z.coerce.number().min(0).default(0),
    
    location: z.object({
      address: z.string().min(5, 'Address is required').trim(),
      lat: z.coerce.number().optional(),
      lng: z.coerce.number().optional(),
    }),
    
    amenities: z.array(z.string()).optional(),
  }),
});

export const updatePropertySchema = z.object({
  body: z.object({
    title: z.string().trim().optional(),
    description: z.string().trim().optional(),
    price: z.coerce.number().min(1).optional(),
    status: z.enum(['Available', 'Reserved', 'Sold']).optional(),
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Property ID format'),
  }),
});