module.exports = {
	mode: 'jit',
	content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				blue: {
					dark: '#14213D',
				},
				yellow: {
					dark: '#FCA311',
				},
				gray: {
					light: '#E5E5E5',
				},
				black: {
					faded: '#000000e6',
					fade: '#00000080',
				},
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				'libre-franklin': ['"Libre Franklin"', 'serif'],
			},
		},
	},
	plugins: [require('tailwind-scrollbar')],
	variants: {
		scrollbar: ['rounded'],
	},
}
