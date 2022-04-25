export {}

export const NotLogged = () => {
	return (
		<div className='fixed top-0 left-0 right-0 flex items-center justify-center w-screen h-screen bg-gray-light'>
			<h1 className='text-xl text-blue-dark'>
				Oops, you need to be logged in to use this feature
			</h1>
		</div>
	)
}
