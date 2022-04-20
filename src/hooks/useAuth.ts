import { useState, useEffect } from 'react'
import { auth, db } from '../firebase'
import { setDoc, doc } from 'firebase/firestore'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export {}

export const useAuth = (provider: any) => {
	const [click, setClick] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		if (click) {
			signInWithPopup(auth, provider)
				.then(result => {
					const user = result.user
					const userRef = doc(db, 'users', `${user.uid}`)

					try {
						setDoc(userRef, {
							id: user.uid,
							displayName: user.displayName,
							email: user.email,
							photoURL: user.photoURL,
						})
					} catch (error) {
						console.error('Error adding document:', error)
					}
					toast(`Welcome ${user.displayName}`)
					navigate('/')
				})
				.catch(error => {
					setClick(false)
					console.error('Error authenticating user:', error)
				})
		}

		return () => setClick(false)
	}, [click, setClick])

	return { click, setClick }
}
