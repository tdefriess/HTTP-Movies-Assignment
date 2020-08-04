import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateMovie(props){
    const { id } = useParams();
    const [movie, setMovie] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    })

    useEffect(() => {
        const movieToUpdate = props.movies.find(movie => `${movie.id}` === id);
        if (movieToUpdate) {
            setMovie(movieToUpdate);
        }
    }, [props.movies, id])

    const handleChange = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'metascore') {
            value = parseInt(value, 10);
        }
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                console.log(res);
                props.setUpdate(props.update + 1)
            })
            .catch(err => console.log(err));
    }
    
    return (
        <div>
            <h2>Update Movie</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    onChange={handleChange}
                    placeholder='title'
                    value={movie.title}
                />
                <input
                    type='text'
                    name='director'
                    onChange={handleChange}
                    placeholder='director'
                    value={movie.director}
                />
                <input
                    type='text'
                    name='metascore'
                    onChange={handleChange}
                    placeholder='metascore'
                    value={movie.metascore}
                />
                <input
                    type='text'
                    name='stars'
                    onChange={handleChange}
                    placeholder='stars'
                    value={movie.stars}
                />
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie;