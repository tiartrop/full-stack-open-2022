import { useState, useEffect } from "react";
import axios from "axios";
import CountryInfo from "./components/CountryInfo";
import Country from "./components/Country";

const Filter = ({ searchName, onChange }) => {
  return (
    <div>
      <span>find countries</span>
      <input value={searchName} onChange={onChange} />
    </div>
  );
};

const Countries = ({ showArr }) => {
  if (showArr.length > 10) {
    return <p>Too many matches,specify another filter</p>;
  }
  if (showArr.length === 1) {
    return <CountryInfo country={showArr[0]} />;
  } else {
    return <Country countryArr={showArr} />;
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  const countriesToShow = () => {
    if (searchName === "") {
      return [];
    } else {
      return countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchName.toLowerCase())
      );
    }
  };

  return (
    <div>
      <Filter searchName={searchName} onChange={handleSearchChange}></Filter>
      <Countries showArr={countriesToShow()}></Countries>
    </div>
  );
};

export default App;
