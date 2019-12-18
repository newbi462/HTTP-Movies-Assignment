import React, { useState, useEffect } from 'react';
import axios from "axios";

const movieObject = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [""],
};


export const UpdateMovie = (props) => {
  const [movie, setMovie] = useState(movieObject);



  useEffect(() => {
    const movieToEdit = props.movies.find(
      fooBar => `${fooBar.id}` === props.match.params.id
    );
    //console.log(props.movies, movieToEdit);
    if (movieToEdit) {
      setMovie(movieToEdit);
    }

  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // do my put to do the update
    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
      .then(responce => {
        console.log(responce.data);

        //remeber to update state so it will refresh
        props.setUpdate(responce.data);

        // redirect route to the ITEM PAGE on submit
        props.history.push(`/movies`);
      })
      .catch(err => console.log(err));
  };

  const handleChange = (event) => {
    setMovie(
      {
        ...movie,
        [event.target.name]: event.target.value
      }
    );
  };

  return (
    <>
    {console.log(movie)}
    <h2>Update This Move</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="title"
          value={movie.title}
        />

        <input
          type="text"
          name="director"
          onChange={handleChange}
          placeholder="director"
          value={movie.director}
        />

        <input
          type="number"
          name="metascore"
          onChange={handleChange}
          placeholder="metascore"
          value={movie.metascore}
        />

        <button>Update</button>
      </form>
    </>
  );
};
