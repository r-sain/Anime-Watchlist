import { useEffect, useRef, useState } from "react";
import "./App.css";
import AddToList from "./components/AddToList";
import AnimeInfo from "./components/AnimeInfo";
import AnimeList from "./components/AnimeList";
import RemoveFromList from "./components/RemoveFromList";
import FilterListData from "./components/FilterListData";

//geting values from local storage
const getLsData = () => {
  const data = localStorage.getItem("myAnimeList");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function App() {
  const [animeData, setAnimeData] = useState();
  const [genreData, setGenreData] = useState([]);
  const [filterOption, setfilterOption] = useState("");
  const [timeoutId, SetTimeoutId] = useState();
  const [animeInfo, setAnimeInfo] = useState();
  const [myAnimeList, setMyAnimeList] = useState(getLsData);

  const addTo = (anime) => {
    const index = myAnimeList.findIndex((myanime) => {
      return myanime.mal_id === anime.mal_id;
    });
    if (index < 0) {
      const newArray = [...myAnimeList, anime];
      setMyAnimeList(newArray);
    }
  };

  const removeFrom = (anime) => {
    const newArray = myAnimeList.filter((myanime) => {
      return myanime.mal_id != anime.mal_id;
    });
    setMyAnimeList(newArray);
  };
  const getGenreData = (data) => {
    let genreList = [];
    data.forEach((el) => {
      el.genres.forEach((data) => {
        if (!genreList.includes(data.name)) {
          genreList.push(data.name);
        }
      });
    });
    setGenreData(genreList);
  };
  const getData = async (searchString) => {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${searchString}&limit=20`
    );
    const resData = await res.json();
    getGenreData(resData.data);
    setAnimeData(resData.data);
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => getData(e.target.value), 800);
    SetTimeoutId(timeout);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    localStorage.setItem("myAnimeList", JSON.stringify(myAnimeList));
  }, [myAnimeList]);

  return (
    <div className="App">
      <div className="header">
        <h1>Anime Watchlist</h1>

        <div className="searchbox">
          <input
            type="search"
            placeholder="Search Anime"
            onChange={onTextChange}
          />
        </div>
      </div>
      <div className="container">
        <div className="leftDiv">
          {animeInfo && (
            <AnimeInfo animeInfo={animeInfo} animeComponent={AddToList} />
          )}
        </div>

        <div className="rightDiv">
          <div className="animeRow">
            <h3 className="headingText">
              Anime
              <span>
                <FilterListData
                  genreData={genreData}
                  setfilterOption={setfilterOption}
                />
              </span>
            </h3>
            <div className="row">
              <AnimeList
                animeList={animeData}
                filterOption={filterOption}
                setAnimeInfo={setAnimeInfo}
                animeComponent={AddToList}
                handleList={(anime) => addTo(anime)}
              />
            </div>

            <h3 className="headingText">My Anime List </h3>

            <div className="row">
              {myAnimeList.length < 1 && (
                <div>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <h2 style={{ color: "#717171" }}>Add Anime to your list</h2>
                </div>
              )}
              <AnimeList
                animeList={myAnimeList}
                setAnimeInfo={setAnimeInfo}
                animeComponent={RemoveFromList}
                handleList={(anime) => removeFrom(anime)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
