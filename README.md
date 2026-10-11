# SmartNoteTaker

A full-stack **MERN** (MongoDB, Express, React, Node.js) note-taking application. Users can create, view, update, and delete notes through a REST API consumed by a React frontend.

**Live demo:** https://smart-note-taker-9edr.vercel.app

<!-- Add a screenshot here: ![SmartNoteTaker screenshot](./screenshots/home.png) -->

## Features

- Create, read, update, and delete (CRUD) notes
- RESTful API built with Express and Node.js
- Data stored in MongoDB using Mongoose
- API rate limiting per client IP with Upstash Redis (sliding window)
- CORS enabled for communication between frontend and backend
- Frontend built with React and Vite
- Deployed on Vercel (frontend and backend as separate projects)

## Tech Stack

| Layer      | Technologies                                  |
| ---------- | --------------------------------------------- |
| Frontend   | React, Vite                                   |
| Backend    | Node.js, Express                              |
| Database   | MongoDB, Mongoose                             |
| Rate limit | Upstash Redis, `@upstash/ratelimit`           |
| Deployment | Vercel                                        |

## Project Structure

```
SmartNoteTaker/
├── Backend/
│   ├── Middleware/        # Rate limiting middleware
│   ├── src/
│   │   ├── config/        # Database and Upstash configuration
│   │   ├── routes/        # Notes routes
│   │   └── server.js      # Express app entry point
│   └── package.json
└── Frontend/
    └── smart-note-front/  # React (Vite) application
```

## API Endpoints

Base path: `/api/notes`

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| GET    | `/api/notes`      | Get all notes       |
| GET    | `/api/notes/:id`  | Get a single note   |
| POST   | `/api/notes`      | Create a new note   |
| PUT    | `/api/notes/:id`  | Update a note       |
| DELETE | `/api/notes/:id`  | Delete a note       |

> Adjust this table if your routes differ.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) database (or a local MongoDB instance)
- An [Upstash](https://upstash.com/) Redis database (free tier is enough)


## Author

**Nakib Ahsan**
GitHub: [@nakibahsan299-debug](https://github.com/nakibahsan299-debug)
