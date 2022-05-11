import { useState, useEffect, useCallback, useRef } from 'react'
import { useModal, useQueryContext } from '../../hooks/hooksIndex'
import { ImageProps } from '../../types/imageProps'
import { ImageDetails } from '../browse/ImageDetails'
import { MasonryGrid } from '../masonry/MasonryGrid'
import { LoadingInfinite } from '../loading/LoadingInfinite'
export {}

const Searched = () => {
	const [item, setItem] = useState<ImageProps | any>(null)
	const loader = useRef<any>(null)
	const { open, toggleModal } = useModal()
	const { context } = useQueryContext()
	const { data, setPage } = context

	const handleObserver = useCallback(entries => {
		const target = entries[0]
		if (target.isIntersecting) {
			setPage((prev: number) => prev + 1)
		}
	}, [])

	useEffect(() => {
		const option = {
			root: null,
			rootMargin: '20px',
			threshold: 0,
		}
		const observer = new IntersectionObserver(handleObserver, option)
		if (loader.current) observer.observe(loader.current)
	}, [handleObserver])

	const toggle = (item: ImageProps) => {
		setItem(item)
		toggleModal()
	}

	return (
		<>
			<div className='w-full py-4 mt-2 flex flex-col items-center'>
				<MasonryGrid>
					{data?.map((image: ImageProps) => (
						<div className='mb-2 overflow-hidden' key={image?.id}>
							<img
								src={`${image?.urls?.regular}`}
								alt=''
								onClick={() => toggle(image)}
								loading='lazy'
								className='browse-image'
							/>
						</div>
					))}
				</MasonryGrid>
				<LoadingInfinite />
				<div ref={loader} />

				{open && <ImageDetails toggleModal={toggleModal} item={item} />}
			</div>
		</>
	)
}

export default Searched
