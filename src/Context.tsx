import { useState, createContext } from 'react'
export {}

type QueryProps = {
	query: string
	data: any[]
	loading: boolean
	setQuery: React.Dispatch<React.SetStateAction<string>>
	setData: React.Dispatch<React.SetStateAction<never[]>>
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const ContextProvider = createContext<QueryProps | undefined>(undefined)

export const Context = ({ children }: any) => {
	const [query, setQuery] = useState('')
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)

	return (
		<ContextProvider.Provider
			value={{ query, setQuery, data, setData, loading, setLoading }}>
			{children}
		</ContextProvider.Provider>
	)
}
