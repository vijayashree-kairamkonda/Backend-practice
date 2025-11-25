import Weather from "../models/WeatherLogs.js";
import { getWeather } from "../services/WeatherService.js";

export const getWeatherData = async (req, res) => {
  try {
    const city = req.query.city || req.query.q;
    const weather = await getWeather(city);
    await Weather.create(weather);
    res.json(weather);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
