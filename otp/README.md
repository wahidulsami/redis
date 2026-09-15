# OTP System

One-Time Password generation and verification with Redis TTL.

## How It Works

1. Generate a 6-digit OTP for a phone number
2. Store it in Redis with a 30-second expiry (`EX 30`)
3. Verify the OTP before it expires
4. Auto-delete after use or expiry

## Endpoints

```bash
# Generate OTP
curl -X POST http://localhost:3000/otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+1234567890"}'

# Verify OTP
curl -X POST http://localhost:3000/otp/verify \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+1234567890", "otp": "123456"}'

# Check remaining TTL
curl http://localhost:3000/otp/+1234567890/ttl
```

## Redis Commands

| Command | Description |
|---------|-------------|
| `SET key value EX 30` | Set with 30s expiry |
| `GET key` | Retrieve value |
| `DEL key` | Delete key |
| `TTL key` | Check remaining time |

## Run

```bash
npm install
npm run dev
```
