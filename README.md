# Beatify

A music streaming web application built with Spring MVC, Hibernate, and MySQL, served on Apache Tomcat.

![Java](https://img.shields.io/badge/Java-8-orange)
![Spring](https://img.shields.io/badge/Spring-5.3-green)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED)

## Features

- Browse albums, artists, and bands
- Stream audio directly in the browser with the built-in Plyr audio player
- Search for music across the library
- User registration and authentication with Spring Security
- Playlist management with shuffle and repeat
- Responsive design with Bootstrap and Semantic UI

## Tech Stack

| Layer       | Technology                              |
|-------------|-----------------------------------------|
| Backend     | Spring MVC, Spring Security, Spring Data JPA |
| ORM         | Hibernate 5.3                           |
| Database    | MySQL 8.0                               |
| Frontend    | JSP, jQuery, Bootstrap 4, Plyr          |
| Build       | Maven (multi-module)                    |
| Runtime     | Apache Tomcat 8.5                       |
| Container   | Docker Compose                          |

## Project Structure

```
beatify/
├── beatify-core/          # Domain entities, repositories, services, DTOs
├── beatify-web/           # Controllers, REST APIs, Spring config, JSP views
│   └── src/main/webapp/WEB-INF/
│       ├── jsp/           # View templates
│       └── resources/     # CSS, JS, images
├── docker/
│   └── init.sql           # Database schema and seed data
├── media/                 # Audio and image files (mounted volume, gitignored)
├── Dockerfile             # Multi-stage build (Maven + Tomcat)
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

Song entries in the database reference files via the `serverURL` column. The included seed data expects files at:

```
media/radiohead/in-rainbows/
├── cover.jpg
├── 01-15-step.mp3
├── 02-bodysnatchers.mp3
├── 03-nude.mp3
├── 04-weird-fishes-arpeggi.mp3
├── 05-all-i-need.mp3
├── 06-faust-arp.mp3
├── 07-reckoner.mp3
├── 08-house-of-cards.mp3
├── 09-jigsaw-falling-into-place.mp3
└── 10-videotape.mp3
```

### Reset Database

The init script only runs on a fresh MySQL volume. To re-seed:

```bash
docker compose down -v
docker compose up --build
```

## Configuration

Database credentials and JDBC URL are defined in:

- `beatify-core/.../util/constants/BeatifyConstants.java`
- `beatify-web/src/main/resources/META-INF/persistence.xml`

Default connection settings:

| Setting  | Value                                  |
|----------|----------------------------------------|
| Host     | `mysql` (Docker service name)          |
| Database | `beatify`                              |
| User     | `root`                                 |
| Password | `mysql-root-password`                  |

## License

This project is for educational and personal use.
