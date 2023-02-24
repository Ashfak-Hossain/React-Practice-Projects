import React, { useState, useEffect } from "react";
import Countries from "./components/Countries";
import Search from "./components/Search";

import "./App.css";

const url = "https://restcountries.com/v3.1/all";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const fetchData = async (url) => {
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();

      setCountries(data);
      setFilteredCountries(data);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  const handleRemoveCountry = (name) => {
    const filter = filteredCountries.filter(
      (country) => country.name.common !== name
    );

    setFilteredCountries(filter);
  };

  const handleSearch = (searchvalue) => {
    let value = searchvalue.toLowerCase();
    const newCountries = countries.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      return countryName.startsWith(value);
    });
    setFilteredCountries(newCountries);
  };

  return (
    <>
      <h1>Country App</h1>
      <p>Ashfak Hossain Evan</p>

      <Search onSearch={handleSearch} />

      {isLoading && <h2>Loading...</h2>}
      {error && <h2>{error.message}</h2>}
      {countries && (
        <Countries
          countries={filteredCountries}
          onReamoveCountry={handleRemoveCountry}
        />
      )}
    </>
  );
}

export default App;
