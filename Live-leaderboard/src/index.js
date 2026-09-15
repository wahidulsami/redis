
import express from "express";
import Redis from "ioredis";

const app = express();

app.use(express.json());

const redis = new Redis(
  process.env.REDIS_URL || "redis://localhost:6379"
);


app.post("/post/:id/views", async (req, res) => {
  try {
    const { id } = req.params;

    const views = await redis.incr(`post:${id}:views`);

    res.json({
      postId: id,
      views,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to increment views",
    });
  }
});


app.post("/leaderboard/score", async (req, res) => {
  try {
    const { userId, score } = req.body;

    await redis.zadd("leaderboard", score, userId);

    res.json({
      message: "Score added to leaderboard",
      userId,
      score,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update leaderboard",
    });
  }
});


app.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await redis.zrevrange(
      "leaderboard",
      0,
      9,
      "WITHSCORES"
    );

    const result = [];

    for (let i = 0; i < leaderboard.length; i += 2) {
      result.push({
        userId: leaderboard[i],
        score: Number(leaderboard[i + 1]),
      });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: "Failed to get leaderboard",
    });
  }
});


app.get("/leaderboard/:userId/rank", async (req, res) => {
  try {
    const { userId } = req.params;

    const rank = await redis.zrevrank("leaderboard", userId);

    if (rank === null) {
      return res.status(404).json({
        error: "User not found in leaderboard",
      });
    }

    res.json({
      userId,
      rank: rank + 1,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get user rank",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});