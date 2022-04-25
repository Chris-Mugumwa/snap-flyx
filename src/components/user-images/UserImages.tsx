import { useState, useEffect } from 'react'
import { IoAddOutline } from 'react-icons/io5'

export {}

const UserImages = () => {
	const [file, setFile] = useState(null)
	return (
		<section>
			<form>
				<input type='file' name='file' accept='image/*' />
			</form>
		</section>
	)
}

export default UserImages
