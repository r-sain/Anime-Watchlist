import React from "react";
import AnimeList from "./AnimeList";

const AnimeInfo = (props, anime) => {
  const { title, source, rank, score, popularity, url } = props.animeInfo;
  const { animeComponent, handleList } = props;

  return (
    <div className="animeInfoComps">
      <div className="inftit">
        <h3>{title}</h3>
      </div>
      <img src={props.animeInfo.images.jpg.large_image_url} />
      <div className="infoinfo">
        <h3>
          <span style={{ color: "white" }}>Rank: </span>
          {rank}
        </h3>
        <h3>
          <span style={{ color: "white" }}>Score:</span> {score}
        </h3>
        <h3>
          <span style={{ color: "white" }}>Popularity: </span>
          {popularity}
        </h3>
        <h3>
          <span style={{ color: "white" }}>Source:</span> {source}
        </h3>
        <button
          onClick={() => window.open(url)}
          style={{
            padding: "5px",
            backgroundColor: "#9ce4bb",
            border: "none",
            borderRadius: "10px",
          }}
        >
          See more Details
        </button>
      </div>
    </div>
  );
};

export default AnimeInfo;
