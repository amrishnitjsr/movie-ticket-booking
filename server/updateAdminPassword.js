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

// Update admin password
const updateAdminPassword = async () => {
  try {
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Update the admin user password
    const result = await User.updateOne(
      { email: 'admin@bookmymovie.com' },
      { password: hashedPassword }
    );

    if (result.modifiedCount > 0) {
      console.log('✅ Admin password updated successfully!');
      console.log('📝 Login Credentials:');
      console.log('=====================');
      console.log('🔐 ADMIN LOGIN:');
      console.log('  Email: admin@bookmymovie.com');
      console.log('  Password: password123');
      console.log('=====================');
    } else {
      console.log('⚠️ Admin user not found or password already up to date');
    }

  } catch (error) {
    console.error('Error updating admin password:', error);
  }
};

// Run the updater
const runUpdater = async () => {
  await connectDB();
  await updateAdminPassword();
  mongoose.connection.close();
  console.log('📱 Database connection closed');
  process.exit(0);
};

runUpdater();