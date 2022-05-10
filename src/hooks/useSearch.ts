import { useState, useEffect } from 'react'

export const useSearch = (query: string) => {
	const [error, setError] = useState(false)
	return { error }
}
