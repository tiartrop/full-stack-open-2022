import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return { type, value, onChange };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (name) {
      let url = `https://restcountries.com/v3.1/name/${name}?fullText=true`;
      axios.get(url).then((response) => {
        setCountry(response.data);
      });
    } else setCountry("");
  }, [name]);

  return country[0];
};

export const useAnotherHook = () => ({ useField, useCountry });
