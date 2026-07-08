import express from 'express';
import authRoutes from './routes/auth.route.js';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount Routes
// app.use('/api/v1/health', healthRoutes);
app.use('/auth', authRoutes);

// You will add other routes here later:
// app.use('/api/v1/properties', propertyRoutes);
// app.use('/api/v1/leads', leadRoutes);

export default app;