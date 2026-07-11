import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import propertyRoutes from './routes/property.route.js';
import leadRoutes from './routes/lead.route.js';
import adminRoutes from './routes/admin.route.js';

export const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/auth', authRoutes);
app.use('/properties', propertyRoutes);
app.use('/leads', leadRoutes);
app.use('/admin', adminRoutes);


export default app;