import PuffLoader from 'react-spinners/PuffLoader'
export {}

export const Loading = () => {
	return (
		<div className='fixed z-50 flex items-center justify-center w-screen h-screen bg-gray-light'>
			<PuffLoader color='#14213D' size='60px' />
		</div>
	)
}
