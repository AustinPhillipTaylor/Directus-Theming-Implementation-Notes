Directs Theming Notes:

- CSS variables should be generated in the form `--{level}-{grouping}-{state}-{property}-{variant}`
- Only the `level` and `property` properties are required
- These variables are generated in the order they are structured in the theme JSON, so they should be nested appropriately.

- `{level}` - Required: Refers to the context of the variable. Global variables are prefixed with `g-`, referring to the global level. Variables listed in the category section will be prefixed with the key of the topmost parent. As such, the direct descendents of the category secton should all relate to the level, or context, of the properties listed therin.

- `{grouping}` - Optional: Group identifiers that can be used to better organize variables when a level contains a large number of children. i.e. In the example theme, the `global` level contains groupings for `font`, `border`, `color`, etc. This helps give everything a logical separation. As well, in some instances the grouping helps to narrow the scope of the property, better defining the purpose of the property (See the second sub-point of the {property} section below for better explaination).

- `{state}` - Optional: When a variable is only applicable to a specific ui state, such as `hover`, `active`, `focus`, `checked`, `disabled`, etc., we should use a `state` identifier, and it should always come before the properties designated to it.

- `{property}` - Required: Refers to the specific property which is being defined. This can be, but does not strictly need to be, a CSS property. It should be easily interpreted with regard to the context of the page, and the keywords used should be standardized throughout their usage in the theme JSON.
	- For instance, we use `background` and `foreground` quite a bit in the example theme. `background` is pretty straight forward, it generally maps to the CSS background property, and in context it refers to the styling of containers which house the content. `foreground` is a bit more broad in usage. It can map to text color, button background color, etc. However, in the context of the application, it makes sense as a general definition of the styling of focal content.
	- In some cases, the property may be vague on its own, but have significance in the context of its `grouping`. For instance, in our example theme we have properties `primary` and `secondary`. These property names don't mean much on their own, however, when coupled with their `color` grouping it is obvious what we are defining. This is one reason why the grouping must always come before properties.

- `{variant}` - Optional: Used when a single property can be broken into multiple variants. This should always be last, if it is used. For example, in our example theme, our colors are commonly broken into `normal`, `accent`, and `muted` variants (amongst others). Variants are most appropriate when multiple values can have the same application (context dependant), and only vary slightly.