import { useState, useEffect } from 'react'
import axios from 'axios'

export const useRandoms = (count: string) => {
	const [images, setImages] = useState<[] | null>(null)

	useEffect(() => {
		getRandom(count)
	}, [count, setImages])

	const getRandom = async (count: string) => {
		await axios
			.get(
				`https://api.unsplash.com/photos/random?count=${count}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`,
			)
			.then(response => setImages(response?.data))
	}

	return { images }
}
