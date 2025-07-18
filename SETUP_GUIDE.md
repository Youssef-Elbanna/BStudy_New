# B - Study Platform Setup Guide

## 🚀 Quick Start

This guide will help you set up and run the B - Study platform with both the website frontend and admin interface.

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- A modern web browser

## 🏗️ Project Structure

```
platforms-course-manasty-master/
├── server/                 # Backend API server
│   ├── simple-server.js    # Main server file
│   ├── routes/            # API routes
│   ├── models/            # Database models
│   └── package.json       # Dependencies
├── website/               # Main website frontend
│   ├── landingNew.html    # Landing page
│   ├── dashboard-*.html   # User dashboard pages
│   ├── styles/           # CSS files
│   └── javascript/       # Frontend JavaScript
├── admin/                 # Admin interface
│   ├── login.html         # Admin login
│   ├── dashboard-admin.html # Admin dashboard
│   └── assets/           # Admin assets
└── asseds/               # Shared assets (images, etc.)
```

## 🔧 Installation & Setup

### 1. Install Dependencies

```bash
# Navigate to server directory
cd server

# Install backend dependencies
npm install
```

### 2. Environment Configuration

Create a `.env` file in the server directory:

```bash
# In server directory
echo "MONGODB_URI=mongodb://localhost:27017/b-study" > .env
echo "PORT=3000" >> .env
echo "NODE_ENV=development" >> .env
echo "JWT_SECRET=your-secret-key-here" >> .env
```

## 🚀 Running the Application

### Option 1: Run Everything at Once (Recommended)

Open **3 separate terminal windows** and run these commands:

#### Terminal 1 - Backend Server
```bash
cd server
node simple-server.js
```
**Expected output:**
```
🚀 B - Study Simple Server started successfully
📡 Server running on port 3000
🔗 API URL: http://localhost:3000/api
```

#### Terminal 2 - Website Frontend
```bash
cd website
npx http-server -p 8000
```
**Expected output:**
```
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8000
  http://192.168.x.x:8000
```

#### Terminal 3 - Admin Interface
```bash
cd admin
npx http-server -p 8001
```
**Expected output:**
```
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8001
  http://192.168.x.x:8001
```

### Option 2: Run with PowerShell (Windows)

```powershell
# Terminal 1 - Backend
cd server; node simple-server.js

# Terminal 2 - Website
cd website; npx http-server -p 8000

# Terminal 3 - Admin
cd admin; npx http-server -p 8001
```

## 🌐 Accessing the Application

### Website (User Interface)
- **URL:** http://localhost:8000
- **Main Page:** http://localhost:8000/landingNew.html
- **Dashboard:** http://localhost:8000/dashboard-allcourses.html

### Admin Interface
- **URL:** http://localhost:8001
- **Login:** http://localhost:8001/login.html
- **Dashboard:** http://localhost:8001/dashboard-admin.html

### API Endpoints
- **Health Check:** http://localhost:3000/api/health
- **API Info:** http://localhost:3000/api
- **Courses:** http://localhost:3000/api/courses

## 🔐 Admin Login Credentials

**Email:** admin@bstudy.com  
**Password:** password

## 📊 Available Features

### Website (User Interface)
- ✅ Landing page with course listings
- ✅ Course browsing and filtering
- ✅ User dashboard
- ✅ Responsive design
- ✅ Arabic RTL support

### Admin Interface
- ✅ Secure login system
- ✅ Dashboard with statistics
- ✅ Course management
- ✅ User management
- ✅ Real-time data updates

### Backend API
- ✅ RESTful API endpoints
- ✅ CORS configuration
- ✅ Error handling
- ✅ Mock data for testing
- ✅ Admin authentication

## 🔧 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Check what's using the port
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

#### 2. Node.js Not Found
```bash
# Install Node.js from https://nodejs.org/
# Then verify installation
node --version
npm --version
```

#### 3. Dependencies Not Installed
```bash
cd server
npm install
```

#### 4. CORS Issues
The server is configured to allow requests from:
- http://localhost:8000
- http://localhost:8002
- http://127.0.0.1:8000

### Testing the Setup

1. **Test Backend:**
   ```bash
   curl http://localhost:3000/api/health
   ```

2. **Test Website:**
   - Open http://localhost:8000
   - Should see the landing page

3. **Test Admin:**
   - Open http://localhost:8001/login.html
   - Login with admin credentials
   - Should redirect to dashboard

## 📁 File Locations

### Key Files
- **Backend Server:** `server/simple-server.js`
- **Admin Routes:** `server/routes/admin.js`
- **Website Landing:** `website/landingNew.html`
- **Admin Login:** `admin/login.html`
- **Admin Dashboard:** `admin/dashboard-admin.html`

### JavaScript Files
- **Admin Auth:** `admin/assets/js/admin-auth.js`
- **Admin Dashboard:** `admin/assets/js/admin-dashboard.js`
- **Website Courses:** `website/javascript/courses.js`

## 🎯 Next Steps

1. **Database Integration:** Connect to MongoDB for persistent data
2. **User Authentication:** Implement user registration and login
3. **File Upload:** Add course image upload functionality
4. **Payment Integration:** Add payment processing
5. **Email Notifications:** Implement email system
6. **Mobile App:** Develop mobile application

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all ports are available
3. Ensure all dependencies are installed
4. Check the network connectivity

## 🎉 Success Indicators

✅ All three servers running without errors  
✅ Website loads at http://localhost:8000  
✅ Admin login works at http://localhost:8001  
✅ API responds at http://localhost:3000/api/health  
✅ Course data displays on website  
✅ Admin dashboard shows statistics  

**Congratulations! Your B - Study platform is now running successfully! 🎉** 