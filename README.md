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

## 🔧 Setup Instructions

### Prerequisites

* Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* Ensure Docker Compose is available (comes with Docker Desktop)

### 1. Clone the repository

```bash
git clone <repo_url>
cd gif-explorer
```

### 2. Add your Giphy API key

Create a `.env` file in the root:

```bash
GIPHY_API_KEY=your_giphy_api_key_here
```

Alternatively, edit the `docker-compose.yml` file and replace the placeholder.

### 3. Start the development environment

```bash
docker-compose up --build
```

This uses `docker-compose.override.yml` for development: bind mounts, hot reload, etc.

### 4. Access the App

* Ports for frontend or backend can be changed in docker-compose.override.yml for local development
* Frontend: [http://localhost:3001](http://localhost:3001)
* Backend: [http://localhost:5000/api/gifs/trending](http://localhost:5000/api/gifs/trending)

### 5. Testing the Backend

The backend includes automated tests for API endpoints using Jest and Supertest.

Tests cover:
- /api/ping for health check
- /api/gifs/trending for trending GIFs
- /api/gifs/search?q=... for search functionality

Axios is configured in test mode to prevent open handles (e.g., TLSWRAP issues).

🧪 Run Tests Locally

    cd backend
    npm install
    npm test

This uses:
- NODE_ENV=test via cross-env
- jest --detectOpenHandles to catch async leaks
- A custom Axios instance that disables keep-alive

📁 Test File Structure

    backend/
    └── __tests__/
        └── index.test.ts   # API smoke tests

🧹 Troubleshooting

✅ Sample Output

    PASS  __tests__/index.test.ts
      API Smoke Tests
        ✓ GET /api/ping → should return { status: "ok" }
        ✓ GET /api/gifs/trending → should return data array
        ✓ GET /api/gifs/search?q=cat → should return search results

## 💠 API Endpoints

* `/api/gifs/trending` — Get trending GIFs
* `/api/gifs/search?q=cat` — Search GIFs

---

## 🐳 Docker Commands (for Local Development)

```bash
docker-compose up --build   # Start and build containers

docker-compose down         # Stop and remove containers

docker-compose logs -f      # Show logs

docker-compose down && docker-compose up --build  # Rebuild everything
```

---

## 🏭 Production Build

Build the production environment manually:

```bash
docker-compose -f docker-compose.yml up --build
```

Or run the production build test locally:

```bash
docker build --target=prod ./frontend
```

---

## 🧪 Dev vs Prod

| Environment | Frontend                  | Backend                  |
| ----------- | ------------------------- | ------------------------ |
| Development | Vite dev server w/ reload | `nodemon` (hot reload)   |
| Production  | Static build via Nginx    | Node.js w/ compiled code |

Files involved:

* `docker-compose.override.yml` → Dev behavior
* `docker-compose.yml` → Production-ready setup

---

## 🚀 CI/CD with GitHub Actions

### Location

`.github/workflows/deploy.yml`

### Behavior

* Triggers on push to `main`
* Builds frontend/backend Docker images
* Pushes them to Docker Hub

### Monitoring

1. Go to GitHub repo
2. Click on **Actions**
3. Check latest **Deploy** workflow

---

## ✅ Testing Changes

### Development

```bash
docker-compose up --build
# Edit code as needed
```

Visit [localhost:3000](http://localhost:3000) and test changes live.

### Production

```bash
docker-compose up --build
```

Visit [localhost:3000](http://localhost:3000) for Nginx-served static build.

---

## 📆 Docker Images

Your Docker Hub repository must be set up to match these:

* `yourdockerhubusername/gif-frontend`
* `yourdockerhubusername/gif-backend`

Check that secrets in GitHub are properly configured:

* `DOCKER_USERNAME`
* `DOCKER_PASSWORD`

---

## 📬 Support & Tips

### Confirm Production Builds

Before pushing to GitHub:

```bash
docker build --target=prod ./frontend
```

### If Docker Desktop is closed

* All containers and volumes stop.
* Reopen Docker and run:

```bash
docker-compose up --build
```

### Workflow Deletion

* Deleting a GitHub Actions workflow run removes logs/history, but has no effect on images already built.

---

## 📝 License

MIT License

For issues or feature requests, open a GitHub Issue.

 _
//\
V  \
 \  \_
  \,'.`-.
   |\ `. `.       
   ( \  `. `-.                        _,.-:\
    \ \   `.  `-._             __..--' ,-';/
     \ `.   `-.   `-..___..---'   _.--' ,'/
      `. `.    `-._        __..--'    ,' /
        `. `-_     ``--..''       _.-' ,'
          `-_ `-.___        __,--'   ,'
             `-.__  `----"""    __.-'
                 `--..____..--'
