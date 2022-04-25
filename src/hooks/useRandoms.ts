import { useState, useEffect } from 'react'
import axios from 'axios'

export const useRandoms = (count: string, page: number) => {
	const [images, setImages] = useState<[] | null>(null)

	useEffect(() => {
		getRandom(count, page)
		return () => setImages([])
	}, [count, setImages, page])

	const getRandom = async (count: string, page: number) => {
		await axios
			.get(
				`https://api.unsplash.com/photos/random?count=${count}&page=${page}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`,
			)
			.then(response => setImages(response?.data))
	}

	return { images, getRandom }
}
