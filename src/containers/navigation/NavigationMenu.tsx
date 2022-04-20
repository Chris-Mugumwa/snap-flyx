import { useUser } from '../../hooks/useUser'
import { NavLink, useNavigate } from 'react-router-dom'
import { menuProps, avatarProps } from '../../types/menuProp'
import { navMenuData, navMenuLogout } from './navData'
import NiceAvatar, { genConfig } from 'react-nice-avatar'
import Avatar from 'react-avatar'
import { IoEnterOutline, IoLogInOutline } from 'react-icons/io5'
export {}

export const NavigationMenu = ({ isOpen, toggle }: menuProps) => {
	const { currUser, logged, auth } = useUser()
	const navigate = useNavigate()

	const config: avatarProps = {
		sex: 'woman',
		faceColor: '#AC6651',
		earSize: 'small',
		eyeStyle: 'smile',
		noseStyle: 'round',
		mouthStyle: 'laugh',
		shirtStyle: 'short',
		glassesStyle: 'square',
		hairColor: '#F48150',
		hairStyle: 'normal',
		hatStyle: 'beanie',
		hatColor: '#fff',
		shirtColor: '#9287FF',
		bgColor: '#E5E5E5',
	}
	const myConfig = genConfig(config)

	const signout = async () => {
		auth.signOut().then(() => {
			toggle()
			navigate('/')
		})
	}

	return (
		<section
			className={isOpen ? 'menu -translate-x-0' : 'menu -translate-x-96 '}>
			<ul className='flex flex-col items-center justify-around w-full h-full'>
				<div className='flex flex-col items-center gap-2 font-semibold font-libre-franklin text-blue-dark'>
					<div className='relative '>
						{!logged && (
							<NiceAvatar
								className={currUser !== null ? 'hidden' : 'w-24 h-24'}
								{...myConfig}
							/>
						)}
						{logged && currUser?.photoUrl !== null && (
							<img
								src={`${currUser?.photoURL}`}
								alt='user'
								className='w-24 h-24 rounded-full'
							/>
						)}
						{logged && currUser?.photoUrl === null && (
							<Avatar
								name={`${currUser?.displayName}`}
								className='w-24 h-24 rounded-full'
							/>
						)}
					</div>
					<h4>{currUser?.displayName}</h4>
				</div>
				<div className='w-[90%] flex flex-col gap-2 text-center'>
					{navMenuData.map(nav => (
						<NavLink
							key={nav.id}
							to={nav.path}
							className={({ isActive }) =>
								isActive
									? 'menu-link text-blue-dark bg-gray-light ring-2 ring-blue-dark'
									: 'menu-link bg-gray-light text-blue-dark hover:ring-2 hover:ring-yellow-dark'
							}
							onClick={toggle}>
							<h4 className='flex items-center justify-center gap-1 font-poppins '>
								<span>{nav.icon}</span>
								<span>{nav.name}</span>
							</h4>
						</NavLink>
					))}
				</div>

				<div
					className={
						!logged ? 'w-[90%] flex flex-col gap-2 text-center' : 'hidden'
					}>
					<NavLink
						to='/login'
						className={({ isActive }) =>
							isActive
								? 'menu-button text-blue-dark rounded-md bg-yellow-dark ring-2 ring-blue-dark'
								: ' menu-button rounded-md text-blue-dark bg-yellow-dark hover:ring-2 hover:ring-orange-light'
						}
						onClick={toggle}>
						<IoLogInOutline />
						<span className='font-poppins'>Login</span>
					</NavLink>
					<NavLink
						to='/sign-up'
						onClick={toggle}
						className='text-white menu-button bg-blue-dark hover:ring-2 hover:ring-yellow-dark'>
						<IoEnterOutline />
						<span className='font-poppins'>Register</span>
					</NavLink>
				</div>
				<div
					className={
						logged ? 'w-[90%] flex flex-col gap-2 text-center' : 'hidden'
					}>
					{navMenuLogout.map(button => (
						<NavLink
							to={button.path}
							key={button.id}
							onClick={() => signout()}
							className={({ isActive }) =>
								isActive
									? 'menu-button text-white bg-blue-dark ring-2 ring-yellow-dark'
									: 'menu-button text-white bg-blue-dark hover:ring-2 hover:ring-yellow-dark'
							}>
							<span className='font-poppins'>{button.icon}</span>
							<span className='font-poppins'>{button.name}</span>
						</NavLink>
					))}
				</div>
			</ul>
		</section>
	)
}
