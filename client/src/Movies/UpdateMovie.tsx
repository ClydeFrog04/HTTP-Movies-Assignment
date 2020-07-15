import React, {useEffect, useState} from "react";
import {useParams, useHistory} from "react-router";
import axios from "axios";

interface UpdateMovieProps {
    movieList: [];//todo: look at the todo below
    setMovieList: (list: any) => void;//todo: make movie object intgerface and pass to list type
    getMovieList: () => void;

}

interface Movie {
    id: number;
    title: string;
    director: string;
    metascore: number;
    stars: [];
}

const UpdateMovie: React.FC<UpdateMovieProps> = ({movieList, setMovieList, getMovieList}) =>{
    const{id} = useParams();
    const [movieData, setMovieData] = useState({
        id: id,
        title: '',
        director: '',
        metascore: 0,
        stars: [],
    });
    const history = useHistory();

    //set form fields
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log(res.data);
                setMovieData(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);


    const submitChanges  = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
            axios
                .put(`http://localhost:5000/api/movies/${id}`, movieData)
                .then(res => {
                    console.log("put response: ", res.data);
                    const editedList = [...movieList];
                    editedList.map((movie: Movie) => {
                        if(movie.id === res.data.id)return res.data.id;
                        else return movie.id;
                    });
                    setMovieList([...editedList]);
                    history.push(`/movies/${id}`);
                    getMovieList();
                })
                .catch(err => console.log(err));
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setMovieData({...movieData, [e.target.name]: e.target.value});

    }

    return (
        <div className="updateMovieForm">
            <form onSubmit={submitChanges}>
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

export default UpdateMovie;