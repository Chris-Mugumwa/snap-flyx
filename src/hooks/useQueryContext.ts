import { useContext } from 'react'
import { ContextProvider } from '../Context'
export {}

export const useQueryContext = () => {
	const context = useContext(ContextProvider)
	if (context === undefined) throw new Error('Query must be a string')

	return { context }
}
