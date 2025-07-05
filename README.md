# MERN Stack Todo List App (with MySQL)

A simple, full-stack Todo List application using React (frontend), Node.js/Express (backend), and MySQL (database).

## 🚀 Features
- Add, edit, and mark todos as completed
- View all incomplete todos in a table
- Marking a todo as completed hides it from the main list (soft delete)
- Responsive design using Bootstrap
- MySQL database for persistent storage

## 🛠️ Tech Stack
### Frontend
- React 16
- React Router DOM 4
- Axios
- Bootstrap 4

### Backend
- Node.js
- Express.js
- MySQL (using `mysql2` package)
- CORS
- Body-parser

## 📁 Project Structure
```
MERN-Stack-Todo-List-App-master/
├── client/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── create-todo.component.js
│   │   │   ├── edit-todo.component.js
│   │   │   └── todos-list.component.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── backend/          # Node.js backend
│   ├── server.js
│   ├── package.json
│   └── todo.model.js (legacy, not used)
└── README.md
```

## ⚙️ Installation & Setup
### Prerequisites
- Node.js (v16 or higher recommended)
- MySQL

### 1. Clone the Repository
```sh
git clone <repository-url>
cd MERN-Stack-Todo-List-App-master
```

### 2. Install Dependencies
```sh
# Backend
cd backend
npm install

# Frontend
cd ../client
npm install
```

### 3. Database Setup
- Create a MySQL database named `todo_app`
- Create the `todos` table:
```sql
CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  todo_description VARCHAR(255) NOT NULL,
  todo_responsible VARCHAR(255) NOT NULL,
  todo_priority VARCHAR(50) NOT NULL,
  todo_completed BOOLEAN DEFAULT FALSE
);
```

### 4. Start the Application
- Start MySQL server
- Start backend:
  ```sh
  cd backend
  node server.js
  ```
- Start frontend:
  ```sh
  cd ../client
  npm start
  ```

## 🗄️ API Endpoints
- `GET /todos` - List all todos
- `POST /todos/add` - Add a new todo
- `GET /todos/:id` - Get a single todo
- `POST /todos/update/:id` - Update a todo
- `DELETE /todos/delete/:id` - Mark a todo as completed (soft delete)

## 🎨 Customization
- Edit Bootstrap styles in `client/src/index.css`
- Change backend DB credentials in `backend/server.js`

## 📄 License
This project is licensed under the MIT License. See the LICENSE file for details. 