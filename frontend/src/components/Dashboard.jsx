import { useEffect, useState } from "react";
import { request } from "../api";
import { logout } from "../auth";

export default function Dashboard() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");



  const getWeather = async () => {
    try {
      const data = await request("/weather/", "GET", null, true);
      setWeather(data);
    } catch (err) {
      alert(err.message);
    }
  };

  const updateLocation = async () => {
    try {
      const res = await request("/profile/location", "PUT", { city, country }, true);
      alert(res.msg);
      getWeather();
    } catch (err) {
      alert(err.message);
    }
  };


const autoDetectLocation = async () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;

    try {
      // Using OpenWeatherMap reverse geocoding
      const apiKey = "b342e7439f5af44d5ef5422c40b19808"; // your key
      const res = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`);
      const data = await res.json();

      if (data.length > 0) {
        const detectedCity = data[0].name;
        const detectedCountry = data[0].country;
        setCity(detectedCity);
        setCountry(detectedCountry);

        // Optional: directly update to backend
        await request("/profile/location", "PUT", { city: detectedCity, country: detectedCountry }, true);
        alert(`Location set to ${detectedCity}, ${detectedCountry}`);
        getWeather();
      } else {
        alert("Could not detect location.");
      }
    } catch (err) {
      console.error(err);
      alert("Error detecting location.");
    }
  }, () => {
    alert("Permission denied or location not available.");
  });
};


  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="container">
      <h2>Weather Dashboard</h2>
      {weather ? (
        <>
          <p><strong>Location:</strong> {weather.location}</p>
          <p><strong>Temp:</strong> {weather.temperature} °C</p>
          <p><strong>Condition:</strong> {weather.condition}</p>
          <p><strong>Humidity:</strong> {weather.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weather.wind_speed} m/s</p>
        </>
      ) : <p>Loading weather...</p>}

      <h3>Update Location</h3>
      <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
      <input type="text" placeholder="Country Code (e.g., IN)" value={country} onChange={(e) => setCountry(e.target.value)} />
      <button onClick={updateLocation}>Update</button>
      <br /><br />
      <button onClick={logout}>Logout</button>

      <button onClick={autoDetectLocation}>Auto-Detect My Location</button>
    </div>
  );
}