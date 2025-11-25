import mongoose from "mongoose";

const WeatherLogsSchema = new mongoose.Schema(
  {
    city: String,
    temperature: Number,
    condition: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Weather", WeatherLogsSchema);
