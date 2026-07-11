import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB } from './src/config/db.js';
import User from './src/models/user.model.js';

async function seedAdmin() {
  console.log('🔄 Connecting to Database...');
  await connectDB();

  try {
    const adminEmail = 'admin@meridian.com';
    const adminPassword = 'adminpassword';

    // Delete existing to ensure clean seed with updated password
    await User.deleteOne({ email: adminEmail });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Create Admin
    const admin = await User.create({
      name: 'System Admin',
      email: adminEmail,
      password: hashedPassword,
      phone: '1234567890',
      role: 'admin',
      isVerified: true,
    });

    console.log('✅ Admin user seeded successfully!');
    console.log(`📧 Email: ${admin.email}`);
    console.log(`🔑 Password: ${adminPassword}`);
  } catch (error) {
    console.error('❌ Seeding failed with error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from Database.');
  }
}

seedAdmin();
