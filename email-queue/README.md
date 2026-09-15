# Email Queue

A simple FIFO email queue using Redis Lists.

## How It Works

- Emails are pushed to a Redis List using `LPUSH`
- Emails are popped and processed using `RPOP`
- This ensures First-In-First-Out (FIFO) processing

## Endpoints

```bash
# Add an email to the queue
curl -X POST http://localhost:3000/emails \
  -H "Content-Type: application/json" \
  -d '{"to": "user@example.com", "subject": "Welcome!", "body": "Hello!"}'

# Process one email from the queue
curl http://localhost:3000/emails/process-one
```

## Redis Commands

| Command | Description |
|---------|-------------|
| `LPUSH` | Push email to left of list |
| `RPOP` | Pop email from right of list |

## Run

```bash
npm install
npm run dev
```
