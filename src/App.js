import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import { usePosition } from "use-position";
import moment from "moment";

const App = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");
  const [icon, setIcon] = useState("");
  const { latitude, longitude } = usePosition();
  const now = moment().format("h:mm a");
  useEffect(() => {
    if (latitude && longitude) {
      Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid={API-KEY-GOES-HERE}`
      ).then((response) => {
        setLocation(response.data.name);
        setWeather(response.data.weather[0].description);
        setTemp(Math.round(response.data.main.temp));
        setIcon(response.data.weather[0].icon);
      });
    }
  }, [latitude, longitude]);

  return (
    <div className="container">
      <div className="card">
        {latitude && longitude ? (
          <>
            <div className="city">{location}</div>
            <div className="date">{now}</div>
            <div className="container-sun">
              <img
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="icon"
                width="80px"
                height="80px"
              ></img>
            </div>
            <div className="temp">{temp}°C</div>

            <div className="weather">{weather}</div>
          </>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
  );
};

export default App;
