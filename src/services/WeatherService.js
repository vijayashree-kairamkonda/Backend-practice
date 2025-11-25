import axios from "axios";

//get weather data
export const getWeather = async (city) => {
  const response = await axios.get(
    "https://api.weatherapi.com/v1/current.json",
    {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: city,
      },
    }
  );
  const data = response.data;
  return {
    city: data.location.name,
    temperature: data.current.temp_c,
    condition: data.current.condition.text,
  };
};
