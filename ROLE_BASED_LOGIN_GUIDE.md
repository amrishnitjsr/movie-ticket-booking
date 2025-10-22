# 🔐 Role-Based Login Implementation Guide

## 📋 **Current Setup Status**
✅ User model has `isAdmin` field (default: false)  
✅ Login redirects based on admin status  
✅ Admin panel checks for admin role  
✅ Registration form includes admin checkbox  

## 🚀 **Quick Start: Test Role-Based Login**

### **Method 1: Use Pre-created Demo Accounts**

1. **Start the MongoDB server** (if not running)
2. **Run the user seeder** to create demo accounts:
   ```bash
   cd server
   node seedUsers.js
   ```

3. **Login with these credentials:**

   **🔐 ADMIN LOGIN:**
   - Email: `admin@bookmymovie.com`
   - Password: `123456`
   - → Redirects to Admin Panel (`/admin`)

   **👤 USER LOGIN:**
   - Email: `john@example.com` 
   - Password: `123456`
   - → Redirects to Home Page (`/`)

### **Method 2: Register New Accounts**

1. **Go to Registration Page** (`/register`)
2. **Fill the form:**
   - Name: Your Name
   - Email: your-email@example.com
   - Password: yourpassword
   - ☑️ **Check "Register as Admin"** for admin account
   - ☐ **Leave unchecked** for regular user account
3. **Login with your new credentials**

## 🔄 **How the Role-Based Flow Works**

### **Login Process:**
```
1. User enters email/password
2. System validates credentials
3. System checks user.isAdmin field
4. If isAdmin = true → Redirect to /admin
5. If isAdmin = false → Redirect to /
```

### **Protection & Access:**
- **Admin Panel** (`/admin`): Only accessible by admin users
- **Home Page** (`/`): Accessible by all authenticated users
- **Non-admin users** trying to access `/admin` get error message

## 🛠 **Backend Implementation Details**

### **User Model** (`server/models/userModel.js`):
```javascript
isAdmin: {
    type: Boolean,
    required: true,
    default: false,  // New users are regular users by default
}
```

### **Login Route** (`server/routes/userRoute.js`):
The login already returns the JWT token that contains user info including admin status.

### **Frontend Login** (`client/src/pages/Login/index.jsx`):
```javascript
// After successful login
const userResponse = await GetCurrentUser();
if (userResponse.success && userResponse.data.isAdmin) {
  window.location.href = "/admin"; // Admin redirect
} else {
  window.location.href = "/"; // User redirect  
}
```

## 🎯 **Admin Panel Features**

When logging in as admin, you get access to:
- 📊 **Dashboard** with analytics
- 🎬 **Movie Management** (Add/Edit/Delete movies)
- 🏢 **Theatre Management** (Add/Edit/Delete theatres) 
- 📋 **Booking Management** (View/Cancel bookings)
- 👥 **User Management** (View/Block users)
- 💰 **Revenue Analytics** (Financial reports)

## 🔧 **Testing the System**

1. **Start both servers:**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm start

   # Terminal 2 - Frontend  
   cd client
   npm start
   ```

2. **Test Admin Login:**
   - Go to `http://localhost:3000/login`
   - Use admin credentials
   - Should redirect to admin dashboard

3. **Test User Login:**
   - Use regular user credentials  
   - Should redirect to home page
   - Try accessing `/admin` - should show access denied

## 🎨 **Customization Options**

### **Add More User Roles:**
You can extend the system to support multiple roles:
```javascript
// In userModel.js
role: {
    type: String,
    enum: ['user', 'admin', 'manager', 'owner'],
    default: 'user'
}
```

### **Role-Based Navigation:**
Update the navigation menu to show different options based on user role.

### **Advanced Permissions:**
Create middleware to check specific permissions for different admin actions.

## 🚨 **Important Notes**

1. **Default Password**: Demo accounts use `123456` - change in production
2. **Security**: Always hash passwords (already implemented with bcrypt)
3. **JWT Tokens**: Contain user info including admin status
4. **Database**: Make sure MongoDB is running before testing
5. **Environment**: Update database connection string as needed

## 📞 **Troubleshooting**

**Issue**: "Access denied. Admin privileges required."
- **Solution**: Make sure you're logged in with an admin account (isAdmin: true)

**Issue**: Login redirects to wrong page
- **Solution**: Check the `GetCurrentUser()` response and user.isAdmin value

**Issue**: Can't access admin panel
- **Solution**: Verify your user account has `isAdmin: true` in the database

---

**🎉 You now have a fully functional role-based authentication system!**