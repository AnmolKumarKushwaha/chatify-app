# chatify-app
MERN Project

<h1 align="center">✨ Full-Stack Chat App with Auth & Emails ✨</h1>

![Demo App](/frontend/public/screenshot-for-readme.png)

Highlights:

- 🔐 Custom JWT Authentication (no 3rd-party auth)
- ⚡ Real-time Messaging via Socket.io
- 🟢 Online/Offline Presence Indicators
- 🔔 Notification & Typing Sounds (with toggle)
- 📨 Welcome Emails on Signup (Resend)
- 🗂️ Image Uploads (Cloudinary)
- 🧰 REST API with Node.js & Express
- 🧱 MongoDB for Data Persistence
- 🚦 API Rate-Limiting powered by Arcjet
- 🎨 Beautiful UI with React, Tailwind CSS & DaisyUI
- 🧠 Zustand for State Management
- 🧑‍💻 Git & GitHub Workflow (branches, PRs, merges)
- 🚀 Easy Deployment (free-tier friendly with Sevalla)

---

## 🧪 .env Setup

### Backend (`/backend`)

```bash
PORT=3000
MONGO_URI=your_mongo_uri_here

NODE_ENV=development

JWT_SECRET=your_jwt_secret

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_email_from_address
EMAIL_FROM_NAME=your_email_from_name

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

---

## 🔧 Run the Backend

```bash
cd backend
npm install
npm run dev
```

## 💻 Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

        # FOR DETAILED EXPLANATION 


# 💬 Chatify – Real-Time Full-Stack Chat Application

Chatify is a **modern, real-time messaging application** built from scratch using the **MERN stack**.  
It focuses on **performance, security, scalability, and clean UI/UX**, making it a production-ready chat platform.

The application supports **real-time communication**, **media sharing**, **presence tracking**, and **secure authentication** — all implemented without third-party auth providers.

---

##  Key Features

- 🔐 **Custom JWT Authentication**  
  Secure login and signup system implemented using JSON Web Tokens without external auth services.

- ⚡ **Real-Time Messaging**  
  Instant message delivery powered by **Socket.io**.

- 🟢 **Online / Offline Presence**  
  Real-time user presence indicators.

- ✍️ **Typing Indicators & Notification Sounds**  
  Typing status visibility and sound notifications with user-controlled toggles.

- 🖼️ **Image Sharing**  
  Send images along with text messages, delivered instantly in real time.

- 👤 **Profile Management**  
  Update profile details and change profile pictures dynamically.

- 📩 **Welcome Emails**  
  Automated welcome emails sent on successful signup using **Resend**.

- 🗂️ **Cloud Image Storage**  
  Image uploads handled securely via **Cloudinary**.

- 🚦 **API Rate Limiting**  
  Backend APIs protected using **Arcjet** to prevent abuse and spam.

---

## 🧰 Tech Stack

### 🖥️ Frontend
- **React**
- **Tailwind CSS**
- **DaisyUI**
- **Zustand** (state management)

### 🛠️ Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **JWT Authentication**
- **Socket.io**

### ☁️ Services & Tools
- **Cloudinary** – image uploads and storage
- **Resend** – transactional emails
- **Arcjet** – rate limiting and security
- **Git & GitHub** – version control (branches, PRs, merges)
- **Render** – deployment with auto-deploy on every commit

---

##  Architecture Overview

- RESTful APIs for authentication, users, and messages  
- WebSockets for real-time messaging and presence updates  
- Secure token-based authentication using JWT  
- Centralized global state management with Zustand  
- Reusable and optimized UI components  

---

##  Deployment

The application is deployed on **Render**, using free-tier friendly services with:

- ✅ Auto-deployment on every GitHub commit  
- ✅ Environment-based configuration  
- ✅ Production-ready build setup  

---

##  Why This Project?

This project demonstrates:

- Real-time system design  
- Secure authentication flows  
- Media handling at scale  
- Clean and modern frontend architecture  
- Production-grade backend APIs  
- Practical GitHub workflow and collaboration practices  

It goes beyond basic CRUD applications and reflects **industry-level full-stack development**.

---

##  Contributions

Contributions, suggestions, and improvements are welcome.  
Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the **MIT License**.
