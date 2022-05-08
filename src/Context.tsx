import { useState, createContext } from 'react'
export {}

type QueryProps = {
	page: number
	query: string
	topic: string
	data: string[]
	results: string[]
	loading: boolean
	setPage: React.Dispatch<React.SetStateAction<number>>
	setQuery: React.Dispatch<React.SetStateAction<string>>
	setTopic: React.Dispatch<React.SetStateAction<string>>
	setData: React.Dispatch<React.SetStateAction<string[]>>
	setResults: React.Dispatch<React.SetStateAction<string[]>>
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const ContextProvider = createContext<QueryProps | any>({})

export const Context = ({ children }: JSX.ElementChildrenAttribute) => {
	const [page, setPage] = useState(1)
	const [query, setQuery] = useState('')
	const [topic, setTopic] = useState('')
	const [results, setResults] = useState<string[]>([])
	const [data, setData] = useState<string[]>([])
	const [loading, setLoading] = useState(false)

	if (ContextProvider === null) throw new Error()

	return (
		<ContextProvider.Provider
			value={{
				page,
				setPage,
				query,
				setQuery,
				data,
				setData,
				loading,
				setLoading,
				results,
				setResults,
				topic,
				setTopic,
			}}>
			{children}
		</ContextProvider.Provider>
	)
}
