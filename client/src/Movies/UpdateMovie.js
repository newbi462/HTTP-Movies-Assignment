import React, { useState, useEffect } from 'react';

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
    {console.log(props)}
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
