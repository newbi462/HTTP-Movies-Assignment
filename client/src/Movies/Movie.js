import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  editMovie = (event) => {
    event.preventDefault();
    this.props.history.push(`/update-movie/${this.state.movie.id}`);
  };

  deleteMovie = (event) => {
    axios
      .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then(res => {
        this.props.setUpdate(res.data);
        // then push back to items page
        this.props.history.push("/movies");
      })
      .catch(err => console.log(err));
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className="edit-button" onClick={this.editMovie}>
          Edit
        </div>
        <div className="delete-button" onClick={this.deleteMovie}>
          Delete
        </div>
      </div>
    );
  }
}
