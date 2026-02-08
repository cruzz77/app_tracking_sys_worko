# 🚀 Candidate Referral Management System

A full-stack MERN web application that simulates Worko’s internal referral workflow.

This project allows recruiters to:
- Refer candidates
- Upload resumes (.pdf)
- Track candidate status
- Manage referrals from a centralized dashboard
- View real-time stats

Built as part of the Full-Stack Internship Assignment.

---

## 🌟 Features

### 🔐 Authentication
- JWT based login/register
- Protected routes
- Persistent sessions

### 📊 Dashboard
- View all referred candidates
- Search by name / job title / status
- Status update (Pending → Reviewed → Hired)
- Delete candidate
- Live metrics:
  - Total
  - Pending
  - Reviewed
  - Hired

### 📝 Referral Form
- Add candidate details
- Upload resume (.pdf only)
- File validation
- Instant dashboard update

### 📁 Resume Handling
- Local file storage (uploads/)
- Ready for AWS S3 integration

### ⚡ UX
- Loading states
- Error boundaries
- Toast notifications
- Responsive UI
- Clean modern design

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router
- Context API
- Axios
- Tailwind CSS
- Lucide Icons

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Auth
- Multer (file uploads)

### Database
- MongoDB

### Optional / Bonus
- AWS S3 (resume storage)
- Deployment ready

---

## 📂 Project Structure

```
root
│
├── backend
│   ├── configs
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middlewares
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── routes
│   │   └── App.jsx
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone repo

```bash
git clone https://github.com/cruzz77/app_tracking_sys_worko
cd project
```

---

## 🖥 Backend Setup

```bash
cd backend
npm install
```

### Create `.env`

```
PORT=5090
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run backend

```bash
npm run dev
```

Server runs at:
```
http://localhost:5090
```

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
POST | /api/auth/register | Register user |
POST | /api/auth/login | Login user |
GET | /api/auth/profile | Get profile |

### Candidates
| Method | Endpoint | Description |
|----------|----------------------|----------------|
POST | /api/candidates | Add candidate |
GET | /api/candidates | Get all candidates |
PUT | /api/candidates/:id/status | Update status |
DELETE | /api/candidates/:id | Delete candidate |
GET | /api/candidates/stats | Get dashboard stats |

---

## 🧪 Testing

Use:
- Postman
- Browser UI

Example flow:
1. Register
2. Login
3. Add referral
4. Upload resume
5. Change status
6. Check stats update

---

## 📸 Screenshots

### Dashboard
(Add screenshot)

### Referral Form
(Add screenshot)

---

## 🔒 Validation Rules

- Email validated
- Phone validated
- Resume must be `.pdf`
- Auth required for all protected routes

---

## 🚀 Future Improvements

- AWS S3 resume storage
- Pagination
- Admin roles
- Analytics charts
- Deployment (Render/Vercel)
- Dark mode

---

## 🎯 Assignment Goals Achieved

✅ API integration  
✅ State management  
✅ CRUD operations  
✅ Authentication  
✅ File uploads  
✅ Error handling  
✅ Clean architecture  

---

## 👤 Author

Aditya Chopra  
Full Stack Developer  
GitHub: https://github.com/<your-username>

---

## 📜 License

This project is built for internship evaluation purposes.
