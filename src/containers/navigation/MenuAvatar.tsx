import { useUser } from '../../hooks/useUser'
import NiceAvatar, { genConfig } from 'react-nice-avatar'
import { avatarProps } from '../../types/menuProp'

export {}

export const MenuAvatar = () => {
	const { logged } = useUser()

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
	}
	const myConfig = genConfig(config)

	return (
		<>
			<NiceAvatar
				className={!logged ? 'hidden' : 'w-24 h-24'}
				{...myConfig}
			/>
		</>
	)
}
