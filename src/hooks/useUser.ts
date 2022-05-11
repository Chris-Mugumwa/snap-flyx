import { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
export {}

export const useUser = () => {
	const [currUser, setCurrUser] = useState<User | null>(null)
	const [logged, setLogged] = useState(false)

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setCurrUser(user)
				setLogged(true)
			} else {
				setCurrUser(null)
				setLogged(false)
			}
		})
	}, [setCurrUser, setLogged])

	return { currUser, logged, setLogged, auth }
}
