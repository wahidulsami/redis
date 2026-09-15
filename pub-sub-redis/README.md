# Pub/Sub Notifications

Real-time messaging between processes using Redis Pub/Sub.

## How It Works

- **Publisher** (`api.js`): Sends messages to a Redis channel via HTTP API
- **Subscriber** (`subscriper.js`): Listens to the channel and logs messages

## Usage

```bash
# Terminal 1: Start the subscriber
npm run sub

# Terminal 2: Start the publisher API
npm run pub

# Terminal 3: Send a notification
curl -X POST http://localhost:3000/notifications \
  -H "Content-Type: application/json" \
  -d '{"title": "Alert", "message": "Server is down!"}'
```

## Redis Commands

| Command | Description |
|---------|-------------|
| `PUBLISH channel message` | Send message to channel |
| `SUBSCRIBE channel` | Listen to a channel |

## Architecture

```
HTTP Client → POST /notifications → Publisher (api.js) → PUBLISH → Redis Channel
                                                                        ↓
Subscriber (subscriper.js) ← SUBSCRIBE ← Redis Channel ← logs message
```

## Run

```bash
npm install
npm run pub   # start publisher
npm run sub   # start subscriber (in separate terminal)
```
