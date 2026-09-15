import express from "express";
import Redis from "ioredis";

import mongoose from "mongoose";


const app = express();


// redis


const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");


 app.get("/redis", async (req, res) => {
    const replay =  await  redis.ping();
    res.json({redis: replay})
 })



// mongo 
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/mydatabase";

 app.get("/mongo", async (req, res) => {
    await mongoose.connect(MONGO_URL);
    res.json({ mongo: "connected" })
 })



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});