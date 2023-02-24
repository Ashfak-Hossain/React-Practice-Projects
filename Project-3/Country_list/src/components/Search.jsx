import React, { useState, useEffect } from "react";

const Search = (props) => {
  const [SearchText, setSearchText] = useState("");
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    props.onSearch(SearchText);
  }, [SearchText]);

  return (
    <div style={{ textAlign: "center" }}>
      <input
        type="text"
        placeholder="Search Country"
        value={SearchText}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
