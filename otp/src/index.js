import express from "express";
import Redis from "ioredis";


const app = express();
app.use(express.json());




const redis =
 new Redis(
    process.env.REDIS_URL
    ||
    "redis://localhost:6379"
);


function optKey(key) {
    return `app:${key}`;
}


app.post("/otp", async (req, res) => {
    const { phoneNumber } = req.body;
    const otp =Math.floor(100000 + Math.random() * 900000).toString();
    await redis.set(optKey(phoneNumber), otp, "EX", 30); // OTP expires in 30 seconds
    res.json({ success: true, message: "OTP generated successfully.", otp });
    
})


app.post("/otp/verify", async (req, res) => {
    const { phoneNumber, otp } = req.body;
    const storedOtp = await redis.get(optKey(phoneNumber));

    if (!storedOtp) {
        res.status(400).json({ success: false, message: "OTP not found." });
        return;
    }

    if (storedOtp === otp) {
        await redis.del(optKey(phoneNumber)); // Delete OTP after successful verification
        res.json({ success: true, message: "OTP verified successfully." });
    } else {
        res.status(400).json({ success: false, message: "Invalid OTP." });
    }


    await redis.del(optKey(phoneNumber)); // Delete OTP after successful verification

}) 



app.get("/otp/:phoneNumber/ttl", async (req, res) => {
    const ttl = await redis.ttl(optKey(req.params.phoneNumber));
    res.json({ success: true, ttl });
})