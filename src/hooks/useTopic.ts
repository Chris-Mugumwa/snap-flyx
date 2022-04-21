import { useState, useEffect } from 'react'
import axios from 'axios'

export const useTopic = () => {
	const [topics, setTopics] = useState([])

	useEffect(() => {
		getTopics()
	}, [setTopics])

	const getTopics = async () => {
		await axios
			.get(
				`https://api.unsplash.com/topics?&per_page=24&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`,
			)
			.then(response => {
				setTopics(response.data)
			})
	}

	return { topics }
}
