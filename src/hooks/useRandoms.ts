import { useState, useEffect } from 'react'
import axios from 'axios'

export const useRandoms = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [randoms, setRandoms] = useState([])

	useEffect(() => {
		getRandoms()
	}, [setLoading, setError, setRandoms])

	const getRandoms = async () => {
		setLoading(true)
		await axios
			.get(
				`https://api.unsplash.com/photos/random?count=50&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`,
			)
			.then(response => {
				setLoading(false)
				setRandoms(response?.data)
			})
			.catch(() => {
				setError(true)
				setLoading(false)
			})
	}

	return { loading, error, randoms }
}
