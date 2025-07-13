inna

# Full-Stack-Developer-Assessment-Senuri
Role based online learning platform developed with MERN Stack technology
# Online Learning Platform – MERN Stack Learning Platform with GPT Integration

Online Learning Platform is a full-featured online learning platform built with the *MERN stack* and enhanced with *ChatGPT integration*. It allows students to discover and enroll in courses while enabling instructors to manage content and track enrollments. Students can also get personalized course suggestions using OpenAI's GPT API.

---

## 📚 Features

### 👨‍🎓 Students
- 🔐 Register/Login
- 📘 View all available courses
- ✅ Enroll in courses
- 🧾 Track enrolled courses


### 👩‍🏫 Instructors
- 🔐 Register/Login
- ➕ Create new courses
- ✏ Edit or delete existing courses
- 📋 View enrolled students per course
- 📊 Dashboard with statistics

## ⚙ Project Setup

### 🔧 1. Clone the Repository

```bash
https://github.com/himara1027/Online-Learning-Platform-with-Chat-GPT-Integration-Senuri.git
# Backend
cd server
npm install

# Frontend
cd ../client
npm install

# server/.env
PORT=5000
MONGO_URI= mongodb+srv://senurihimasha68:0327Senu@cluster27.hstrxvi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster27
JWT_SECRET=mysupersecretkey123

#to run Backend
cd server
node server.js
#to run frontend
cd client
npm start
