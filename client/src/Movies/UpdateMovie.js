import React, { useState } from 'react';

const moveObject = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [""],
};


export const UpdateMovie = (props) => {
  const [move, setMove] = useState(moveObject);

  const handleSubmit = (event) => {
    event.preventDefault();
    // do my put to do the update
  };

  const handleChange = (event) => {
    setMove(
      {
        ...move,
        [event.target.name]: event.target.value
      }
    );
  };

  return (
    <>
    <h2>Update This Move</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="title"
          value={move.title}
        />

        <input
          type="text"
          name="director"
          onChange={handleChange}
          placeholder="title"
          value={move.director}
        />

        <input
          type="number"
          name="metascore"
          onChange={handleChange}
          placeholder="title"
          value={move.metascore}
        />

        <button>Update</button>
      </form>
    </>
  );
};
