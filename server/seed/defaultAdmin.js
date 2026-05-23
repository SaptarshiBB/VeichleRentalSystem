import { usingMemoryStore } from '../config/database.js';
import User from '../models/User.js';
import { createUser, findUserByEmail } from '../data/store.js';

const normalizeEmail = (email) => email.trim().toLowerCase();

export const seedDefaultAdmin = async () => {
  const email = process.env.DEFAULT_ADMIN_EMAIL;
  const password = process.env.DEFAULT_ADMIN_PASSWORD;

  if (!email || !password) {
    return;
  }

  const adminData = {
    name: process.env.DEFAULT_ADMIN_NAME || 'Admin User',
    email: normalizeEmail(email),
    password,
    phone: process.env.DEFAULT_ADMIN_PHONE || '9999999999',
    role: 'admin'
  };

  if (usingMemoryStore()) {
    if (!findUserByEmail(adminData.email)) {
      await createUser(adminData);
      console.log(`Seeded default admin user: ${adminData.email}`);
    }
    return;
  }

  const existingAdmin = await User.findOne({ email: adminData.email }).select('+password');

  if (existingAdmin) {
    existingAdmin.name = adminData.name;
    existingAdmin.phone = adminData.phone;
    existingAdmin.role = 'admin';
    existingAdmin.password = adminData.password;
    await existingAdmin.save();
    console.log(`Updated default admin user: ${adminData.email}`);
    return;
  }

  await User.create(adminData);
  console.log(`Seeded default admin user: ${adminData.email}`);
};
