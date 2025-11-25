import express from "express";
import { getWeatherData } from "../controllers/WeatherController.js";

const router = express.Router();

router.get("/", getWeatherData);

export default router;
