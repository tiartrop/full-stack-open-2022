import { useState } from "react";
import CountryInfo from "./CountryInfo";

const CountryWithButton = ({ country, show, onClick, index }) => {
  return (
    <div>
      <span>{country.name.common}</span>
      <button onClick={() => onClick(index)}>{show[index] ? "hide" : "show"}</button>
      <CountryInfo country={show[index]} />
    </div>
  );
};

const Country = ({ countryArr }) => {
  const [show, setShow] = useState(Array(countryArr.length).fill(false));

  const detailToShow = (index) => {
    const copy = [...show];
    copy[index] = copy[index] ? false : countryArr[index];
    setShow(copy);
  };

  return (
    <div>
      {countryArr.map((country, index) => (
        <CountryWithButton
          key={index}
          country={country}
          show={show}
          onClick={detailToShow}
          index={index}
        />
      ))}
    </div>
  );
};

export default Country;
