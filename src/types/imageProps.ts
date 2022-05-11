export {}

export type ImageProps = {
	id: number
	alt_description: string
	urls: { regular: string }
	user: {
		name: string
		username: string
		total_likes: number
		profile_image: {
			medium: string
		}
		links: {
			html: string
		}
	}
}

export type ItemProps = {
	data: []
}
