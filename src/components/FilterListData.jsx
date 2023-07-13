import React from "react";

export default function FilterListData({ genreData, setfilterOption }) {
  return (
    <div className="genres">
      {genreData.slice(0, 8).map((data, id) => (
        <button key={id} onClick={() => setfilterOption(data)}>
          {data}
        </button>
      ))}
    </div>
  );
}
