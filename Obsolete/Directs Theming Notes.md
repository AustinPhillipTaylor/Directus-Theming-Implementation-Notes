Directs Theming Notes:

- Database:
	- `directus_settings` - needs new `project_theme` entry
		- Should `project_color` be removed from settings and added as an entry in the theme?
			- I'm thinking no, brand color should appear in the theming section of the app, but stay independent of the theme. i.e. If theme is changed (swapped for another), brand color should persist (not change)
			- If we go that route, `project_color` should probably be changed from a string to an object listing the different generated variations (The same as the colors listed directly in the theme)
		- Should `project_theme` be a JSON object, or one-to-one relation to an entry in a new `directus_themes` table?
			- I'm leaning toward using a new table. Using a `directus_themes` table would help with scaling. If we want users to have the ability to save multiple themes and swap between them, saving everything in a single JSON object could become difficult to read, and cumbersome to parse when fetching/updating.

	- Structure of a `directus_themes` table:
		- Columns:
			- `id` [ int/int4 ]
			- `shade_color` [ varchar(10) ]
			- `tint_color` [ varchar(10) ]
			- `base_colors` [ json ]
			- `generated_colors` [ json ]

- Data Structure:

	- The JSON for the `base_colors` column will be structured like the following:
		```typescript
		interface ColorDefinition {
			displayName: string
			linked: boolean
			linkedColor: null | string
			value: null | string
		}
		interface BaseColors {
			generated: {
				[key: string]: ColorDefinition
			}
			[key: string]: {
				displayName: string
				colors: {
					[key: string]: ColorDefinition
				}
			}
		}
		```
	- Where `generated` in `BaseColors` contains the colors which will have variants generated based on the shade and tint. Each additional property in `BaseColors` will mark a group of colors which will not have variants generated. Properties in `BaseColors` should be set as dictionary objects to simplify lookup of linked color values (as opposed to filtering an array of values to find a corresponding name), as well as encourage use of lowercase property names. Property names should ideally reflect exactly the name that will be added in CSS (all lowercase). Keys will redundantly have `.toLowerCase()` called on them before adding as CSS variable. This will ensure backwards compatibility since css variables are case-sensitive. Each `ColorDefinition` also has a `displayName` property, this corresponds to the display name for the admin interface. This is useful for cases where the css variable and display name should differ. For instance, we use the display name of `Background Accent` for the `--background-normal-alt` variable. The `base_colors` JSON should look similar to the following:
		```typescript
		baseColors: BaseColors = {
			generated: {
				"red": {
					displayName: "Red",
					linked: false,
					linkedColor: null,
					value: "#E35169"
				},
				"danger": {
					displayName: "Danger",
					linked: true,
					linkedColor: "red",
					value: null
				},
				"orange": {
					displayName: "Orange",
					linked: false,
					linkedColor: null,
					value: "#EE9746"
				},
				"warning": {
					displayName: "Warning",
					linked: true,
					linkedColor: "orange",
					value: null
				},
				// {...}
			},
			"background": {
				displayName: "Background",
				colors: {
					"normal": {
						displayName: "Normal",
						linked: false,
						linkedColor: null,
						value: "#f0f4f9"
					},
					"normal-alt": {
						displayName: "Accent",
						linked: false,
						linkedColor: null,
						value: "#e4eaf1"
					},
					"subdued": { /** ... */ },
					"highlight": { /** ... */ },
					"page": { /** ... */ },
					"input": { /** ... */ },
					"inverted": { /** ... */ },
				}
			},
			// {...}
		}
		```
	- Generating CSS variable names for each color outside of the `generated` entry will be in the approximate form:
		```typescript
		`--${groupKey}-${colorEntryKey}`
		```
	- Generating CSS variable names for each color within the `generated` entry will be based on a predefined map, similar to what we currently have in the SASS color generation (But a little easier to decipher).
		```typescript
		interface Variation {
			key: string
			mix: "tint" | "shade" // Alternatively we could use 1 | 2 to save memory
			percent: number
		}

		colorVariants: Variation[] = [{
			key: "10",
			mix: "tint",
			percent: 10
		},{
			key: "25",
			mix: "tint",
			percent: 25
		},{
			key: "50",
			mix: "tint",
			percent: 50
		},{
			key: "75",
			mix: "tint",
			percent: 75
		},{
			key: "90",
			mix: "tint",
			percent: 90
		},{
			key: "110",
			mix: "shade",
			percent: 10
		},{
			key: "125",
			mix: "shade",
			percent: 25
		},{
			key: "150",
			mix: "shade",
			percent: 50
		},{
			key: "175",
			mix: "shade",
			percent: 75
		},{
			key: "190",
			mix: "shade",
			percent: 90
		},{
			key: "alt",
			mix: "tint",
			percent: 10
		}]
		```

	- Then the names will be in the approximate form:
		```typescript
		`--${generatedGroupKey}-${variationKey}`
		```
		An extra variable will also be created without the variation key, for the base color. For instance `--red`, or `--danger`
	- The `generated_colors` column will simply be an array of objects describing the variable name and color value of *all* of the colors, ***NOT*** just the colors in the generated section of `base_colors`. It will look like the following:
		```typescript
		interface CSSVariable {
			name: string
			value: string
		}

		generatedColors: CSSVariable[] = [{
			name: "--red",
			value: "#e35169"
		},{
			name: "--red-10",
			value: "#fceef0"
		},{
			name: "--red-25",
			value: "#f8d4da"
		},
		// [...]
		{
			name: "--background-normal",
			value: "#f0f4f9"
		},{
			name: "--background-normal-alt",
			value: "#e4eaf1"
		}
		// [...]
		]
		```
		So on and so forth. This could maybe be reduced down to an array of tuples to save memory. The general idea is that this would be super easy to read into the app and convert directly into css variables. This array would be regenerated each time the colors are modified and the settings are saved.

		**NOTE:** If the CSS [`color-mix`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix()) proposal is ever widely implemented, it will no longer be necessary to mix these colors in javascript and save them to the database. However, there is currently no support.

