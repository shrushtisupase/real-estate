# 🏠 Meridian — Real Estate SaaS Platform

[![React](https://img.shields.io/badge/Frontend-React%2019-61dafb?logo=react&logoColor=black)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2F%20Express-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20%2F%20Mongoose-47a248?logo=mongodb&logoColor=white)](https://mongodb.com)
[![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)

A high-performance, full-stack real estate SaaS featuring dynamic property listings, blueprint inspector utilities, an agent Kanban lead management pipeline, and an administrative metrics dashboard.

🌐 **Live Application:** [Meridian Web Interface](https://real-estate-shru.vercel.app)

> [!NOTE]
> The backend server is hosted on the Render Free Tier. It may take 50–60 seconds to spin up and load the initial database inventory during your first request.

---

## 🏗️ Architectural Core Features

### 1. Unified Listing Directory
* **Blueprint Inspector**: Browse houses with clean layouts, dimensions, type structures, and spec filters.
* **Smart Search**: Filter by property type, min-bed counts, keywords, and availability status.

### 2. Multi-Role Workspace Portals
* **Agent Kanban Pipeline**: A fully interactive kanban board to drag, drop, and progress leads from *Pending* ➔ *Contacted* ➔ *Reserved* ➔ *Won* ➔ *Lost*. Agents can create listings and upload images directly to Cloudinary.
* **Admin dashboard**: Features revenue insights, total closed sales statistics, and verified agent controls.

### 3. Automated Core Services
* **Lead Assigning**: Cron-jobs periodically assign new inquiries to verified agents.
* **Email dispatch**: Mail notifications alert users on registration and status alterations.

---

## 🔑 Seeded Credentials

You can log in directly as the System Administrator using the seeded profile below to access verified analytics panels and verification controls:

* **Role**: System Administrator
* **Email Address**: `admin@meridian.com`
* **Password**: `adminpassword`

---

## 🛠️ The Tech Stack

### Frontend Client
* **React 19 & React Router 7**: Core structure and declarative layout engine.
* **Zustand**: Single-source-of-truth state management for authorization, property logs, and lead states.
* **TailwindCSS**: Architectural drafting design aesthetic utilizing high-contrast paper backdrops (`#F4F4F0`) and blueprint blue outlines (`#1A4789`).
* **Lucide Icons**: SVG structural iconography.

### Backend Engine
* **Node.js & Express**: Event-driven RESTful API endpoints.
* **MongoDB & Mongoose**: Structured document database schema.
* **Multer & Cloudinary**: Dynamic multipart image uploads.
* **Bcrypt.js & JWT**: Secure session tokens and encrypted password storage.
* **Node-Cron**: Background thread scheduler for system tasks.

---

## 🚀 Local Development Setup

Follow these steps to run the application locally on your machine:

### 1. Clone the project and configure environment keys
Create a `.env` file in the root directory:

```env
# Server Config
PORT=5000
NODE_ENV=development

# Database Config
MONGO_URI=your_mongodb_connection_string

# Auth Config
JWT_SECRET=your_jwt_signing_key
JWT_EXPIRE=30d

# Cloudinary Integration (Image Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Mail Services
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_mailtrap_user
SMTP_PASS=your_mailtrap_password
SMTP_FROM=noreply@realestatesaas.com

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 2. Install dependencies
Run npm install in both root and frontend folders:
```bash
# Install root (backend) dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Seed the Admin user
```bash
node seed_admin.js
```

### 4. Boot development environments
Run the concurrent task runner from the root folder to boot both servers simultaneously:
```bash
npm run dev
```
* **Frontend client** opens on: `http://localhost:5173`
* **Backend API** opens on: `http://localhost:5000`

---

## ✒️ Author
Developed by **[Shrushti Supase](https://github.com/shrushtisupase)**. 

Find me on [LinkedIn](https://linkedin.com/in/shrushtisupase) / [GitHub](https://github.com/shrushtisupase) at `@shrushtisupase`.
