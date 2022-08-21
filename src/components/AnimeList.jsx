import React from "react";

const AnimeList = ({ animeList, setAnimeInfo, animeComponent, handleList }) => {
  const AddToList = animeComponent;
  return (
    <>
      {animeList
        ? animeList.map((anime, index) => {
            return (
              <div
                className="card"
                key={index}
                onClick={() => setAnimeInfo(anime)}
              >
                <div className="cardimg">
                  <img src={anime.images.jpg.large_image_url} alt="animeImg" />
                </div>

                <div className="animeInfo">
                  <h4>{anime.title}</h4>
                  <div
                    className="overlayCard"
                    onClick={() => handleList(anime)}
                  >
                    <AddToList />
                  </div>
                </div>
              </div>
            );
          })
        : "No Results"}
    </>
  );
};

export default AnimeList;
