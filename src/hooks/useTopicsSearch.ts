import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useQueryContext } from './useQueryContext'

export const useTopicsSearch = (topic: string) => {
	console.log(topic)
	const [loading] = useState(false)
	const [error, setError] = useState(false)
	const { context } = useQueryContext()

	const getTopics = useCallback(async (topic: string) => {
		await context.setLoading(true)
		await axios
			.get(
				`https://api.unsplash.com/search/photos?query=${topic}&per_page=50&count=50&page=${context.page}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`,
			)
			.then(response => {
				context.setLoading(false)
				context.setResults((prev: string[]) => [
					...prev,
					...response?.data.results,
				])
			})
			.catch(() => {
				context.setLoading(false)
				setError(true)
			})
	}, [])

	useEffect(() => {
		getTopics(topic)
	}, [topic, getTopics])

	return { loading, error }
}
