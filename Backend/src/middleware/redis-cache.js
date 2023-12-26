import redis from "redis";

const redisClient = redis.createClient({ host: "localhost", port: 6379 });
redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (error) => {
  console.error("Redis connection error:", error);
});
const cacheMiddleware = (req, res, next) => {
  if (redisClient.connected) {
    const cacheKey = req.originalUrl;

    redisClient.get(cacheKey, (error, cachedData) => {
      if (error) {
        console.error("Redis error:", error);
        return next();
      }

      if (cachedData) {
        const data = JSON.parse(cachedData);
        return res.json({ source: "Cache", data });
      } else {
        next();
      }
    });
  } else {
    console.error("Redis client is closed");
    next();
  }
};

const cacheAndRespondMiddleware = async (req, res, serviceFunction) => {
  try {
    const response = await serviceFunction();

    const cacheKey = req.originalUrl;
    redisClient.setEx(cacheKey, 3600, JSON.stringify(response));

    res.status(200).json({ source: "Database", data: response });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Couldn't fetch data",
      success: false,
      error: { error },
    });
  }
};

export { cacheMiddleware, cacheAndRespondMiddleware };
