# BullMQ Email Worker

Production-grade email job queue using BullMQ (Redis-backed).

## How It Works

- **API** adds email jobs to a BullMQ queue
- **Worker** picks up jobs, processes them with retry logic
- Supports exponential backoff (retries with increasing delays)

## Architecture

```
POST /welcome-email → API → BullMQ Queue → Worker → Process Email
                                    ↓
                              Redis (stores jobs)
```

## Endpoints

```bash
# Add a welcome email job
curl -X POST http://localhost:3000/welcome-email \
  -H "Content-Type: application/json" \
  -d '{"to": "user@example.com", "subject": "Welcome!", "body": "Hello!"}'
```

## Features

- 3 automatic retries on failure
- Exponential backoff (delays increase between retries)
- Job completion and failure event logging

## Run

```bash
npm install
npm run dev
```

The worker starts automatically alongside the API.
