# AK3-NGO-WEB

AK³ NGO is a web platform to help women/children-related grievances get registered, tracked, and resolved through coordinated roles (Admin, Sister-NGO, Police, and User).

---

## 1) Project Objective

Build a role-based grievance management system where:
- Victims/users can submit pleas (anonymously or as registered users),
- AK³ admin can assign and route cases,
- Sister NGOs and Police can process assigned cases,
- Users can track the status of their submitted pleas.

---

## 2) Core Features

### Public / Home
- NGO introduction and stakeholder overview
- Anonymous plea submission
- User registration
- Role-specific login entry points

### User
- Login with generated `usercode` + password
- Submit registered pleas
- View own submitted pleas
- View and update personal details

### Admin
- Login and access admin portal
- View pending/assigned pleas
- Accept, resolve, reject, or forward pleas to NGO/Police
- Delete eligible queries

### Sister-NGO & Police
- Role-specific login and protected portal
- View pending/assigned pleas
- Accept, resolve, reject, or forward pleas as workflow allows
- View/update personal details

### Backend/API
- JWT-based authentication and role checks
- User and Query persistence via MongoDB (Mongoose)
- Workflow/status tracking with query history

---

## 3) Repository Layout

```text
AK3-NGO-WEB/
├── README.md                     # Main project documentation (this file)
├── backend/                      # Node.js + Express + MongoDB API
│   ├── server.js
│   ├── routes/routes.js
│   ├── controllers/controllers.js
│   ├── models/
│   │   ├── User.js
│   │   └── Query.js
│   ├── config/mydb.js
│   ├── auth.js
│   └── package.json
├── ak3-ngo/                      # React frontend (main app)
│   ├── src/
│   │   ├── App.js
│   │   └── components/
│   ├── public/
│   └── package.json
└── frontend/                     # Legacy static HTML/CSS/JS prototype files
```

---

## 4) Screenshots / Image Placeholders

> Replace these with your actual screenshots once available.

### Home Page
![Home Page Placeholder](docs/images/home-page-placeholder.png)

### User Portal
![User Portal Placeholder](docs/images/user-portal-placeholder.png)

### Admin Portal
![Admin Portal Placeholder](docs/images/admin-portal-placeholder.png)

### NGO Portal
![NGO Portal Placeholder](docs/images/ngo-portal-placeholder.png)

### Police Portal
![Police Portal Placeholder](docs/images/police-portal-placeholder.png)

---

## 5) Step-by-Step Setup & Execution

## 5.1 Prerequisites

- Node.js (recommended v18+)
- npm
- MongoDB running locally on `mongodb://127.0.0.1:27017/ngo`

## 5.2 Clone and Open Project

```bash
git clone https://github.com/akhianil604/AK3-NGO-WEB.git
cd AK3-NGO-WEB
```

## 5.3 Backend Setup (Express API)

```bash
cd backend
npm install
```

Create `/backend/.env`:

```env
JWT_SECRET=your_strong_secret_here
```

Start backend server:

```bash
node server.js
```

Backend runs on:
- `http://localhost:5000`

## 5.4 Frontend Setup (React App)

Open a second terminal:

```bash
cd ak3-ngo
npm install
npm start
```

Frontend runs on:
- `http://localhost:3000`

---

## 6) API Notes

- API base: `http://localhost:5000/api`
- Example routes:
  - `POST /registerUser`
  - `POST /login`
  - `POST /newAnonQuery`
  - `POST /newRegisteredQuery` (auth required)
  - `GET /getPendingQueries` (auth required)
  - `POST /acceptQuery` (auth required)

> `registerUser` is a **POST** endpoint. Accessing `/api/registerUser` directly in a browser (GET request) returns `Cannot GET /api/registerUser`.

---

## 7) Build/Test Commands

### Frontend (`ak3-ngo`)
```bash
npm run build
CI=true npm test -- --watchAll=false
```

### Backend (`backend`)
```bash
npm test
```

> Current backend `npm test` script is a placeholder and exits with an error by default.
