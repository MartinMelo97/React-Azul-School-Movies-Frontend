import React, { Component } from 'react';
import { getMovie, deleteMovie } from '../../../services';
import './index.scss';
import { toast } from 'react-toastify';

export default class MovieDetail extends Component {
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
        const { movieId } = this.props.match.params;
        const data = await getMovie(movieId);
        if (!data.hasError) {
            this.setState({
                data,
                isReady: true
            });
        } else {
            this.setState({
                hasError: true,
                error: data.error
            });
        };
    };

    redirectToUpdateMovie = () => {
        const { _id } = this.state.data;
        this.props.history.push(`/peliculas/editar/${_id}`);
    };

    deleteMovie = async () => {
        if (window.confirm('Realmente deseas eliminar esta película?')) {
            try {
                const movieId = this.state.data._id;
                const response = await deleteMovie(movieId);

                if (!response.hasError) {
                    toast.info('Película eliminada con éxito');
                } else {
                    toast.error('No se pudo eliminar película');
                };
            } catch (error) {
                toast.error('No se pudo eliminar película');
                console.log(error);
            };
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
                        <DetailComponent
                            movie={data}
                            redirectToUpdateMovie={this.redirectToUpdateMovie}
                            deleteMovie={this.deleteMovie}
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

const DetailComponent = ({
    movie,
    redirectToUpdateMovie,
    deleteMovie
}) => (
    <>
        <div className="movie-detail-container">
            <div className="movie-detail-header">
                <img
                    src="https://valencia.gratis/wp-content/themes/fox/images/placeholder.jpg"
                    alt="DefaultImage"
                />
                <p>{movie.title}</p>
            </div>
            <div className="movie-detail-body">
                <div className="movie-detail-body-left">
                    <p className="sinopsis">SINOPSIS</p>
                    <p className="movie-description">
                        {movie.description}
                    </p>
                </div>
                <div className="movie-detail-body-right">
                    <p>Costo de entrada: <span>
                            ${parseFloat(movie.ticketPrice).toFixed(2)}
                        </span>
                    </p>
                    <p>Duración (en minutos): <span>
                            {movie.duration}
                        </span>
                    </p>
                    <p className="is-on-cinemas">
                        {movie.isOnCinemas ?
                            'EN CARTELERA'
                            :
                            'NO DISPONIBLE EN CINES'
                        }
                    </p>
                </div>
            </div>
            <div className="movie-detail-actions">
                <button
                    className="action-button edit-movie"
                    onClick={() => redirectToUpdateMovie()}
                >
                        Editar película
                </button>
                <button
                    className="action-button delete-movie"
                    onClick={() => deleteMovie()}
                >
                    Eliminar película
                </button>
            </div>
        </div>
    </>
);

const ErrorComponent = ({error}) => (
    <>
        <p>Ups! Algo falló al traer las películas</p>
        <p>{error}</p>
    </>
);

const LoadingComponent = () => (
    <>
        <p>Cargando ...</p>
        <img src="https://media2.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif" alt=""/>
    </>
);