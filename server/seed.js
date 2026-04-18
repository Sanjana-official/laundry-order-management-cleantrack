/**
 * server/seed.js
 * Seeds the database with a default admin user + sample orders.
 * Run: node server/seed.js
 */

require('dotenv').config();

const mongoose  = require('mongoose');
const connectDB = require('./db');
const User      = require('./models/User');
const Order     = require('./models/Order');

const PRICES = Order.GARMENT_PRICES || {
  'Shirt': 40, 'Pants': 50, 'Saree': 120, 'Suit/Blazer': 180,
  'Kurta': 60, 'Jacket': 150, 'Bedsheet': 100, 'Curtain': 80,
  'Sweater': 90, 'T-Shirt': 35,
};

async function seed() {
  await connectDB();

  console.log('🌱  Seeding database...');

  // Clear existing data
  await User.deleteMany({});
  await Order.deleteMany({});

  // Create admin user
  const admin = await User.create({
    name:     'sanjana',
    email:    'sanjana879@gmail.com',
    password: '1qaz2wsx',
    role:     'admin',
  });

  // Create staff user
  const staff = await User.create({
    name:     'Staff User',
    email:    'staff@cleantrack.com',
    password: 'staff123',
    role:     'staff',
  });

  console.log('👤  Users created:');
  console.log('    sanjana879@gmail.com / 1qaz2wsx  (role: admin)');
  console.log('    staff@cleantrack.com / staff123  (role: staff)');

  // Sample orders
  const now  = new Date();
  const day  = 86400000;

  const sampleOrders = [
    {
      customerName:      'Rahul Gupta',
      phone:             '9812345670',
      garments:          [{ name: 'Shirt', qty: 3, price: PRICES['Shirt'] }, { name: 'Pants', qty: 2, price: PRICES['Pants'] }],
      status:            'DELIVERED',
      estimatedDelivery: new Date(now - 2 * day),
      notes:             'Extra starch on shirts',
      createdBy:         staff._id,
    },
    {
      customerName:      'Priya Sharma',
      phone:             '9876500001',
      garments:          [{ name: 'Saree', qty: 2, price: PRICES['Saree'] }, { name: 'Kurta', qty: 1, price: PRICES['Kurta'] }],
      status:            'READY',
      estimatedDelivery: new Date(now + 1 * day),
      notes:             '',
      createdBy:         staff._id,
    },
    {
      customerName:      'Amit Singh',
      phone:             '9011223344',
      garments:          [{ name: 'Suit/Blazer', qty: 1, price: PRICES['Suit/Blazer'] }, { name: 'Shirt', qty: 2, price: PRICES['Shirt'] }],
      status:            'PROCESSING',
      estimatedDelivery: new Date(now + 2 * day),
      notes:             'Handle with care — expensive fabric',
      createdBy:         admin._id,
    },
    {
      customerName:      'Sunita Verma',
      phone:             '9988776655',
      garments:          [{ name: 'Bedsheet', qty: 2, price: PRICES['Bedsheet'] }, { name: 'Curtain', qty: 1, price: PRICES['Curtain'] }],
      status:            'RECEIVED',
      estimatedDelivery: new Date(now + 3 * day),
      notes:             '',
      createdBy:         staff._id,
    },
    {
      customerName:      'Vikram Patel',
      phone:             '9765432100',
      garments:          [{ name: 'Jacket', qty: 1, price: PRICES['Jacket'] }, { name: 'Sweater', qty: 2, price: PRICES['Sweater'] }],
      status:            'PROCESSING',
      estimatedDelivery: new Date(now + 2 * day),
      notes:             'Dry clean only',
      createdBy:         staff._id,
    },
  ];

  // Use create() which triggers the pre-save hook (orderId + total)
  const created = await Order.create(sampleOrders);
  console.log(`📦  ${created.length} sample orders created`);

  console.log('\n✅  Seed complete! You can now run: npm start');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});