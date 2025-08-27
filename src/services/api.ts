// src/services/api.ts

import axios from 'axios';
import { ApiResponse, ApiRequest } from '../types/api.types';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust the base URL as needed

// Function to handle GET requests
export const getRequest = async (endpoint: string): Promise<ApiResponse> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
};

// Function to handle POST requests
export const postRequest = async (endpoint: string, data: ApiRequest): Promise<ApiResponse> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
        return response.data;
    } catch (error) {
        throw new Error(`Error posting data: ${error}`);
    }
};

// Function to handle PUT requests
export const putRequest = async (endpoint: string, data: ApiRequest): Promise<ApiResponse> => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${endpoint}`, data);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating data: ${error}`);
    }
};

// Function to handle DELETE requests
export const deleteRequest = async (endpoint: string): Promise<ApiResponse> => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting data: ${error}`);
    }
};