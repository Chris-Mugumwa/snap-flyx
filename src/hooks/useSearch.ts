import { useEffect, useCallback } from 'react'
import axios from 'axios'
import { useQueryContext } from './useQueryContext'
export {}

export const useSearch = () => {
	const { context } = useQueryContext()
	const { setLoading, setData, page, query } = context

	const getSearched = useCallback(
		async (query: string) => {
			await setLoading(true)
			await axios
				.get(
					`https://api.unsplash.com/search/photos?query=${query}&per_page=50&count=50&page=${page}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`,
				)
				.then(response => {
					setData((prev: string[]) => [...prev, ...response.data.results])
					setLoading(false)
				})
				.catch(() => {
					setLoading(false)
				})
		},
		[page, setData, setLoading],
	)

	useEffect(() => {
		getSearched(query)
	}, [query, setLoading, setData, getSearched])

	return {}
}
