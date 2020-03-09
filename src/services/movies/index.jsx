import { API_URL, moviesEndpoint } from '../../consts';
import axios from 'axios';

export const getMovies = async () => {
    try {
        const response = await axios.get(`${API_URL}${moviesEndpoint}`);
        if (response.data) {
            return response.data;
        };
    } catch (error) {
        return {
            hasError: true,
            error
        };
    };
};

export const getMovie = async movieId => {
    try {
        const response = await axios.get(`${API_URL}${moviesEndpoint}/${movieId}`);
        if (response.data) {
            return response.data
        };
    } catch (error) {
        return {
            hasError: true,
            error
        };
    };
};

export const createMovie = async data => {
    try {
        const response = await axios.post(
            `${API_URL}${moviesEndpoint}`,
            data
            );
        if (response.data) {
            return response.data
        };
    } catch (error) {
        return {
            hasError: true,
            error
        };
    };
};