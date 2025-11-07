# Complete Setup Guide - Notes App with MongoDB Backend

This guide will walk you through setting up the complete Notes app on your PC with MongoDB backend.

## 📋 Prerequisites

Before starting, install these on your PC:
1. **Node.js** (v18 or higher) - https://nodejs.org/
2. **Git** - https://git-scm.com/
3. **MongoDB** - https://www.mongodb.com/try/download/community
4. **Visual Studio Code** - https://code.visualstudio.com/

## 🚀 Part 1: Export Code from Lovable

### Step 1: Export to GitHub
1. Click the **Share** button in Lovable (top right)
2. Click **"Publish to GitHub"**
3. Choose a repository name (e.g., "notes-app-mongodb")
4. Click **"Create Repository"**
5. Wait for the export to complete

### Step 2: Clone to Your PC
1. Open **Git Bash** or **Command Prompt**
2. Navigate to where you want the project:
   ```bash
   cd C:\Users\YourName\Documents
   ```
3. Clone the repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/notes-app-mongodb.git
   cd notes-app-mongodb
   ```

## 🗄️ Part 2: Set Up MongoDB

### Option A: Install MongoDB Locally (Recommended for Development)

1. **Download and Install MongoDB:**
   - Go to https://www.mongodb.com/try/download/community
   - Download MongoDB Community Server
   - Run installer and follow defaults
   - Install as a Windows Service

2. **Verify MongoDB is Running:**
   ```bash
   # Check if MongoDB service is running
   net start | findstr MongoDB
   ```

3. **Your MongoDB connection string will be:**
   ```
   mongodb://localhost:27017/notesapp
   ```

### Option B: Use MongoDB Atlas (Cloud - Free)

1. **Create Account:**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for free account

2. **Create Cluster:**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select your region
   - Click "Create Cluster"

3. **Set Up Access:**
   - Click "Database Access" → "Add New Database User"
   - Create username and password (save these!)
   - Give user "Read and write to any database" permission
   
4. **Whitelist Your IP:**
   - Click "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)

5. **Get Connection String:**
   - Click "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

## ⚙️ Part 3: Set Up Backend

### Step 1: Configure Backend Environment

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Create `.env` file:**
   ```bash
   copy .env.example .env
   ```

3. **Edit `.env` file** (use Notepad or VS Code):
   ```env
   # For Local MongoDB:
   MONGODB_URI=mongodb://localhost:27017/notesapp
   
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/notesapp
   
   JWT_SECRET=your-super-secret-random-key-change-this-now
   PORT=5000
   NODE_ENV=development
   ```
   
   **⚠️ IMPORTANT:** Change `JWT_SECRET` to a random string!

### Step 2: Install Backend Dependencies

```bash
npm install
```

### Step 3: Start Backend Server

```bash
# For development (with auto-reload):
npm run dev

# OR for production:
npm start
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

**Keep this terminal open!** The backend must keep running.

## 🎨 Part 4: Set Up Frontend

### Step 1: Open New Terminal

1. In VS Code: **Terminal → New Terminal**
2. Navigate to frontend root (from backend folder):
   ```bash
   cd ..
   ```

### Step 2: Install Frontend Dependencies

```bash
npm install
```

### Step 3: Configure Frontend Environment

The `.env` file should already exist with:
```env
VITE_API_URL=http://localhost:5000
```

### Step 4: Start Frontend

```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## 🎉 Part 5: Use Your App

1. **Open Browser:**
   - Go to http://localhost:5173/

2. **Create Account:**
   - Click "Sign Up"
   - Enter name, email, and password
   - Click "Create Account"

3. **Start Creating Notes!**
   - Click "New Note"
   - Write your first note
   - Click "Save"

## 🛠️ Troubleshooting

### Backend won't start

**Error: "MongoDB connection error"**
- **Solution:** Check MongoDB is running:
  ```bash
  # Windows:
  net start MongoDB
  
  # Check if port 27017 is in use:
  netstat -ano | findstr :27017
  ```

**Error: "Port 5000 already in use"**
- **Solution:** Change port in backend `.env`:
  ```env
  PORT=5001
  ```
  Then update frontend `.env`:
  ```env
  VITE_API_URL=http://localhost:5001
  ```

### Frontend won't start

**Error: "ELIFECYCLE Command failed"**
- **Solution:** Delete node_modules and reinstall:
  ```bash
  rm -rf node_modules
  npm install
  ```

### Can't create account

**Error: "Network request failed"**
- **Solution:** 
  1. Check backend is running (see terminal)
  2. Verify backend URL in frontend `.env`
  3. Check browser console for errors (F12)

### Database is empty after restart

- **Solution:** This is normal! MongoDB stores data in `/data/db`
- For MongoDB Atlas, data persists automatically

## 📁 Project Structure

```
notes-app-mongodb/
├── backend/                 # Node.js + Express + MongoDB
│   ├── models/             # Mongoose models (User, Note)
│   ├── routes/             # API routes (auth, notes, profile)
│   ├── middleware/         # Authentication middleware
│   ├── server.js           # Main server file
│   ├── .env                # Backend configuration
│   └── package.json        # Backend dependencies
│
├── src/                    # React frontend
│   ├── components/         # UI components
│   ├── contexts/           # React contexts (Auth)
│   ├── lib/                # API client
│   ├── pages/              # Pages (Landing, Auth, Dashboard, Profile)
│   └── App.tsx             # Main app component
│
├── .env                    # Frontend configuration
└── package.json            # Frontend dependencies
```

## 🔐 Security Notes

### For Development:
- JWT_SECRET in `.env` is fine
- "Allow Access from Anywhere" in MongoDB Atlas is OK

### For Production:
- Use strong JWT_SECRET (generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- Whitelist only your server IP in MongoDB Atlas
- Use HTTPS
- Set NODE_ENV=production

## 📝 Useful Commands

### Backend Commands
```bash
cd backend
npm run dev          # Start with auto-reload
npm start            # Start production server
npm install          # Install dependencies
```

### Frontend Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### MongoDB Commands
```bash
# Windows - Start MongoDB
net start MongoDB

# Windows - Stop MongoDB
net stop MongoDB

# Check MongoDB logs
mongod --version
```

## 🎯 Next Steps

Now that your app is running:

1. **Customize it:**
   - Update colors in `src/index.css`
   - Add new features in components
   - Modify API endpoints in `backend/routes/`

2. **Deploy it:**
   - Frontend: Vercel, Netlify
   - Backend: Heroku, Railway, Render
   - Database: MongoDB Atlas (already cloud!)

3. **Learn more:**
   - Express.js: https://expressjs.com/
   - MongoDB: https://www.mongodb.com/docs/
   - React: https://react.dev/

## 📞 Need Help?

If you encounter issues:
1. Check both terminals for error messages
2. Verify all `.env` files are configured
3. Make sure MongoDB is running
4. Check Node.js version: `node --version` (should be v18+)

---

**Congratulations! 🎊** You now have a fully functional Notes app with MongoDB backend running on your PC!
