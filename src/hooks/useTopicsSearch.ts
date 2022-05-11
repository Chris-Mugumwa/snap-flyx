import { useEffect, useCallback } from 'react'
import axios from 'axios'
import { useQueryContext } from './useQueryContext'

export const useTopicsSearch = (topic: string) => {
	console.log(topic)
	const { context } = useQueryContext()
	const { page, setResults, setLoading } = context
	console.log(context.page)

	const getTopics = useCallback(
		async (topic: string) => {
			await context.setLoading(true)
			await axios
				.get(
					`https://api.unsplash.com/search/photos?query=${topic}&per_page=50&count=50&page=${page}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`,
				)
				.then(response => {
					setLoading(false)
					setResults((prev: string[]) => [
						...prev,
						...response?.data.results,
					])
				})
				.catch(() => {
					setLoading(false)
				})
		},
		[page, setResults, setLoading],
	)

	useEffect(() => {
		getTopics(topic)
	}, [topic, getTopics, page])

	return {}
}
