const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/bookmymovie', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// Sample users data
const seedUsers = async () => {
  try {
    // Clear existing users (optional - remove this if you want to keep existing users)
    // await User.deleteMany({});
    // console.log('Existing users cleared');

    // Hash password for all users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const users = [
      // Admin Users
      {
        name: 'Admin User',
        email: 'admin@bookmymovie.com',
        password: hashedPassword,
        isAdmin: true
      },
      {
        name: 'Super Admin',
        email: 'superadmin@bookmymovie.com', 
        password: hashedPassword,
        isAdmin: true
      },
      // Regular Users
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
        isAdmin: false
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: hashedPassword,
        isAdmin: false
      },
      {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        password: hashedPassword,
        isAdmin: false
      }
    ];

    // Insert users one by one to handle duplicates
    for (const userData of users) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        const user = new User(userData);
        await user.save();
        console.log(`✅ Created ${userData.isAdmin ? 'Admin' : 'User'}: ${userData.name} (${userData.email})`);
      } else {
        console.log(`⚠️  User already exists: ${userData.email}`);
      }
    }

    console.log('\n🎉 User seeding completed!');
    console.log('\n📝 Login Credentials:');
    console.log('=====================');
    console.log('🔐 ADMIN ACCOUNTS:');
    console.log('  Email: admin@bookmymovie.com');
    console.log('  Email: superadmin@bookmymovie.com');
    console.log('  Password: password123');
    console.log('');
    console.log('👤 USER ACCOUNTS:'); 
    console.log('  Email: john@example.com');
    console.log('  Email: jane@example.com');
    console.log('  Email: mike@example.com');
    console.log('  Password: password123');
    console.log('=====================');

  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

// Run the seeder
const runSeeder = async () => {
  await connectDB();
  await seedUsers();
  mongoose.connection.close();
  console.log('📱 Database connection closed');
  process.exit(0);
};

runSeeder();