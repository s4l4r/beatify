# Beatify

A modern music streaming web application with a Spotify-inspired dark UI.

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4-green)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED)

## Features

- Browse albums, artists, and bands
- Stream audio in the browser with a full-featured player (play/pause, next/prev, shuffle, repeat, seek)
- Dark mode and light mode
- Search across albums, artists, bands, and songs
- User registration and JWT-based authentication
- Playlist management (create, add/remove songs)
- Responsive design

## Tech Stack

| Layer       | Technology                                     |
|-------------|------------------------------------------------|
| Backend     | Spring Boot 3.4, Spring Security, Spring Data JPA |
| Auth        | JWT (jjwt)                                     |
| Database    | MySQL 8.0                                      |
| Frontend    | React 18, TypeScript, Vite                     |
| Styling     | Tailwind CSS (dark mode)                       |
| State       | Zustand                                        |
| Audio       | Howler.js                                      |
| Build       | Maven with frontend-maven-plugin               |
| Container   | Docker Compose                                 |

## Project Structure

```
beatify/
├── src/main/java/com/paradise/beatify/
│   ├── config/          # Security, web config
│   ├── controller/      # REST API controllers
│   ├── domain/          # JPA entities and enums
│   ├── dto/             # Request/response records
│   ├── repository/      # Spring Data repositories
│   ├── security/        # JWT token provider, auth filter
│   └── service/         # Business logic
├── src/main/resources/
│   ├── application.yml  # App configuration
│   └── static/          # React build output (generated)
├── frontend/
│   └── src/
│       ├── api/         # Axios API client
│       ├── components/  # React components (Navbar, Player, etc.)
│       ├── pages/       # Page components (Home, Album, Search, etc.)
│       ├── store/       # Zustand stores (auth, player, theme)
│       └── types/       # TypeScript interfaces
├── docker/
│   └── init.sql         # Database schema and seed data
├── media/               # Audio and image files (mounted volume)
├── Dockerfile           # Multi-stage build (Maven + JRE)
└── docker-compose.yml
```

## Quick Start

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose

### Run

```bash
docker compose up --build
```

The app will be available at **http://localhost:8080**.

### Demo Account

| Field    | Value              |
|----------|--------------------|
| Email    | `demo@beatify.com` |
| Password | `password`         |

### Adding Music

Place audio files in the `media/` directory. The app serves everything under `/media/**`.

The seed data expects files at:

```
media/radiohead/in-rainbows/
├── cover.jpg
├── 01-15-step.mp3
├── 02-bodysnatchers.mp3
├── ...
└── 10-videotape.mp3
```

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login` | Login (returns JWT) |
| POST | `/api/auth/register` | Register new user |
| GET | `/api/auth/me` | Current user info |
| GET | `/api/albums/featured` | Featured albums |
| GET | `/api/albums/recent` | Recently added albums |
| GET | `/api/albums/{id}` | Album detail with songs |
| GET | `/api/artists/{id}` | Artist detail |
| GET | `/api/bands/{id}` | Band detail |
| GET | `/api/songs/{id}` | Song detail |
| GET | `/api/search?q=` | Search all entities |
| GET | `/api/playlists` | User playlists (auth) |
| POST | `/api/playlists` | Create playlist (auth) |
| PUT | `/api/playlists/{id}/songs/{songId}` | Add song (auth) |
| DELETE | `/api/playlists/{id}/songs/{songId}` | Remove song (auth) |

### Reset Database

```bash
docker compose down -v
docker compose up --build
```

### Development

For frontend development with hot reload:

```bash
# Terminal 1: Start backend + MySQL
docker compose up mysql
mvn spring-boot:run

# Terminal 2: Start Vite dev server
cd frontend
npm run dev
```

The Vite dev server proxies API requests to `localhost:8080`.

### Removing Old Files

After verifying the new app works, run the cleanup script to remove the legacy JSP codebase:

```bash
./cleanup-old.sh
```

This removes `beatify-core/`, `beatify-web/`, and `.github/`.

## License

This project is for educational and personal use.
