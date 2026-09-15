# JSON vs Hash

Compare storing data as JSON strings vs Redis Hashes.

## Endpoints

```bash
# Store as JSON string
curl -X POST http://localhost:3000/user/1/json \
  -H "Content-Type: application/json" \
  -d '{"name": "Sami", "age": 25}'

# Get from JSON
curl http://localhost:3000/user/1/json

# Store as Hash
curl -X POST http://localhost:3000/user/1/hash \
  -H "Content-Type: application/json" \
  -d '{"name": "Sami", "age": 25}'

# Get from Hash
curl http://localhost:3000/user/1/hash
```

## JSON String vs Hash

| Feature | JSON String | Hash |
|---------|-------------|------|
| Store | `SET user:1 '{"name":"Sami"}'` | `HSET user:1 name "Sami"` |
| Read all | `GET user:1` | `HGETALL user:1` |
| Read field | Must parse entire JSON | `HGET user:1 name` |
| Update field | Must read, parse, modify, write | `HSET user:1 name "New"` |
| Best for | Simple, small objects | Large objects, partial reads |

## Run

```bash
npm install
npm run dev
```
