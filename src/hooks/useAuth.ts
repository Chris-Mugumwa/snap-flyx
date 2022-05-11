import { useState, useEffect } from 'react'
import { auth, db } from '../firebase'
import { setDoc, doc } from 'firebase/firestore'
import { GoogleAuthProvider } from 'firebase/auth'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
export {}

export const useAuth = (provider: GoogleAuthProvider) => {
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
					toast.success(`Welcome ${user.displayName}`)
					navigate('/')
				})
				.catch(error => {
					setClick(false)
					toast.error('Something went wrong, try again')
					console.error('Error authenticating user:', error)
				})
		}

		return () => setClick(false)
	}, [navigate, provider, click, setClick])

	return { click, setClick }
}
