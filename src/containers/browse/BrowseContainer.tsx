import { Browse } from '../../components/browse/Browse'
import { BrowseImages } from '../../components/browse/BrowseImages'
import { useRandom } from '../../hooks/useRandom'

export const BrowseContainer = () => {
	const { image } = useRandom('1')

	return (
		<>
			<section
				className='relative h-[70vh] object-cover object-center w-[full] no-repeat'
				style={{
					backgroundImage: `url(${image})`,
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					backgroundSize: 'cover',
				}}>
				<div className='absolute top-0 left-0 right-0 z-40 h-full bg-black-fade'></div>
				<div className='relative z-40 flex items-center w-full h-full p-3'>
					<Browse />
				</div>
			</section>
			<BrowseImages />
		</>
	)
}
