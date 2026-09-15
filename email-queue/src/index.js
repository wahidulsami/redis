import express from 'express';
import Redis from 'ioredis';



const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const queueKey = "queue:emails";
 
app.post("/emails", async (req, res) => {
    const  job =  { 
        to : req.body.to,
        subject : req.body.subject || 'no subject',
        body : req.body.body ||  'no body',
        createdAt: new Date().toISOString()
    }
    await redis.lpush(queueKey, JSON.stringify(job));
    res.json({ success: true, message: "Email added to queue" });
})
 

app.get("/emails/process-one",async (req, res) => {
    const rawJob = await redis.rpop(queueKey);
    if (!rawJob) {
        return res.json({ success: false, message: "No email in queue" });
    } 

    const job = JSON.parse(rawJob);
    // Simulate email sending
    console.log(`Sending email to: ${job.to}, subject: ${job.subject}, body: ${job.body}`);
    res.json({ success: true, message: "Email processed", job });
}) 


app.listen(3000, () => {
    console.log("Email queue server is running on port 3000");
});