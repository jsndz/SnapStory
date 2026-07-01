# SnapStory 📸✍️

SnapStory is a modern, high-performance, full-stack blogging platform. It allows users to write articles, organize them with tags, upload cover images, search blogs, paginate through posts, and interact using threaded comments. Built on a robust architecture, SnapStory uses Redis for database caching and MongoDB for persistence, with JWT authentication securing resources.

---

## 🚀 Key Features

- **Robust User Authentication & Authorization**:
  - Secure registration and login.
  - Password hashing with Bcrypt.
  - JSON Web Tokens (JWT) for secure, stateless API authorization.
  - Role-based permissions (`admin` vs. `user`).
- **Comprehensive Blog Management**:
  - Create, read, update, and search blog posts.
  - Image cover association.
  - Real-time search by keywords.
  - High-performance paginated post retrieval.
- **Interactive Discussion System**:
  - Threaded comment system linked to blog posts.
- **Dynamic Tagging System**:
  - Categorize stories with unique tags.
  - Filter and retrieve blogs by association.
- **Performance & Security Layers**:
  - Redis-based caching middleware to accelerate frequent read requests.
  - Express Validator schema validations to sanitize and reject bad request bodies.
  - Logger integration using Morgan.
- **Dockerized Services**:
  - Multi-container architecture orchestrating Frontend, Backend, MongoDB, and Redis.

---

## 🛠️ Tech Stack

### Frontend
- **Core**: React 19, Vite, TypeScript.
- **Styling**: TailwindCSS 4.
- **Routing**: React Router DOM.
- **HTTP client**: Axios.
- **Icons**: Lucide React.
- **Utility**: `jwt-decode` for decoding payload data.

### Backend
- **Core**: Node.js, Express (ES Modules).
- **ORM / Database**: Mongoose (MongoDB).
- **Caching**: Redis (Node Redis Client).
- **Authentication**: JWT (`jsonwebtoken`), Bcrypt.
- **Middleware**: Express Validator, Cors, Body-parser, Morgan, Dotenv.
- **Process Manager**: Nodemon (Development).

---

## 📂 Project Structure

```text
SnapStory/
├── Backend/
│   ├── Dockerfile
│   ├── index.js                     # Server Entry Point
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js          # MongoDB Mongoose connection
│   │   │   └── serverConfig.js      # Environment variable configurations
│   │   ├── controller/              # Auth, Blog, Comment, and Tag controllers
│   │   ├── middleware/              # Redis Cache & request validators
│   │   ├── models/                  # mongoose database schemas (Blog, Comment, Like, Tag, User)
│   │   ├── repository/              # Data access abstraction layer
│   │   ├── routes/                  # Express routes (v1 API endpoints)
│   │   └── services/                # Business logic services
│   └── package.json
├── Frontend/
│   ├── Dockerfile
│   ├── index.html
│   ├── nginx.conf                   # Nginx config for frontend production builds
│   ├── src/
│   │   ├── App.tsx                  # Main router setup & layout
│   │   ├── api/                     # Axios instance & request endpoints
│   │   ├── components/              # Shared components (Header, BlogCard, etc.)
│   │   ├── context/                 # AuthContext & global state providers
│   │   ├── pages/                   # Views: Home, BlogDetail, CreateBlog, Login, Signup
│   │   ├── types/                   # TypeScript interfaces/types
│   │   └── index.css                # Global CSS imports
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml               # Service orchestrator (db, redis, backend, frontend)
└── package.json
```

---

## ⚙️ Configuration & Environment Variables

Create a `.env` file in the `Backend/` directory with the following keys:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/SnapStory
REDIS_URL=redis://localhost:6379
BCRYPT_SALT_ROUNDS=9
```

---

## 🏃 Running the Application

### Method 1: Using Docker Compose (Recommended)

To spin up all services (MongoDB, Redis, Backend, Frontend) with a single command:

1. Make sure you have Docker and Docker Compose installed.
2. In the root directory of the project, run:
   ```bash
   docker-compose up --build
   ```
3. Once all containers start:
   - **Frontend UI**: [http://localhost](http://localhost)
   - **Backend API**: [http://localhost:3000](http://localhost:3000)

### Method 2: Running Locally (Manual Development)

#### 1. Setup Backend
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create and configure your `.env` file as described in [Configuration](#-configuration--environment-variables).
4. Run the development server (requires local MongoDB and Redis instances running):
   ```bash
   npm start
   ```

#### 2. Setup Frontend
1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
4. Access the site on [http://localhost:5173](http://localhost:5173) (or the port specified by Vite).

---

## 🔌 API Documentation

All endpoints are prefixed with `/api/v1`.

### Authentication Endpoints

| HTTP Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/signup` | Register a new user | `{ "name": "...", "email": "...", "password": "..." }` |
| `POST` | `/api/v1/login` | Login and retrieve token | `{ "email": "...", "password": "..." }` |
| `GET` | `/api/v1/user/:id` | Fetch user info by user ID | *None* |

### Blog Endpoints

| HTTP Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/blog` | Create a new blog post (Authenticated) | `{ "title": "...", "content": "...", "image": "...", "tag": "..." }` |
| `GET` | `/api/v1/blogs` | Get all blog posts | *None* |
| `GET` | `/api/v1/blog/:id` | Get details of a single blog post | *None* |
| `POST` | `/api/v1/blog/paginate` | Retrieve paginated list of blog posts | `{ "page": 1, "pageSize": 10 }` |
| `GET` | `/api/v1/blog/search/:keyword` | Search blog posts by keyword | *None* |

### Comment Endpoints

| HTTP Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/:blogId/comment` | Add a comment to a specific blog | `{ "content": "...", "userId": "..." }` |
| `GET` | `/api/v1/:blogId/comments` | Retrieve comments for a specific blog | *None* |

### Tag Endpoints

| HTTP Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/tags` | Create a new tag | `{ "title": "..." }` |
| `GET` | `/api/v1/tags` | Retrieve all available tags | *None* |

---

## 🤝 Contributing

1. Fork this repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.
