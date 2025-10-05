# 🚀 User Management System with AI Insights

A full-stack application with AI-generated user bios, built with React, Node.js, Express, and MongoDB.

---

## 📁 Project Structure

```
user-management-system/
│
├── backend/
│   ├── controllers/
│   │   └── userController.js      # Request handlers
│   ├── models/
│   │   └── User.js                 # MongoDB schema
│   ├── routes/
│   │   └── userRoutes.js           # API routes
│   ├── services/
│   │   └── aiService.js            # AI bio generation
│   ├── .env                        # Environment variables
│   ├── server.js                   # Entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── UserManagementDashboard.js
    │   │   ├── UserTable.js
    │   │   ├── SearchFilters.js
    │   │   └── UserModal.js
    │   ├── services/
    │   │   └── api.js              # API calls
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── tailwind.config.js
    └── package.json

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm

## 🎯 Features

### ✅ User Management
- Create new users with name, email, role, and status
- View all users in a responsive table
- Edit existing user information
- Delete users with confirmation
- Real-time data updates

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Request/Response Examples

**POST /api/users**
```json
{
  "name": "Ankit Mishra",
  "email": "ankit@example.com",
  "role": "Developer",
  "status": "active"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Ankit Mishra",
  "email": "ankit@example.com",
  "role": "Developer",
  "status": "active",
  "bio": "Ankit is a detail-oriented software developer...",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

## 🧪 Testing the Application

1. **Start MongoDB** (if using local installation)

2. **Start Backend:**
```bash
cd backend
npm run dev
```

3. **Start Frontend** (new terminal):
```bash
cd frontend
npm start
```

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/usermanagement
HUGGINGFACE_API_KEY=hf_...               # Optional
```

### Frontend (.env.local) - Optional
```env
REACT_APP_API_URL=https://ai-user-management-system.onrender.com/api/users
````

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- For MongoDB Atlas, whitelist your IP
