import React, { Component } from 'react';
import { createMovie, getMovie, updateMovie } from '../../../services';
import { scheduleOptions as SOptions } from '../../../consts';
import './index.scss';
import moment from 'moment';
import { toast } from 'react-toastify';

export default class MovieForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newMovie: {
                title: '',
                description: '',
                ticketPrice: '',
                duration: '',
                isOnCinemas: false,
                schedules: []
            },
            scheduleOptions: [],
            isCreate: true,
            isReady: false
        }
    };

    componentDidMount = async () => {
        if (this.props.match.params.movieId) {
            try {
                const { movieId } = this.props.match.params
                const data = await getMovie(movieId)
                if (!data.hasError) {
                    data.schedules = this.unFormatSchedules(data.schedules)
                    this.setState({
                        isCreate: false,
                        isReady: true,
                        newMovie: data,
                        scheduleOptions: await this.filterScheduleOptions(data.schedules)
                    })
                }
            } catch (error) {
                toast.error('Algo falló al traer la película')
            }
        } else {
            this.setState({
                scheduleOptions: SOptions,
                isReady: true
            })
        }
    }

    unFormatSchedules = schedules =>
        schedules.map(schedule =>
            moment(schedule.time).format('HH:mm')
        )

    handleChange = event => {
        const { newMovie } = this.state;
        newMovie[event.target.name] = event.target.value;
        this.setState({ newMovie });
    }

    handleChangeIsOnCinema = event => {
        const { newMovie } = this.state
        newMovie.isOnCinemas =
                event.target.value === "true"
                ? true
                : false
        this.setState({
            newMovie
        })
    }

    filterScheduleOptions = (schedules) => {
        let { scheduleOptions } = this.state;
        scheduleOptions = SOptions.filter(
            schedule => {
                return !schedules.includes(schedule)
            }
        );
        return scheduleOptions;
    }

    addSchedule = value => {
        const { newMovie } = this.state;
        newMovie.schedules.push(value);
        this.setState({
            newMovie,
            scheduleOptions: this.filterScheduleOptions(newMovie.schedules)
        });
    }

    removeSchedule = index => {
        const { newMovie } = this.state;
        newMovie.schedules.splice(index, 1);
        this.setState({
            newMovie,
            scheduleOptions: this.filterScheduleOptions(newMovie.schedules)
        });
    }

    formatScheduleTimes = schedules => {
        return schedules.map(schedule => {
            return {
                time: moment(`${moment().format('YYYY-MM-DD')} ${schedule}`)
                .format('YYYY-MM-DD:HH:mm:ss')
            }
        })
    }

    handleSubmit = async () => {
        const { newMovie, isCreate } = this.state;

        const successReponse = isCreate
            ? 'Película creada con éxito'
            : 'Película editada con éxito';

        const errorResponse = isCreate
            ? 'No se pudo crear la película'
            : 'No se pudo editar la película';

        try {
            newMovie.schedules = this.formatScheduleTimes(newMovie.schedules);
            newMovie.ticketPrice = parseFloat(newMovie.ticketPrice).toFixed(2);
            let id = null;

            if (!isCreate) {
                id = newMovie._id;
                delete newMovie._id;
                delete newMovie.deletedAt;
                delete newMovie.createdAt;
                delete newMovie.updatedAt;
            };

            const result = await isCreate
                ? createMovie(newMovie)
                : updateMovie(id, newMovie);

            if (!result.hasError) {
                toast.success(successReponse);
            } else {
                toast.error(errorResponse);
            };
        } catch (error) {
            toast.error(errorResponse);
            console.log(error);
        };
    }

    render() {
        const {
            title,
            description,
            duration,
            ticketPrice,
            isOnCinemas,
            schedules,
        } = this.state.newMovie;

        const {
            scheduleOptions,
            isCreate,
            isReady
        } = this.state

            const formTitle = isCreate
            ? 'Crea una película'
            : 'Editar película'

            const buttonText = isCreate
                ? 'Crear película'
                : 'Guardar cambios'

        return (
            <> {
                isReady &&
                <div className="movies-form-container">
                    <p>{formTitle}</p>
                    <div className="input-data-container">
                        <div className="input-data-container-left">
                            <input
                                type="text"
                                name="title"
                                onChange={event => this.handleChange(event)}
                                value={title}
                                placeholder="Título de la película"
                            />
                            <textarea
                                name="description"
                                onChange={event => this.handleChange(event)}
                                value={description}
                                placeholder="Sinopsis"
                            />
                            <input
                                type="number"
                                onChange={event => this.handleChange(event)}
                                name="duration"
                                value={duration}
                                placeholder="Duración (min.)"
                            />
                        </div>
                        <div className="input-data-container-right">
                            <input
                                type="text"
                                name="ticketPrice"
                                onChange={event => this.handleChange(event)}
                                value={ticketPrice}
                                placeholder="Precio de la entrada"
                            />
                            <select
                                name="isOnCinemas"
                                onChange={event => this.handleChangeIsOnCinema(event)}
                                defaultValue={isOnCinemas}
                            >
                                <option value="" disabled>
                                    ¿Disponble en cines?
                                </option>
                                <option
                                    value="false"
                                >
                                    No disponible
                                </option>
                                <option
                                    value="true"
                                >
                                    Disponible
                                </option>
                            </select>
                            <select
                                name="schedules"
                                onChange={event => this.addSchedule(event.target.value)}
                            >
                                <option value="" defaultValue>Seleciona horarios</option>
                                {
                                    scheduleOptions &&
                                    scheduleOptions.map(option =>
                                        <option
                                            key={option}
                                            value={option}
                                        >
                                            {option}
                                        </option>
                                    )
                                }
                            </select>
                            <div className="schedules-selected-container">
                                {
                                    schedules.length > 0 ?
                                        schedules.map((schedule, index) =>
                                                <div
                                                    key={index}
                                                    className="schedule-item"
                                                >
                                                    <p className="schedule-front">
                                                        {schedule}
                                                    </p>
                                                    <p
                                                        className="schedule-back"
                                                        onClick={()=>this.removeSchedule(index)}
                                                    >
                                                        Eliminar
                                                    </p>
                                                </div>
                                        )
                                    : <p>
                                        No se han seleccionado horarios
                                    </p>
                                }
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => this.handleSubmit()}
                    >
                        {buttonText}
                    </button>
                </div>
                }
            </>
        );
    };
};