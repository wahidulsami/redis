import express from "express";
import Redis from "ioredis";
import mongoose from "mongoose";

const app = express();

// Redis
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

app.get("/redis", async (req, res) => {
    try {
        const reply = await redis.ping();
        res.json({ redis: reply });
    } catch (error) {
        res.status(500).json({ error: "Redis connection failed" });
    }
});

// MongoDB
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/mydatabase";

mongoose.connect(MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.get("/mongo", async (req, res) => {
    const state = mongoose.connection.readyState;
    const states = { 0: "disconnected", 1: "connected", 2: "connecting", 3: "disconnecting" };
    res.json({ mongo: states[state] || "unknown" });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});