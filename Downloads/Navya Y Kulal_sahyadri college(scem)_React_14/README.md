# Book Management Fullstack App (React + Node.js + MySQL)

This is a fullstack book management application with role-based access control (RBAC).

## 📁 Folder Structure

```
bookapp_fullstack/
├── backend/         # Node.js + Express + MySQL backend
├── frontend/        # React frontend
```

---

## ⚙️ Backend Setup (Node.js + Express)

### 1. Install Dependencies

```bash
cd backend
npm install express mysql2 bcrypt jsonwebtoken dotenv
```

### 2. Setup Database

Import the `bookapp_schema.sql` into your XAMPP MySQL server using phpMyAdmin or CLI:

```sql
CREATE DATABASE bookapp;
-- Then import tables from bookapp_schema.sql
```

### 3. Configure Environment

Edit `.env` file in `backend`:

```
DB_USER=root
DB_PASS=      # leave blank if no password
DB_NAME=bookapp
JWT_SECRET=supersecretkey
```

### 4. Run Server

```bash
node server.js
```

---

## ⚛️ Frontend Setup (React)

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start the App

```bash
npm start
```

The React app will run on [http://localhost:3000](http://localhost:3000)

---

## 🔐 Authentication & Roles

- Users register/login to get a JWT token.
- Roles: `admin` or `user`.
- `admin`: Can create, view, delete books.
- `user`: Can only view books.

---

## ✅ Test Users (create via SQL if needed)

```sql
INSERT INTO users (name, email, password, role)
VALUES ('Admin', 'admin@example.com', '$2b$10$YOUR_HASHED_PASS', 'admin');
```

Use bcrypt to hash passwords.

---

## 📄 API Endpoints Summary

| Method | Endpoint       | Access     | Description          |
|--------|----------------|------------|----------------------|
| POST   | /api/auth/register | Public | Register new user     |
| POST   | /api/auth/login    | Public | Login + JWT token     |
| GET    | /api/books         | Auth   | View all books        |
| POST   | /api/books         | Admin  | Add new book          |
| DELETE | /api/books/:id     | Admin  | Delete a book         |

---

## ✅ Final Notes

- Backend runs on port **5000**
- React runs on port **3000**
- Ensure CORS is enabled in the backend
- Token stored in `localStorage`, sent in `Authorization` headers

---

Made for educational/demo use.
