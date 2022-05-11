import { useState, useEffect, useRef, useCallback } from 'react'
import { useRandoms, useModal } from '../../hooks/hooksIndex'
import { ImageProps, BreakpointProps } from '../../types/imageProps'
import Masonry from 'react-masonry-css'
import { ImageDetails } from './ImageDetails'
import { LoadingInfinite } from '../loading/InfiniteLoader'
export {}

export const breakpointObj: BreakpointProps = {
	default: 4,
	1100: 3,
	700: 2,
	500: 1,
}

const BrowseImages = () => {
	const [page, setPage] = useState<number>(1)
	const [item, setItem] = useState<ImageProps | any>(null)
	const { loading, randoms } = useRandoms(page)
	const { open, toggleModal } = useModal()
	const loader = useRef<any>(null)

	const handleObserver = useCallback(entries => {
		const target = entries[0]
		if (target.isIntersecting) {
			setPage(prev => prev + 1)
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

	console.log(randoms)

	return (
		<>
			<div className='w-full py-4 mt-2 flex flex-col items-center'>
				<Masonry
					breakpointCols={breakpointObj}
					className='flex w-auto gap-2'>
					{randoms?.map((image: any) => (
						<div
							className='mb-2 overflow-hidden break-inside'
							key={image?.id}>
							<img
								src={`${image?.urls?.regular}`}
								alt=''
								onClick={() => toggle(image)}
								className='browse-image'
							/>
						</div>
					))}
				</Masonry>
				<LoadingInfinite />
				<div ref={loader} />
				{open && <ImageDetails toggleModal={toggleModal} item={item} />}
			</div>
		</>
	)
}

export default BrowseImages
