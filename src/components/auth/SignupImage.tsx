import { useRandom } from '../../hooks/useRandom'
export {}

export const SignupImage = () => {
	const { image } = useRandom('1')

	return (
		<div className='relative hidden lg:flex h-[38rem] lg:w-[60%] xl:w-[70%] overflow-y-hidden'>
			<div className='absolute top-0 left-0 right-0 flex flex-col items-center justify-center w-full h-full gap-3 p-4 text-white bg-black opacity-50'>
				<h2 className='text-6xl font-poppins'>Welcome</h2>
				<h4 className='text-2xl font-libre-franklin'>
					Enjoy using Snap-flyx
				</h4>
			</div>
			<img
				src={image}
				alt='Welcome'
				className='hidden object-cover object-center w-full h-full lg:flex'
			/>
		</div>
	)
}
