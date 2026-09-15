# Site Banner

A simple key-value cache for managing site banner messages.

## Endpoints

```bash
# Set banner message
curl -X POST http://localhost:3000/banner \
  -H "Content-Type: application/json" \
  -d '{"message": "Summer Sale - 50% off!"}'

# Get current banner
curl http://localhost:3000/banner

# Delete banner
curl -X DELETE http://localhost:3000/banner

# Check if banner exists
curl http://localhost:3000/banner/exists
```

## Redis Commands

| Command | Description |
|---------|-------------|
| `SET key value` | Store banner |
| `GET key` | Retrieve banner |
| `DEL key` | Remove banner |
| `EXISTS key` | Check if banner exists |

## Run

```bash
npm install
npm run dev
```
