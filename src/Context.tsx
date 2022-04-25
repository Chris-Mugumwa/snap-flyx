import { useState, createContext } from 'react'
export {}

type QueryProps = {
	query: string
	data: string[]
	loading: boolean
	setQuery: React.Dispatch<React.SetStateAction<string>>
	setData: React.Dispatch<React.SetStateAction<string[]>>
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const ContextProvider = createContext<QueryProps | any>({})

export const Context = ({ children }: JSX.ElementChildrenAttribute) => {
	const [query, setQuery] = useState('')
	const [data, setData] = useState<string[]>([])
	const [loading, setLoading] = useState(false)

	if (ContextProvider === null) throw new Error()

	return (
		<ContextProvider.Provider
			value={{ query, setQuery, data, setData, loading, setLoading }}>
			{children}
		</ContextProvider.Provider>
	)
}
