import { DirectusTheme } from './example_theme_structure';

export const exampleTheme: DirectusTheme = {
	name: 'Directus Light 2022',
	author: 'Directus',
	description: 'Primary light Directus theme',
	theme: {
		global: {
			font: {
				size: '16px',
				family: {
					sans: 'Open Sans',
					serif: 'Meriweather',
					mono: 'Fira Code'
				}
			},
			border: {
				width: '2px',
				radius: '6px'
			},
			color: {
				primary: {
					normal: '#6644FF',
					accent: '#4422DD',
					muted: '#DDDDFF',
				},
				secondary: {
					normal: '#FF99DD',
					accent: '#FF77BB',
					muted: '#FFDDEE',
				},
				warning: {
					normal: '#FBC54F',
					accent: '#EDBA4A',
					muted: '#FEF0D3',
				},
				danger: {
					normal: '#E35169',
					accent: '#CE3D55',
					muted: '#F8D3D9',
				},
				border: {
					normal: '#D3DAE4',
					accent: '#A2B5CD',
					muted: '#F0F4F9',
				},
				background: {
					normal: '#F0F4F9',
					accent: '#E4EAF1',
					muted: '#F7FAFC',
					page: '#FFFFFF',
					invert: '#263238',
				},
				foreground: {
					normal: '#4F5464',
					accent: '#172940',
					muted: '#A2B5CD',
					invert: '#FFFFFF',
				}
			}
		},
		/**
		 * Future iterations can build this out further to include more nuanced
		 * categories, such as inputs, buttons, tables, etc.
		 */
		category: {
			module: {
				background: '#18222F',
				foreground: '#A2B5CD',
				hover: {
					background: '#18222F',
					foreground: '#FFFFFF',
				},
				active: {
					background: '#F0F4F9',
					foreground: '#172940',
				}
			}
		}
	},
	config: {
		auto_generate: {
			primary: true,
			secondary: true,
			warning: true,
			danger: true
		}
	}
}