import NiceAvatar, { AvatarFullConfig, genConfig } from 'react-nice-avatar'

export {}

export const MenuAvatar = () => {
	const config: AvatarFullConfig = {
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
			<NiceAvatar className='w-24 h-24' {...myConfig} />
		</>
	)
}
