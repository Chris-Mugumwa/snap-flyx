import {
	IoLogOutOutline,
	IoImagesOutline,
	IoPlanetOutline,
	IoPinOutline,
} from 'react-icons/io5'
export {}

type navMenu = {
	id: number
	name: string
	path: string
	icon: JSX.Element
}

export const navMenuData: navMenu[] = [
	{
		id: 1,
		name: 'Browse',
		path: '/',
		icon: <IoPlanetOutline />,
	},
	{
		id: 2,
		name: 'My Gallery',
		path: '/gallery',
		icon: <IoImagesOutline />,
	},
	{
		id: 3,
		name: 'Favourites',
		path: '/favourites',
		icon: <IoPinOutline />,
	},
]

export const navMenuLogout: navMenu[] = [
	{
		id: 1,
		name: 'Logout',
		path: '/',
		icon: <IoLogOutOutline />,
	},
]
