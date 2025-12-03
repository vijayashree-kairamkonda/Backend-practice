import redis from "../config/redis.js";

export const cache = async (req, res, next) => {
  const key = req.originalUrl || req.url;
  try {
    const cached = await redis.get(key);
    if (cached) {
      console.log("cache hit", key);
      return res.json(JSON.parse(cached));
    }
    console.log("cache miss", key);
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      try {
        redis.set(key, JSON.stringify(body), "EX", 60);
      } catch (e) {
        console.error("cache set error:", e);
      }
      return originalJson(body);
    };
    return next();
  } catch (err) {
    console.error("cache error:", err);
    return next();
  }
};
