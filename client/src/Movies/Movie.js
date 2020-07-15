import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import MovieCard from "./MovieCard";
import {useHistory} from "react-router";

function Movie({addToSavedList, getMovieList}) {
    const [movie, setMovie] = useState(null);
    const params = useParams();
    const history = useHistory();

    const fetchMovie = (id) => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => setMovie(res.data))
            .catch((err) => console.log(err.response));
    };

    const saveMovie = () => {
        addToSavedList(movie);
    };

    const deleteMovie = (id) =>{
        axios.delete(`http://localhost:5000/api/movies/${id}`)
            .then(res =>{
                console.log("delete res: ", res);
                history.push("/");
                getMovieList();
            })
            .catch(console.log);
    }

    useEffect(() => {
        fetchMovie(params.id);
    }, [params.id]);

    if (!movie) {
        return <div>Loading movie information...</div>;
    }

    return (
        <div className="save-wrapper">
            <MovieCard movie={movie}/>

            <div className="save-button button-hover" onClick={saveMovie}>Save</div>
            <div className="edit-button button-hover" onClick={() => history.push(`/update-movie/${params.id}`)}>Edit</div>
            <div className="delete-button button-hover" onClick={() => deleteMovie(params.id)}>Delete</div>
        </div>
    );
}

export default Movie;
