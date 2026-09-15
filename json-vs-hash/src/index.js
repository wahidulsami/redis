import express  from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

app.post("/user/:id/json", async (req, res) => {
     await redis.set(`user:${req.params.id}`, JSON.stringify(req.body)); 

    res.json({  
        success: true,
        message: "User data stored in Redis as JSON" });

}); 


app.get("/user/:id/json", async (req, res) => {
    const userData = await redis.get(`user:${req.params.id}`);
    if (userData) {
        res.json({ success: true, data: JSON.parse(userData) });
    } else {
        res.status(404).json({ success: false, message: "User not found" });
    }
});


app.post("/user/:id/hash", async (req, res) => {
    await redis.hset(`user:${req.params.id}`, req.body);
    res.json({  
        success: true,
        message: "User data stored in Redis as Hash" });
});


app.get("/user/:id/hash", async (req, res) => {
    const userData = await redis.hgetall(`user:${req.params.id}`); 
    res.json({ success: true, data: userData });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
}); 