import {app} from './src/app.js';
import { connectDB } from './src/config/db.js';
// import 'dotenv/config';

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});