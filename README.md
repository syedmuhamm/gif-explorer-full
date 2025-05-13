# GIF Explorer

Explore trending and searchable GIFs using a responsive React frontend and a proxy backend server.

## 🚀 Setup

### Prerequisites
- Docker & Docker Compose

### 1. Clone the repo & navigate into it
```
git clone <repo_url>
cd gif-explorer
```

### 2. Add your Giphy API key
Edit `docker-compose.yml` and replace `YOUR_GIPHY_API_KEY` with your actual key.

### 3. Run the app
```
docker-compose up --build
```

### 🌍 Access the App
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/api/gifs/trending

### 🛠 Available Endpoints
- `/api/gifs/trending` — Get trending GIFs
- `/api/gifs/search?q=cat` — Search GIFs

### 🍌 ASCII Banana
```
 _
//\
V  \
 \  \_
  \,'.`-.
   \ `. `. 
    \  `. `-.                        _,.-:\
     \    `-._             __..--' ,':: |
      \      `--..____..--'      ,':::: |
       \   _.-'            )     \::::::|
        `''                \     \::::|
                            `.    \:::/
                              `-.  \:/
                                 `-'
```