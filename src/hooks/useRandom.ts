import { useState, useEffect } from 'react'
import axios from 'axios'

export const useRandom = (count: string) => {
	const [image, setImage] = useState('')

	useEffect(() => {
		getRandom(count)
	}, [count, setImage])

	const getRandom = async (count: string) => {
		await axios
			.get(
				`https://api.unsplash.com/photos/random?count=${count}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`,
			)
			.then(response => setImage(response?.data?.[0]?.urls?.regular))
	}

	return { image }
}
