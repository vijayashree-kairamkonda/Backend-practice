import redis from "../config/redis";

export const cache = (keyPrefix) => async (req, res, next) => {
  const key = keyPrefix;
  try {
    const cached = await redis.get(key);
    if (cached) {
      console.log("cache hit");
      return res.json(JSON.parse(cached));
    }
    console.log("cache miss");
    res.locals.cacheKey = key;
    next();
  } catch (err) {
    console.error("cache error:", err);
    next();
  }
};
