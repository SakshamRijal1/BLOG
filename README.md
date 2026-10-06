# 📝 Modern MERN Blog Platform

A modern full-stack blogging platform built with the **MERN stack**.  
Users can register, log in with email/password or Google, create and read blog posts, manage their profiles, and switch between light and dark themes.

---

## 🚀 Features

### 🔐 Authentication
- User registration with email and password
- User login with email and password
- Google OAuth 2.0 authentication
- JWT-based authentication
- Secure password handling
- Persistent login using Local Storage

### 📝 Blog System
- Create blog posts
- View all blog posts
- View individual blog posts
- Author information
- Blog images
- Post details and timestamps

### 👤 User Profile
- User profile page
- Display name
- Email address
- Profile image
- User's blog posts

### 🎨 UI & Theme
- Modern responsive UI
- Light mode
- Dark mode
- Global theme management
- Responsive design for desktop and mobile
- Lucide icons

### ⚡ Frontend
- React
- Vite
- React Router
- Tailwind CSS
- Lucide React
- Context API

### 🔧 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js
- Google OAuth 2.0
- JSON Web Token (JWT)
- CORS

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| Vite | Development/build tool |
| React Router | Client-side routing |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| Context API | Global theme state |

## Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Backend framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| Passport.js | Authentication |
| Passport Google OAuth 2.0 | Google login |
| JWT | Authentication tokens |
| CORS | Cross-origin requests |

---

# 📂 Project Structure

```text
blog/
│
├── client/
│   ├── public/
│   │
│   └── src/
│       ├── components/
│       │   └── Navbar.jsx
│       │
│       ├── context/
│       │   └── ThemeContext.jsx
│       │
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── CreatePost.jsx
│       │   ├── PostDetails.jsx
│       │   ├── Profile.jsx
│       │   └── GoogleSuccess.jsx
│       │
│       ├── api.js
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── server/
│   ├── config/
│   │   ├── db.js
│   │   └── passport.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── postController.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── postRoutes.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md