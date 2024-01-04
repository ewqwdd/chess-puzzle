import { Dispatch } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { userActions } from 'entities/User'

const $createApi = (dispatch: Dispatch) => {
	const $api = axios.create({
		withCredentials: true,
		baseURL: _API_
	})

	$api.interceptors.request.use((config) => {
		config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
		return config
	})

	$api.interceptors.response.use(
		(config) => config,
		(error: AxiosError) => {
			if (error.response?.status === 401 && localStorage.getItem('token')) {
				localStorage.removeItem('token')
				dispatch(userActions.logout())
			}
			throw error
		})

	return $api
}

export default $createApi