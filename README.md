# 🔖 LinkSaver - Personal Bookmark Manager

A full-stack web application for saving and managing bookmarks with AI-powered summaries and metadata extraction.

![LinkSaver](https://img.shields.io/badge/LinkSaver-v1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18+-61DAFB.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg)

## 🌐 Live Demo

**[🚀 Try LinkSaver Live](https://linksaver-app.netlify.app)**

_Experience the full functionality with the live working application!_

## ✨ Features

- 🔐 **User Authentication** - Secure login/register with JWT
- 📚 **Bookmark Management** - Save, view, and delete bookmarks
- 🤖 **AI Summaries** - Automatic content summarization powered by Jina AI
- 🌙 **Dark/Light Mode** - Toggle between themes
- 📱 **Responsive Design** - Works on all devices
- 🔍 **Metadata Extraction** - Automatic title, favicon, and description
- ⚡ **Fast & Modern** - Built with Vite and optimized performance

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI Framework
- **React Router DOM** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP Client
- **React Toastify** - Notifications
- **Vite** - Build Tool

### Backend

- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MongoDB Atlas** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password Hashing
- **Cheerio** - Web Scraping
- **CORS** - Cross-Origin Resource Sharing

## 📁 Project Structure

```
link-saver-app/
├── client/                    # Frontend React app
│   ├── public/
│   ├── src/
│   │   ├── Auth/             # Authentication components
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── components/       # Reusable components
│   │   │   ├── Header.jsx
│   │   │   ├── BookmarkForm.jsx
│   │   │   ├── BookmarkCard.jsx
│   │   │   ├── BookmarksList.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/           # Page components
│   │   │   └── Bookmarks.jsx
│   │   ├── assets/          # Static assets
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── server/                   # Backend Express app
│   ├── config/
│   │   └── db.js            # Database connection
│   ├── controllers/
│   │   ├── authController.js
│   │   └── bookmarkController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── error.js
│   ├── models/
│   │   ├── User.js
│   │   └── Bookmark.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── bookmark.js
│   │   └── index.js
│   ├── utils/
│   │   ├── asyncHandler.js
│   │   ├── jinaAi.js
│   │   ├── jwt.js
│   │   ├── responseHandler.js
│   │   └── urlMetadata.js
│   ├── server.js            # Entry point
│   ├── package.json
│   └── .env                 # Environment variables
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sai-Vivek-Varma/LinkSaver-App.git
   cd LinkSaver-App
   ```

2. **Setup Backend**

   ```bash
   cd server
   npm install
   ```

3. **Setup Frontend**

   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**

   **Server (.env in /server directory):**

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   ```

5. **Start the application**

   **Backend (Terminal 1):**

   ```bash
   cd server
   npm run dev
   ```

   **Frontend (Terminal 2):**

   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**

   **Local Development:**

   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

   **Live Application:**

   - Frontend: https://linksaver-app.netlify.app/
   - Backend API: https://linksaver-backend-oy1p.onrender.com

## 📡 API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login

### Bookmarks

- `GET /api/v1/bookmarks` - Get all user bookmarks
- `POST /api/v1/bookmarks` - Create new bookmark
- `DELETE /api/v1/bookmarks/:id` - Delete bookmark

## 🎨 Features Overview

### User Authentication

- Secure registration and login system
- JWT-based authentication
- Protected routes
- Password hashing with bcryptjs

### Bookmark Management

- Add bookmarks with URL validation
- Automatic metadata extraction (title, favicon, description)
- AI-powered content summarization
- Auto-generated tags
- Delete bookmarks
- Responsive bookmark cards

### UI/UX

- Modern, clean interface
- Dark/Light mode toggle
- Responsive design for all devices
- Loading states and error handling
- Toast notifications
- Smooth animations and transitions

## 🛡️ Security Features

- JWT authentication
- Password hashing
- CORS protection
- Input validation
- Error handling middleware
- Protected API routes

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:

- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🚀 Deployment

### Frontend (Vercel/Netlify)

1. Build the client:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `dist` folder

### Backend (Heroku/Railway/Render)

1. Set environment variables on your hosting platform
2. Deploy the server directory

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Sai Vivek Varma**

- GitHub: [@Sai-Vivek-Varma](https://github.com/Sai-Vivek-Varma)

---

⭐ Star this repository if you found it helpful!
