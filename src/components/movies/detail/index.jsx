import React, { Component } from 'react';
import { getMovie } from '../../../services';
// import moment from 'moment';
import './index.scss';

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

const DetailComponent = ({ movie }) => (
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
                <button className="edit-movie">
                    Editar película
                </button>
                <button className="delete-movie">
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