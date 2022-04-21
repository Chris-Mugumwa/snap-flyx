import { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
export {}

export const useUser = () => {
	const [currUser, setCurrUser] = useState<any>(null)
	const [logged, setLogged] = useState(false)

	useEffect(() => {
		onAuthStateChanged(auth, (user: any) => {
			if (user) {
				setCurrUser(user)
				setLogged(true)
			} else {
				setCurrUser(null)
				setLogged(false)
			}
		})
	}, [setCurrUser, setLogged])

	return { currUser, logged, auth }
}
