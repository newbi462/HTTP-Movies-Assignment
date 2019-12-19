import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";

//refactor
import axios from "axios";

import { UpdateMovie } from "./Movies/UpdateMovie";


const App = () => {
  const [savedList, setSavedList] = useState([]);

  //was told to refactor and re do the state tree
  const [movies, setMovies] = useState([]);
  const [update, setUpdate] = useState("");



  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response));

  }, [update]);



  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      {/*<Route exact path="/" component={MovieList} />*/}
      <Route
        exact path="/"
        render={props => (
          <MovieList {...props}
            movies={movies}
            setMovies={setMovies} />
        )}
      />

      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props}
            addToSavedList={addToSavedList}
            setUpdate={setUpdate}
          />;
        }}
      />


      <Route
        path="/update-movie/:id"
        render={props => (
          <UpdateMovie {...props}
            movies={movies}
            setMovies={setMovies}
            setUpdate={setUpdate}
          />
        )}
      />

      <Route
        exact path="/movies"
        render={props => (
          <MovieList {...props}
            movies={movies}
            setMovies={setMovies} />
        )}
      />
    </>
  );
};

export default App;
