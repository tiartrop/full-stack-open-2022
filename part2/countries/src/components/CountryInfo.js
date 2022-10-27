import { useState, useEffect } from "react";
import axios from "axios";

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState({});
  const [icon, setIcon] = useState('');
  
  useEffect(() => {
    if (country) {
      const api_key = process.env.REACT_APP_API_KEY
      const capital = country.capital[0]
      const url = "http://api.openweathermap.org/data/2.5/weather?units=metric&q=" + capital + "&appid=" + api_key
      axios.get(url).then((response) => {
        setWeather(response.data);
        setIcon('http://openweathermap.org/img/wn/' + response.data.weather[0].icon + '@2x.png')
      });
    }
  }, [country]);

  if (country) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital.map((capital) => capital)}</p>
        <p>area {country.area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt="flags"/>
        <h2>Weather in {country.capital[0]}</h2>
        <p>temperature {weather?.main?.temp} Celcius</p>
        <img src={icon} alt={weather?.weather?.at(0)?.main}/>
        <p>wind {weather?.wind?.speed} m/s</p>
      </div>
    );
  }
};

export default CountryInfo;