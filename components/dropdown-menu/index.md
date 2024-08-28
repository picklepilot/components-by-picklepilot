<script setup lang="ts">
    import BaseDropdownMenuDemo from './BaseDropdownMenuDemo.vue'
</script>

# Typeahead

Advanced typeahead component that can utilize an advanced data source.

## Good to know

-   The [DropdownItem](#dropdownitem-definition) prop type contains a field called `icon`, which should _only_ be used when your project includes [Font Awesome](https://fontawesome.com/). If an icon is required, well... there be no cheese on your cracker, for now 😞.

## Demos

**Basic**

Demo of the typeahead module for development.

<iframe data-why class="w-full min-h-52">
    <BaseDropdownMenuDemo />
</iframe>

## Props

| Prop        | Type                                                               | Default                                              |
| ----------- | ------------------------------------------------------------------ | ---------------------------------------------------- |
| **classes** | [BaseDropdownClassesConfig](#basedropdownclassesconfig-definition) | [View defaults](#basedropdownclassesconfig-defaults) |
| **items**   | [DropdownItem](#dropdownitem-definition)[][]                       | []                                                   |

## Prop Types

### BaseDropdownClassesConfig

<br />

###### BaseDropdownClassesConfig / Definition

```js
type BaseDropdownClassesConfig {
    menu?: string
    menuButton?: string
    menuItems?: string
    menuItem?: string
    menuItemIcon?: string
}

```

###### BaseDropdownClassesConfig / Defaults

```js
{
    menu: 'relative inline-block text-left'
    menuButton: ''
    menuItems: 'absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'
    menuItem: ''
    menuItemIcon: 'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-zinc-900/10 leading-none group-hover:bg-indigo-400'
}
```

### DropdownItem

<br />

###### DropdownItem / Definition

```js
type DropdownItem {
    disabled?: boolean
    icon?: string
    label?: string
    onClick?: () => void
}

```

## TODO

-   [ ] Introduce custom icon slots in DropdownItem
