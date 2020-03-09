import React, { Component } from 'react';
import { getMovies } from '../../../services';
import moment from 'moment';
import './index.scss';

class MovieList extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            isReady: false,
            hasError: false,
            error: null
        };
    };

    componentDidMount = async () => {
        const data = await getMovies();
        if (!data.hasError) {
            this.setState({
                data,
                isReady: true
            });
        } else {
            this.setState({
                hasError: false,
                error: data.error
            });
        };
    };

    render() {

        const {
            data,
            isReady,
            hasError,
            error
        } = this.state;

        return (
            <>
            {
                isReady ?
                    <ListComponent
                        data={data}
                    />
                : hasError ?
                    <ErrorComponent
                        error={error}
                    />
                : <LoadingComponent />
            }
            </>
        )
    };
};

const ListComponent = (props) => {
    const { data } = props;
    return (
        <>
            {
                data.length > 0 ?
                    data.map(movie =>
                        <MovieCard
                            key={movie._id}
                            movie={movie}
                        />
                    )
                : <p>No hay ninguna película registrada :(</p>
            }
        </>
    )
};

const MovieCard = ({movie}) => (
    <>
    <div className="movie-card-container">
        <div className="movie-card-info">
            <div className="movie-card-basic-info">
                <p className="movie-card-title">{movie.title}</p>
                <p className="movie-card-desc">{movie.description}</p>
            </div>
            <div className="movie-card-details">
                <p>
                    Entrada: <span>
                        ${parseFloat(movie.ticketPrice).toFixed(2)}
                    </span>
                </p>
                <p>
                    Duración: <span>
                        {movie.duration} min.
                    </span>
                </p>
                <p>
                    Disponible en cines: <span>
                        {movie.isOnCinemas ? 'SI': 'NO'}
                    </span>
                </p>
            </div>
        </div>
        <div className="movie-card-schedules-container">
            <p>Horarios disponibles</p>
            <div className="movie-card-schedules">
                {movie.schedules.length > 0 ?
                    movie.schedules.map(schedule => (
                        <p>{moment(schedule.time).format('HH:mm')}</p>
                    ))
                : <p>No hay horarios disponibles :(</p>
                }
            </div>
        </div>
    </div>
    </>
)

const ErrorComponent = ({error}) => (
    <>
        <p>Ups! Algo falló al traes las películas</p>
        <p>{error}</p>
    </>
);

const LoadingComponent = () => (
    <>
        <p>Cargando ...</p>
        <img src="https://media2.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif" alt=""/>
    </>
);

export default MovieList;