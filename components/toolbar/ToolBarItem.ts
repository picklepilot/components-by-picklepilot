import type { DropdownItem } from '../dropdown-menu/DropdownItem'

export type ToolbarItem = {
    children?: DropdownItem[][]
    disabled?: boolean
    icon?: string
    label?: string
    onClick?: () => void
    position?: 'left' | 'right'
    tooltip?: string
}

export type ToolbarItemGroup = {
    children: ToolbarItem[]
    position: 'left' | 'right'
}
