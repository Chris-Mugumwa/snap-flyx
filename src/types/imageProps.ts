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

export type BreakpointProps = {
	default: number
	1100: number
	700: number
	500: number
}

export type ItemProps = {
	data: []
}
