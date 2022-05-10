import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { TopicProps } from '../components/browse/BrowseTopics'
import axios from 'axios'

type TopicImages = {
	isLoading: boolean
	topicImages: any
}

type ImageData = {
	topic: {}
	page: number
}

const initialState = { isLoading: false, topicImages: [] }

export const getTopicImages = createAsyncThunk(
	'topicImages/getTopicImages',
	async ({ slug, page }: TopicProps) => {
		const response: any = await fetch(
			`https://api.unsplash.com/search/photos?query=${slug}&per_page=50&count=50&page=${page}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`,
		)
		const formatResponse = await response.json()
		return formatResponse
	},
)

export const topicImageSlice = createSlice({
	name: 'topic',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getTopicImages.pending, state => {
			state.isLoading = true
		})
		builder.addCase(getTopicImages.fulfilled, (state, action) => {
			state.isLoading = false
			state.topicImages = action.payload
		})
		builder.addCase(getTopicImages.rejected, state => {
			state.isLoading = false
		})
	},
})

export default topicImageSlice.reducer
