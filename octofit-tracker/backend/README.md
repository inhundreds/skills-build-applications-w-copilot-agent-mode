# OctoFit Tracker - Backend (Logic Tier)

## Overview

The OctoFit Tracker backend is a Node.js + Express + TypeScript API that serves as the logic tier for the multi-tier application. It connects to MongoDB for data persistence and provides RESTful API endpoints for user authentication, team management, activity tracking, leaderboard management, and personalized workout suggestions.

## Tech Stack

- **Runtime:** Node.js (LTS)
- **Framework:** Express 5.x
- **Language:** TypeScript 7.x
- **Database:** MongoDB with Mongoose
- **Dev Tools:** tsx (TypeScript execution), TypeScript compiler

## Project Structure

```
backend/
├── src/
│   ├── server.ts          # Main Express application
│   ├── models.ts          # Mongoose models
│   ├── config/
│   │   └── database.ts    # MongoDB connection
│   └── scripts/
│       └── seed.ts        # Database seeding script
├── dist/                  # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── .env.example
```

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

## Available Scripts

### Development
Start the development server with hot-reload using tsx:
```bash
npm run dev
```
Server runs on port 8000 and automatically detects Codespaces URL.

### Build
Compile TypeScript to JavaScript:
```bash
npm run build
```
Output goes to `dist/` directory.

### Production
Start the compiled server:
```bash
npm run start
```

## API Endpoints

### Health Check
- `GET /health` - Server health status and base URL

### Users
- `GET /api/users/` - Get all users
- `POST /api/users/` - Create a new user
- `GET /api/users/:id` - Get user by ID

### Teams
- `GET /api/teams/` - Get all teams
- `POST /api/teams/` - Create a new team
- `GET /api/teams/:id` - Get team by ID

### Activities
- `GET /api/activities/` - Get all activities
- `POST /api/activities/` - Log a new activity
- `GET /api/activities/:id` - Get activity by ID

### Leaderboard
- `GET /api/leaderboard/` - Get global leaderboard
- `GET /api/leaderboard/:teamId` - Get team-specific leaderboard

### Workouts
- `GET /api/workouts/` - Get all workout suggestions
- `GET /api/workouts/:userId` - Get personalized workouts for user
- `POST /api/workouts/` - Create a new workout suggestion

## Codespaces Support

The API is Codespaces-aware and automatically generates the correct base URL:

- **In Codespaces:** `https://{CODESPACE_NAME}-8000.app.github.dev`
- **Locally:** `http://localhost:8000`

This allows the frontend and other services to connect correctly in any environment.

## Database Models

### User
- username (unique)
- email (unique)
- password
- profile (firstName, lastName, bio)

### Team
- name
- description
- members (array of User references)
- leader (User reference)

### Activity
- userId (User reference)
- type (e.g., running, cycling, weightlifting)
- duration (minutes)
- distance (optional)
- calories (optional)
- notes (optional)

### Leaderboard
- userId (User reference)
- teamId (Team reference)
- totalActivities
- totalCalories
- rank

### Workout
- userId (User reference)
- name
- description
- exercises (array with name, sets, reps, weight)
- difficulty (easy/medium/hard)
- estimatedDuration (minutes)

## Development Workflow

1. **Make changes** to TypeScript files in `src/`
2. **Run `npm run dev`** to test with tsx
3. **Run `npm run build`** to compile before committing
4. **Test endpoints** with curl or Postman

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
MONGODB_URI=mongodb://localhost:27017/octofit_db
PORT=8000
NODE_ENV=development
```

## MongoDB Setup

Ensure MongoDB is running locally or connect to a remote instance via `MONGODB_URI`:

```bash
# Check if MongoDB is running
ps aux | grep mongod

# Connect with mongosh
mongosh
```

## Testing Endpoints

### Using curl

```bash
# Health check
curl http://localhost:8000/health

# Get all users
curl http://localhost:8000/api/users/

# Get all teams
curl http://localhost:8000/api/teams/

# Get leaderboard
curl http://localhost:8000/api/leaderboard/
```

### Using Postman

Import the endpoints and test with proper request methods and bodies.

## Troubleshooting

### ts-node issues
This project uses `tsx` instead of `ts-node` for better TypeScript support. If you encounter issues:
```bash
npm install --save-dev tsx
npm run dev
```

### MongoDB Connection Issues
- Ensure `mongodb-org` service is running
- Check `MONGODB_URI` environment variable
- Verify database name is `octofit_db`

### Port Already in Use
If port 8000 is in use, modify the `PORT` environment variable or kill the process:
```bash
lsof -i :8000
kill -9 <PID>
```

## Next Steps

1. Implement authentication (JWT/sessions)
2. Add request validation middleware
3. Create API tests
4. Add error handling and logging
5. Implement data seeding script
