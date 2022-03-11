import { DirectusTheme } from './example_theme_structure';

export const exampleTheme: DirectusTheme = {
	name: 'Directus Light 2022',
	author: 'Directus',
	description: 'Primary light Directus theme',
	theme: {
		global: {
			font: {
				size: `16px`,
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
				focal: {
					primary: {
						normal: 'rgb( 102, 68, 255 )',
						accent: 'rgb( 68, 34, 221 )',
						muted: 'rgb( 221, 221, 255 )',
					},
					secondary: {
						normal: 'rgb( 255, 153, 221 )',
						accent: 'rgb( 255, 119, 187 )',
						muted: 'rgb( 255, 221, 238 )'
					},
					warning: {
						normal: 'rgb( 251, 197, 79 )',
						accent: 'rgb( 237, 186, 74 )',
						muted: 'rgb( 254, 240, 211 )'
					},
					danger: {
						normal: 'rgb( 227, 81, 105 )',
						accent: 'rgb( 206, 61, 85 )',
						muted: 'rgb( 248, 211, 217 )'
					}
				},
				border: {
					normal: 'rgb( 211, 218, 228 )',
					accent: 'rgb( 162, 181, 205 )',
					muted: 'rgb( 240, 244, 249 )'
				},
				background: {
					normal: 'rgb( 240, 244, 249 )',
					accent: 'rgb( 228, 234, 241 )',
					muted: 'rgb( 247, 250, 252 )',
					page: 'rgb( 255, 255, 255 )',
					invert: 'rgb( 38, 50, 56 )'
				},
				foreground: {
					normal: 'rgb( 79, 84, 100 )',
					accent: 'rgb( 23, 41, 64 )',
					muted: 'rgb( 162, 181, 205 )',
					invert: 'rgb( 255, 255, 255 )'
				}
			}
		},
		/**
		 * Future iterations can build this out further to include more nuanced
		 * categories, such as inputs, buttons, tables, etc.
		 */
		category: {
			module: {
				background: 'rgb( 24, 34, 47 )',
				foreground: 'rgb( 162, 181, 205 )',
				hover: {
					background: 'rgb( 24, 34, 47 )',
					foreground: 'rgb( 255, 255, 255 )'
				},
				active: {
					background: 'rgb( 240, 244, 249 )',
					foreground: 'rgb( 23, 41, 64 )'
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