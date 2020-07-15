import React, {useState} from "react";
import {useHistory, useParams} from "react-router";
import axios from "axios";


interface Movie {
    id: number;
    title: string;
    director: string;
    metascore: number;
    stars: [];
}

interface AddMovieProps {
    movieList: Movie[];
    setMovieList: (movieList: any) => void;//todo: movieList: Movie[] doesn't work with movieData state
    getMovieList: () => void;
}


const AddMovie: React.FC<AddMovieProps>= ({movieList, setMovieList, getMovieList}) =>{
    const [movieData, setMovieData] = useState({
        id: 0,
        title: '',
        director: '',
        metascore: 0,
        stars: [""],
    });
    const history = useHistory();

    const submitMovie  = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        axios
            .post(`http://localhost:5000/api/movies`, movieData)
            .then(res => {
                console.log("addmovie post response: ", res.data);
                const starsBrokenUp: string[] = movieData.stars[0].split(/,/);
                console.log({...movieData, stars: starsBrokenUp});
                setMovieList([...movieList, {...movieData, stars: starsBrokenUp}]);
                history.push(`/`);
                getMovieList();
            })
            .catch(err => console.log(err));
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if(e.target.name === "stars") setMovieData({...movieData, stars: [e.target.value]});
        else setMovieData({...movieData, [e.target.name]: e.target.value});

    }

    return (
        <div className="addMovieForm">
            <form onSubmit={submitMovie}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="Title"
                    value={movieData.title}
                />
                <div className="baseline" />

                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="Director"
                    value={movieData.director}
                />
                <div className="baseline" />

                <input
                    type="text"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="Metascore"
                    value={movieData.metascore}
                />
                <div className="baseline" />

                <input
                    type="text"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="Stars,"
                    value={movieData.stars}
                />
                <div className="baseline" />

                <button>Update</button>
            </form>
        </div>
    );
}

export default AddMovie;