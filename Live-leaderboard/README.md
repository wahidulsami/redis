# Live Leaderboard with Redis

A real-time leaderboard API built with Express.js and Redis.

## Features

- Increment post views
- Add/update scores on leaderboard
- Retrieve top 10 players
- Get individual user rank

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
```

Server starts on port 3000.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/post/:id/views` | Increment post views |
| POST | `/leaderboard/score` | Add score (body: `userId`, `score`) |
| GET | `/leaderboard` | Get top 10 players |
| GET | `/leaderboard/:userId/rank` | Get user rank |

## Examples

**Add score:**
```bash
curl -X POST http://localhost:3000/leaderboard/score \
  -H "Content-Type: application/json" \
  -d '{"userId": "player1", "score": 100}'
```

**Get leaderboard:**
```bash
curl http://localhost:3000/leaderboard
```

**Get user rank:**
```bash
curl http://localhost:3000/leaderboard/player1/rank
```

## Requirements

- Node.js
- Redis server running locally or set `REDIS_URL` env variable
