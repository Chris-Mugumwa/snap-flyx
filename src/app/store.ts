import { configureStore } from '@reduxjs/toolkit'
import topicImageReducer from '../features/topicImagesSlice'

export const store = configureStore({
	reducer: {
		topic: topicImageReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
