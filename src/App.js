import { useState } from "react";

/*const api = {
  key: "bd0365b7cc816f2128f9305f360f1143",
  base: "http://api.openweathermap.org/data/2.5/",
};*/

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("{}");

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=bd0365b7cc816f2128f9305f360f1143`)
        .then((res) => res.json())
        .then((result) => {
          //console.log(result);
          setWeather(result);
          setQuery("");
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];

    let days = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          ></input>
        </div>
        { (typeof weather.main !== "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}°c</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) :(<div>
          
        </div>) }
      </main>
    </div>
  );
}

export default App;
