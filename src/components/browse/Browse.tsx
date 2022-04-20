import { IoImagesOutline } from 'react-icons/io5'

export const Browse = () => {
	return (
		<>
			<div className='w-full lg:px-6'>
				<div className='flex flex-col w-full gap-2'>
					<span className='absolute content-["" w-2 rounded-full bg-yellow-dark h-full]'></span>
					<div className='relative flex items-center w-full px-3'>
						<span className='absolute top-0 left-0 content-["*"] w-1 rounded-full h-full bg-yellow-dark'></span>
						<div className='text-white font-libre-franklin'>
							<h5 className='text-xs lg:text-base text-yellow-dark'>
								Welcome to
							</h5>
							<h2 className='mt-1 text-5xl lg:text-8xl font-poppins'>
								Snapflyx
							</h2>
							<p className='mt-2 text-2xl lg:text-3xl text-gray-light'>
								Discover a wide variety of
								<span className='block'>
									professional images and upload
								</span>
								your own
							</p>
						</div>
					</div>
				</div>
				<div className='flex justify-start lg:justify-center'>
					<form
						className='relative flex w-full max-w-xl mt-6 lg:justify-center'
						autoComplete='off'>
						<input
							type='text'
							name='search'
							placeholder='Search'
							className='w-full px-4 py-3 font-semibold rounded-md outline-none bg-gray-light font-poppins text-blue-dark focus:ring-2 focus:ring-blue-dark '
						/>
						<button
							type='submit'
							className='absolute top-0 h-full px-4 text-white rounded-md -right-1 bg-blue-dark'>
							<IoImagesOutline />
						</button>
					</form>
				</div>
			</div>
		</>
	)
}
