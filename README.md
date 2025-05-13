# GIF Explorer

Explore trending and searchable GIFs using a responsive React frontend and a proxy backend server. Containerized with Docker, with support for CI/CD and separate development/production environments.

---

## Features

* View trending GIFs
* Search GIFs by keyword
* Paginated results
* Fully responsive layout
* Dockerized frontend and backend
* GitHub Actions CI/CD for Docker image builds and pushes

---

## 🗂 Project Structure

```
project-root/
├── backend/                # Express backend (Node.js)
│   ├── Dockerfile
│   └── index.js
├── frontend/               # React frontend
│   ├── Dockerfile
│   ├── nginx.conf
│   └── src/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions workflow for CI/CD
├── .env                    # Environment variables (e.g., GIPHY_API_KEY)
├── docker-compose.yml      # Docker Compose for dev/prod setup
├── Makefile                # Helper commands
```

---

## 🔧 Setup Instructions

### Prerequisites

* Docker & Docker Compose

### 1. Clone the repo & navigate into it

```
git clone <repo_url>
cd gif-explorer
```

### 2. Add your Giphy API key

Edit `docker-compose.yml` and replace `YOUR_GIPHY_API_KEY` with your actual key.

Alternatively, create a `.env` file:

```
GIPHY_API_KEY=your_giphy_api_key_here
```

### 3. Run the app

```
docker-compose up --build
```

### Access the App

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:5000/api/gifs/trending](http://localhost:5000/api/gifs/trending)

---

## 🛠 Available Endpoints

* `/api/gifs/trending` — Get trending GIFs
* `/api/gifs/search?q=cat` — Search GIFs

---

## 🐳 Docker Commands (via Makefile)

### Development

```bash
make up         # Start containers in dev mode
make down       # Stop containers
make logs       # View logs
make rebuild    # Rebuild and restart all
```

### Production Build (optional override file not shown)

```bash
docker-compose -f docker-compose.yml up --build
```

---

## 🛠 Development vs Production

* **Development**: Live code changes using bind mounts and `npm start`
* **Production**: Optimized `npm run build` for frontend, served via `nginx`

> Tip: You can create `docker-compose.override.yml` for dev-specific configs

---

## 🚀 CI/CD with GitHub Actions

### Workflow File

Located at: `.github/workflows/deploy.yml`

* Triggers on `main` branch pushes
* Builds frontend and backend Docker images
* Pushes to Docker Hub

### 🔍 Check CI/CD Pipeline

1. Go to your GitHub repo
2. Click on **Actions** tab
3. Select latest workflow run to see logs and status

---

## ✅ Verifying Code Changes

### In Development

* Use `make up` to start containers
* Visit `http://localhost:3000`
* Make code changes
* Use `make rebuild` if needed

### In Production

* Build images: `docker-compose up --build`
* Access frontend at `http://localhost:3000`
* Logs: `make logs`

---

## 📦 Docker Image Repositories

Set these up in Docker Hub or another registry:

* `yourdockerhubusername/gif-frontend`
* `yourdockerhubusername/gif-backend`

---

## 📝 License

MIT License

---

## 📬 Contact

For issues or feature requests, open an issue on GitHub.