import express from 'express';
import authRoutes from './routes/auth.route.js';
import propertyRoutes from './routes/property.route.js'
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/auth', authRoutes);
app.use('/properties', propertyRoutes);


export default app;