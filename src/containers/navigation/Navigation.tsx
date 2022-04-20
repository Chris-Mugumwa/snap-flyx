import { useMenu } from '../../hooks/useMenu'
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5'
import { ReactComponent as Icon } from '../../assets/icon.svg'
import { NavigationMenu } from './NavigationMenu'

export const Navigation = () => {
	const { isOpen, toggle } = useMenu()

	return (
		<header className='relative z-50 h-[3.5rem] border-b-2 border-b-gray-300'>
			<nav className='flex items-center justify-between'>
				<Icon />
				<div
					className='flex p-2 transition-all duration-500 rounded-md cursor-pointer text-blue-dark hover:bg-blue-dark hover:text-white'
					onClick={toggle}>
					{!isOpen && <IoMenuOutline className='w-6 h-6' />}
					{isOpen && <IoCloseOutline className='w-6 h-6' />}
				</div>
			</nav>
			<NavigationMenu isOpen={isOpen} toggle={toggle} />
		</header>
	)
}
