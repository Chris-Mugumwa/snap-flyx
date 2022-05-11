import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Avatar from 'react-nice-avatar'
import { ToastContainer, toast } from 'react-toastify'
import ClipLoader from 'react-spinners/ClipLoader'
import { AuthImage } from './AuthImage'
import { IoLockClosedOutline, IoMailOutline } from 'react-icons/io5'
import { FcGoogle } from 'react-icons/fc'
export {}

type FormValues = {
	name: string
	email: string
	password: string
}

const schema = yup.object().shape({
	name: yup
		.string()
		.min(2, 'Name too short')
		.max(15, 'Name too long')
		.required('Required'),
	email: yup.string().required('Required').email(),
	password: yup
		.string()
		.required('Required')
		.min(4, 'Password too short')
		.max(20, 'Password too long'),
})

export const Login = () => {
	const [loading, setLoading] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const provider = new GoogleAuthProvider()
	const { setClick } = useAuth(provider)
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: yupResolver(schema),
	})

	const googleAuth = () => {
		setIsLoading(true)
		setClick(true)
	}

	const submitData = (data: FormValues) => {
		setLoading(true)
		signInWithEmailAndPassword(auth, data.email, data.password)
			.then(() => {
				toast(`Welcome ${data.name}`)
				navigate('/')
				setLoading(false)
			})
			.catch(error => console.error('Failed to sign in: ', error))
	}

	return (
		<>
			<ToastContainer />
			<section className='flex flex-col items-center justify-center w-full h-full lg:flex-row'>
				<div className='flex flex-col items-center justify-between w-full lg:w-[40%] xl:w-[30%] h-full lg:h-[38rem] gap-1 p-4 bg-white shadow-md md:w-96 shadow-gray-300'>
					<Avatar className='w-32 h-32' />

					<div className='flex flex-col w-full '>
						<form
							onSubmit={handleSubmit(submitData)}
							className='flex flex-col items-center w-full gap-6 px-4 mt-4'
							autoComplete='off'>
							<div className='auth-subcontainer'>
								<input
									type='email'
									{...register('email')}
									placeholder='Email Address'
									required
									autoComplete='off'
									className='auth-input'
								/>

								<IoMailOutline className='auth-icon' />
								<p className='auth-error'>{errors.email?.message}</p>
							</div>
							<div className='auth-subcontainer'>
								<input
									type='password'
									{...register('password')}
									placeholder='Password'
									autoComplete='off'
									required
									className='auth-input'
								/>

								<IoLockClosedOutline className='auth-icon' />
								<p className='auth-error'>{errors.password?.message}</p>
							</div>
							<div className='w-full py-2'>
								<button className='auth-button bg-yellow-dark hover:ring-2 hover:ring-blue-dark focus:ring-2 focus:ring-blue-dark'>
									{loading && <ClipLoader color='#FFF' size='10px' />}
									{!loading && <h5>Login</h5>}
								</button>
							</div>
						</form>
						<div className='w-full px-4 py-2 mt-2'>
							<button
								className='auth-button bg-blue-dark hover:ring-2 hover:ring-yellow-dark focus:ring-2 focus:ring-yellow-dark'
								onClick={() => googleAuth()}>
								{isLoading && <ClipLoader color='#FFF' size='10px' />}
								{!isLoading && <FcGoogle className='text-xl' />}
							</button>
						</div>
					</div>
				</div>
				<AuthImage />
			</section>
		</>
	)
}
