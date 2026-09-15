import express from "express";
import Redis from "ioredis";


const app = express();
app.use(express.json());




const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");



const BANNER_KEY = "app:banner";

app.post("/banner", async (req, res) => {
    await redis.set(BANNER_KEY, req.body.message || "welcome  to sami app"); 
    res.json({success: true, message: "Banner message updated successfully."});
}) 



app.get("/banner", async (req, res) => {
    const banner = await redis.get(BANNER_KEY) || "welcome to sami app";
    res.json({ success: true, message: banner });
})


app.delete("/banner", async (req, res) => {
    await redis.del(BANNER_KEY);
    res.json({success: true, message: "Banner message deleted successfully."});
})


app.get("/banner/exists", async (req, res) => {
    const exists = await redis.exists(BANNER_KEY);
    res.json({ exists: Boolean(exists) });
})



app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
})