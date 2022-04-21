import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navigation } from './containers/navigation/Navigation'
import { LoginContainer } from './containers/auth/LoginContainer'
import { SignupContainer } from './containers/auth/SignupContainer'
import { BrowseContainer } from './containers/browse/BrowseContainer'
import { SearchedContainer } from './containers/searched/SearchedContainer'

function App() {
	const location = useLocation()

	return (
		<AnimatePresence exitBeforeEnter>
			<div className='relative min-h-screen p-4 bg-gray-light'>
				<Navigation />
				<Routes location={location} key={location.pathname}>
					<Route path='/login' element={<LoginContainer />} />
					<Route path='/sign-up' element={<SignupContainer />} />
					<Route path='/' element={<BrowseContainer />} />
					<Route path='/browse/q=:value' element={<SearchedContainer />} />
				</Routes>
			</div>
		</AnimatePresence>
	)
}

export default App
