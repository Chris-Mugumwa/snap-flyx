import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useQueryContext } from './useQueryContext'
export {}

export const useSearch = (query: string) => {
	const [error, setError] = useState(false)
	const { context } = useQueryContext()

	const getSearched = useCallback(async (query: string) => {
		context?.setLoading(true)
		await axios
			.get(
				`https://api.unsplash.com/search/photos?query=${query}&per_page=50&count=50&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`,
			)
			.then(response => {
				context?.setData(response.data.results)
				context?.setLoading(false)
			})
			.catch(error => {
				context?.setLoading(false)
				setError(true)
				console.log('An error has occurred: ', error)
			})
	}, [])

	useEffect(() => {
		getSearched(query)
	}, [query, context.setLoading, setError, context.setData, getSearched])

	return { error }
}
