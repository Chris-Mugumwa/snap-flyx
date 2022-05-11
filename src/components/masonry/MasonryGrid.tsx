import Masonry from 'react-masonry-css'

type BreakpointProps = {
	default: number
	1100: number
	700: number
	500: number
}

const breakpointObj: BreakpointProps = {
	default: 4,
	1100: 3,
	700: 2,
	500: 1,
}

export const MasonryGrid = ({ children }: JSX.ElementChildrenAttribute) => {
	return (
		<Masonry breakpointCols={breakpointObj} className='flex w-auto gap-2'>
			{children}
		</Masonry>
	)
}
