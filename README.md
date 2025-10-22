# Movie Ticket Booking

A full-stack web application for movie ticket booking built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🎬 Features

### User Features
- **User Authentication**: Register, login, and secure user sessions
- **Browse Movies**: View available movies with details
- **Theatre Selection**: Choose from available theatres and showtimes
- **Seat Booking**: Interactive seat selection and booking
- **Booking History**: View past and upcoming bookings
- **Profile Management**: Update user profile information

### Admin Features
- **Movie Management**: Add, edit, and delete movies
- **Theatre Management**: Manage theatre information and seating
- **Show Management**: Create and manage movie shows and timings
- **User Management**: View and manage user accounts

### Theatre Owner Features
- **Theatre Registration**: Register and manage theatre details
- **Show Scheduling**: Create shows for movies
- **Booking Analytics**: View booking statistics and reports

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Redux Toolkit for state management
- Ant Design (antd) for UI components
- React Router for navigation
- Axios for API calls
- Moment.js for date handling

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcrypt.js for password hashing
- dotenv for environment variables

## 📋 Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/amrishnitjsr/movie-ticket-booking.git
cd movie-ticket-booking
```

### 2. Install server dependencies
```bash
npm install
```

### 3. Install client dependencies
```bash
cd client
npm install
cd ..
```

### 4. Environment Configuration
Create a `.env` file in the root directory with the following variables:
```env
mongo_url=mongodb://localhost:27017/bookmymovie
jwt_secret=your_jwt_secret_key_here
PORT=5000
```

**Note:** Replace `your_jwt_secret_key_here` with a secure secret key.

### 5. Database Setup
- Make sure MongoDB is running on your system
- The application will automatically create the database and collections

## 🎯 Running the Application

### Start the Backend Server
```bash
npm start
```
The server will start on `http://localhost:5000`

### Start the Frontend Development Server
```bash
cd client
npm start
```
The React app will start on `http://localhost:3000`

## 📁 Project Structure

```
movie-ticket-booking/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── redux/         # Redux store and slices
│   │   ├── apicalls/      # API service functions
│   │   └── stylesheets/   # CSS files
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Database configuration
│   ├── middlewares/      # Custom middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   └── server.js        # Entry point
├── .env                 # Environment variables
├── package.json        # Server dependencies
└── README.md
```

## 🔐 Default Users

The application includes seed data for testing:

**Admin User:**
- Email: admin@bookmymovie.com
- Password: admin123

**Regular User:**
- Email: user@bookmymovie.com  
- Password: user123

## 🌐 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/get-current-user` - Get current user info

### Movies
- `GET /api/movies/get-all-movies` - Get all movies
- `POST /api/movies/add-movie` - Add new movie (Admin only)
- `PUT /api/movies/update-movie` - Update movie (Admin only)
- `DELETE /api/movies/delete-movie` - Delete movie (Admin only)

### Theatres
- `GET /api/theatres/get-all-theatres` - Get all theatres
- `POST /api/theatres/add-theatre` - Add new theatre
- `PUT /api/theatres/update-theatre` - Update theatre
- `DELETE /api/theatres/delete-theatre` - Delete theatre

## 🎨 UI Components

The application uses Ant Design components for a consistent and professional look:
- Forms and inputs
- Tables and data display
- Navigation and layout
- Buttons and actions
- Modals and overlays

## 🔧 Development

### Available Scripts

In the root directory:
- `npm start` - Start the backend server
- `npm test` - Run tests (placeholder)

In the client directory:
- `npm start` - Start React development server
- `npm build` - Build for production
- `npm test` - Run React tests

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Ensure MongoDB connection is configured
3. Deploy the root directory

### Frontend Deployment
1. Build the React app: `cd client && npm run build`
2. Deploy the `client/build` folder to a static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Amrish**
- GitHub: [@amrishnitjsr](https://github.com/amrishnitjsr)

## 🙏 Acknowledgments

- Thanks to the MERN stack community for excellent documentation
- Ant Design team for the beautiful UI components
- MongoDB team for the robust database solution

---

⭐ Star this repository if you found it helpful!
