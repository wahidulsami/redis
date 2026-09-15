<![CDATA[<div align="center">

# Redis Learning Journey

### A hands-on collection of 8 real-world Redis projects

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Redis](https://img.shields.io/badge/Redis-7.x-red.svg)](https://redis.io/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-blue.svg)](https://expressjs.com/)

</div>

---

## What is Redis?

Redis (Remote Dictionary Server) is an open-source, in-memory data structure store used as a **database**, **cache**, **message broker**, and **queue**. It delivers sub-millisecond response times, making it ideal for real-time applications.

### Why Learn Redis?

| Feature | Benefit |
|---------|---------|
| **In-Memory** | Extremely fast reads/writes (100K+ ops/sec) |
| **Data Structures** | Strings, Lists, Sets, Sorted Sets, Hashes, Streams |
| **Persistence** | RDB snapshots + AOF for durability |
| **Pub/Sub** | Real-time messaging between services |
| **TTL Support** | Auto-expire keys (perfect for caching, OTPs) |
| **Atomic Operations** | Thread-safe without locks |

---

## How to Use This Repository

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) (for running Redis)
- A terminal

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/your-username/redis.git
cd redis

# 2. Start Redis and MongoDB with Docker
docker compose up -d

# 3. Go into any project folder
cd Live-leaderboard

# 4. Install dependencies
npm install

# 5. Run the project
npm run dev
```

### Docker Services

```yaml
# docker-compose.yaml
services:
  redis:    # port 6379
  mongo:    # port 27017
```

---

## Projects Overview

| # | Project | Redis Concept | Difficulty |
|---|---------|--------------|------------|
| 1 | [Redis Chapter 1](#1-redis-chapter-1) | Basic Connectivity | Beginner |
| 2 | [Email Queue](#2-email-queue) | Lists (LPUSH/RPOP) | Beginner |
| 3 | [JSON vs Hash](#3-json-vs-hash) | Strings vs Hashes | Beginner |
| 4 | [Live Leaderboard](#4-live-leaderboard) | Sorted Sets + INCR | Intermediate |
| 5 | [OTP System](#5-otp-system) | Strings + TTL | Intermediate |
| 6 | [Pub/Sub](#6-pubsub-notifications) | Pub/Sub Channels | Intermediate |
| 7 | [BullMQ Jobs](#7-bullmq-email-worker) | Queues + Workers | Advanced |
| 8 | [Site Banner](#8-site-banner) | Key-Value Cache | Beginner |

---

## Detailed Project Breakdown

### 1. Redis Chapter 1
**Folder:** `redis_chapter_1/`

The starting point. Tests basic Redis and MongoDB connectivity.

```
GET /redis    → Pings Redis, returns PONG
GET /mongo    → Shows MongoDB connection status
```

**What you learn:**
- Connecting to Redis with `ioredis`
- Basic `PING` command
- Docker setup for Redis + MongoDB

---

### 2. Email Queue
**Folder:** `email-queue/`

A simple FIFO email queue using Redis Lists.

```
POST /emails              → Add email to queue
GET  /emails/process-one  → Dequeue and process one email
```

**Redis commands used:** `LPUSH`, `RPOP`

**What you learn:**
- Redis Lists as message queues
- FIFO (First In, First Out) processing
- Serializing JSON to/from Redis

---

### 3. JSON vs Hash
**Folder:** `json-vs-hash/`

Compares two ways to store objects in Redis.

```
POST /user/:id/json   → Store as JSON string
GET  /user/:id/json   → Retrieve from JSON string
POST /user/:id/hash   → Store as Hash
GET  /user/:id/hash   → Retrieve from Hash
```

**Redis commands used:** `SET`, `GET`, `HSET`, `HGETALL`

**What you learn:**
- String storage vs Hash storage
- When to use each approach
- Hash field-level access efficiency

---

### 4. Live Leaderboard
**Folder:** `Live-leaderboard/`

A real-time gaming leaderboard with view counters.

```
POST /post/:id/views           → Increment view count
POST /leaderboard/score        → Add/update player score
GET  /leaderboard              → Top 10 players
GET  /leaderboard/:userId/rank → Get user's rank
```

**Redis commands used:** `ZADD`, `ZREVRANGE`, `ZREVRANK`, `INCR`

**What you learn:**
- Sorted Sets for ranking systems
- Atomic counters with `INCR`
- Real-time score updates
- Proper error handling with try/catch

---

### 5. OTP System
**Folder:** `otp/`

One-Time Password generation with auto-expiry.

```
POST /otp                → Generate 6-digit OTP (expires in 30s)
POST /otp/verify         → Verify OTP
GET  /otp/:phone/ttl     → Get remaining time
```

**Redis commands used:** `SET` (with EX), `GET`, `DEL`, `TTL`

**What you learn:**
- TTL (Time To Live) for auto-expiring keys
- Secure OTP flow (generate → verify → delete)
- `TTL` command for checking expiry

---

### 6. Pub/Sub Notifications
**Folder:** `pub-sub-redis/`

Real-time messaging between processes.

```
# Publisher (API)
POST /notifications   → Publish message to channel

# Subscriber (separate process)
node src/subscriper.js → Listens and logs messages
```

**Redis commands used:** `PUBLISH`, `SUBSCRIBE`

**What you learn:**
- Publisher/Subscriber pattern
- Running two separate Node.js processes
- Real-time event-driven communication

---

### 7. BullMQ Email Worker
**Folder:** `redis-bullMQ/`

A production-grade job queue with retries and backoff.

```
POST /welcome-email    → Add email job to queue
Worker (auto)          → Processes jobs with retry logic
```

**What you learn:**
- BullMQ queue management
- Job retries with exponential backoff
- Worker pattern for background processing
- Separating API from job processing

---

### 8. Site Banner
**Folder:** `site-bannner/`

A simple key-value cache for site configuration.

```
POST   /banner         → Set banner message
GET    /banner         → Get current banner
DELETE /banner         → Remove banner
GET    /banner/exists  → Check if banner exists
```

**Redis commands used:** `SET`, `GET`, `DEL`, `EXISTS`

**What you learn:**
- Basic key-value operations
- Cache-aside pattern
- Existence checks

---

## Redis Data Structures Cheat Sheet

```
String    →  "hello"                    SET key "value" / GET key
Hash      →  { name: "sami", age: 25 }  HSET user:1 name "sami" / HGETALL user:1
List      →  [a, b, c]                  LPUSH queue a / RPOP queue
Set       →  {a, b, c}                  SADD tags "redis" / SMEMBERS tags
SortedSet →  {a: 100, b: 200}           ZADD board 100 "player1" / ZREVRANGE board 0 9
```

---

## Learning Path

```
Week 1: Basics
  ├── redis_chapter_1    (connectivity)
  ├── site-bannner       (GET/SET/DEL)
  └── json-vs-hash       (strings vs hashes)

Week 2: Intermediate
  ├── email-queue        (lists as queues)
  ├── otp                (TTL & expiry)
  └── Live-leaderboard   (sorted sets)

Week 3: Advanced
  ├── pub-sub            (messaging patterns)
  └── redis-bullMQ       (job queues & workers)
```

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| **Redis 7** | In-memory data store |
| **Node.js** | Runtime |
| **Express 5** | HTTP framework |
| **ioredis** | Redis client for Node.js |
| **BullMQ** | Job queue framework |
| **Docker** | Containerized Redis & MongoDB |

---

## Contributing

1. Fork the repo
2. Create a branch (`git checkout -b feature/new-project`)
3. Add your Redis project following the existing structure
4. Include a README in your project folder
5. Submit a Pull Request

---

## Author

**Wahidul Islam Sami**

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
]]>