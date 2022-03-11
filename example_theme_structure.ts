// type RGB = `rgb( ${number}, ${number}, ${number} )`
type Hex = `#${string}`
type Link = `var( --${string} )`
type Pixels = `${number}px`

interface BaseColorVariants {
	normal?: Hex | Link
	accent?: Hex | Link
	muted?: Hex | Link
}

interface GlobalSettings {
	font?: {
		size?: Pixels
		family?: {
			sans?: string
			serif?: string
			mono?: string
		}
	}
	color?: {
		primary?: BaseColorVariants
		secondary?: BaseColorVariants
		warning?: BaseColorVariants
		danger?: BaseColorVariants
		foreground?: BaseColorVariants & {
			invert?: Hex | Link
		}
		background?: BaseColorVariants & {
			page?: Hex | Link
			invert?: Hex | Link
		}
		border?: BaseColorVariants
	}
	border?: {
		width?: Pixels
		radius?: Pixels
	}
}

interface SubProperty {
	[key: string]: string | Pixels | Hex | Link | SubProperty
}

interface CategoricalSettings {
	/** Key corresponds to category identifier */
	[key: string]: SubProperty
}

/** Unused for now, for future implementation */
interface CSSOverrides {}


interface ThemeSettings {
	/** General, global settings that will cascade down through the entire app */
	global: GlobalSettings
	/** Category-level settings */
	category?: CategoricalSettings
	/** Component-specific overrides (list of CSS variables) */
	localOverrides?: CSSOverrides
}

interface Configuration {
	auto_generate?: {
		primary?: boolean
		secondary?: boolean
		warning?: boolean
		danger?: boolean
	}
}

export interface DirectusTheme {
	/** Display name for theme */
	name: string
	/** Theme author */
	author?: string
	/** Short description of theme */
	description?: string
	/** List of theme settings to parse */
	theme: ThemeSettings
	/** Configuration settings for use in theming interface */
	config?: Configuration
}