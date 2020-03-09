import React, { Component } from 'react';
import { createMovie } from '../../../services';
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
            scheduleOptions: []
        }
    };

    componentDidMount = () => {
        this.setState({
            scheduleOptions: SOptions
        })
    }

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

    filterScheduleOptions = () => {
        let { scheduleOptions, newMovie } = this.state
        scheduleOptions = SOptions.filter(
            schedule => {
                return !newMovie.schedules.includes(schedule)
            }
        )
        this.setState({
            scheduleOptions
        })
    }

    addSchedule = value => {
        const { newMovie } = this.state;
        newMovie.schedules.push(value)
        this.setState({ newMovie }, this.filterScheduleOptions());
    }

    removeSchedule = index => {
        const { newMovie } = this.state;
        newMovie.schedules.splice(index, 1);
        this.setState({ newMovie }, this.filterScheduleOptions());
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
        const { newMovie } = this.state;
        try {
            newMovie.schedules = this.formatScheduleTimes(newMovie.schedules)
            newMovie.ticketPrice = parseFloat(newMovie.ticketPrice).toFixed(2)
            const result = await createMovie(newMovie);

            if (!result.hasError) {
                toast.success('Película creada con éxito!')
                newMovie.title = '';
                newMovie.description = '';
                newMovie.duration = 0;
                newMovie.ticketPrice = 0;
                newMovie.isOnCinemas = false;
                newMovie.schedules = [];
                this.setState({ newMovie });
            } else {
                toast.error('Algo falló al crear la película :(')
            };
        } catch (error) {
            toast.error('Algo falló al crear la película :(')
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
            schedules
        } = this.state.newMovie;

        const {
            scheduleOptions
        } = this.state

        return (
            <>
                <div className="movies-form-container">
                    <p>Crea una película</p>
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
                            >
                                <option value="" disabled>
                                    ¿Disponble en cines?
                                </option>
                                <option
                                    value="false"
                                    defaultValue={!isOnCinemas}
                                >
                                    No disponible
                                </option>
                                <option
                                    value="true"
                                    defaultValue={isOnCinemas}
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
                        Crear película
                    </button>
                </div>
            </>
        );
    };
};