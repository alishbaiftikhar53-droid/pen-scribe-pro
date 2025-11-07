# Notes App Backend

MongoDB + Express backend for the Notes application.

## Setup Instructions

### 1. Install MongoDB

**Option A: Install MongoDB Locally**
- Download from https://www.mongodb.com/try/download/community
- Install and start MongoDB service

**Option B: Use MongoDB Atlas (Cloud)**
- Create free account at https://www.mongodb.com/cloud/atlas
- Create a cluster and get connection string

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the backend folder:

```bash
cp .env.example .env
```

Edit `.env` and update:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Change to a random secure string
- `PORT`: Backend port (default: 5000)

### 4. Start the Backend

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Backend will run on http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/signin` - Login
- `GET /api/auth/me` - Get current user (requires auth)

### Notes
- `GET /api/notes` - Get all user notes (requires auth)
- `POST /api/notes` - Create note (requires auth)
- `PUT /api/notes/:id` - Update note (requires auth)
- `DELETE /api/notes/:id` - Delete note (requires auth)

### Profile
- `GET /api/profile` - Get user profile (requires auth)
- `PUT /api/profile` - Update profile (requires auth)

## Frontend Configuration

Update frontend `.env` file:
```
VITE_API_URL=http://localhost:5000
```

## Testing

Test the backend is running:
```bash
curl http://localhost:5000/api/health
```

You should see: `{"status":"ok","message":"Backend is running"}`
