A lightweight real-time message submission and retrieval system built using **Node.js**, **Express**, **MongoDB**, **Socket.io**, and **JWT authentication**.

---

## 📦 Features

- User Registration & Login with JWT authentication
- Real-time messaging using Socket.IO
- MongoDB for message and user persistence
- Joi validation for secure input

---

## ⚙️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (local or Atlas)
- **Real-time:** Socket.IO
- **Authentication:** JWT
- **Validation:** JOI

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Aswinn3/policy-insure-livechat
cd policy-insure-livechat
```

### 2. Install dependencies

```bash
npm install
```


### 3. Run the application

```bash
node server.js
```

The server will start on `http://localhost:3000`.

---

## 📬 API Endpoints

### 🔐 Auth

| Method | Endpoint         | Description            |
|--------|------------------|------------------------|
| POST   | `/auth/register` | Register new user      |
| POST   | `/auth/login`    | Login and get JWT token|

### 💬 Messages

| Method | Endpoint     | Description                   |
|--------|--------------|-------------------------------|
| GET    | `/messages`  | Get last 50 messages          |
| POST   | `/messages`  | Send new message (JWT needed) |

> All message routes require a valid JWT in the `Authorization` header as `Bearer <token>`.

---

## ⚡ Socket.IO Events

- Connect to: `ws://localhost:3000`
- Event: `new_message` (sent to all connected clients when a new message is posted)

---

