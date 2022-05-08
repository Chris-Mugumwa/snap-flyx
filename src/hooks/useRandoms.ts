import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

export const useRandoms = (page: number) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [randoms, setRandoms] = useState<string[]>([])

	const getRandoms = useCallback(async (page: number) => {
		await setLoading(true)
		await axios
			.get(
				`https://api.unsplash.com/photos/random?count=50&page=${page}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`,
			)
			.then(response => {
				setLoading(false)
				setRandoms((prev: string[]) => [...prev, ...response?.data])
			})
			.catch(() => {
				setError(true)
				setLoading(false)
			})
	}, [])

	useEffect(() => {
		getRandoms(page)
	}, [setLoading, setError, setRandoms, page, getRandoms])

	return { loading, error, randoms }
}
